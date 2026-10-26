import {test} from 'node:test';
import assert from 'node:assert/strict';
import {selectVideoFrame} from '../src/media.js';
import {mixPCM} from '../src/audio.js';
import {defineFilm} from '../src/core.js';
const film=defineFilm({width:320,height:180,fps:{num:24,den:1},durationInFrames:24,seed:1,scenes:[],assets:[],markers:{hit:12},audio:[]});
test('VFR timestamps select covering intervals after nonzero source origin',()=>{
 const pts=[5,5.04,5.12];
 assert.equal(selectVideoFrame(pts,0.09,0.16,'error'),1);
 assert.equal(selectVideoFrame(pts,0.12,0.16,'error'),2);
 assert.equal(selectVideoFrame(pts,0.18,0.16,'hold'),2);
 assert.equal(selectVideoFrame(pts,0.18,0.16,'loop'),0);
 assert.throws(()=>selectVideoFrame(pts,0.18,0.16,'error'),/range/);
});
test('PCM mix anchors and envelopes use project frames without normalization',()=>{
 const pcm=new Float32Array(48000*2).fill(0.25);
 const result=mixPCM({...film,audio:[{id:'tone',asset:'a',start:{marker:'hit'},end:24,gain:2,fadeIn:6}]},new Map([['a',pcm]]));
 assert.equal(result.samples.length,96000);
 assert.equal(result.samples[23999*2],0);
 assert.equal(result.samples[24000*2],0);
 assert.ok(Math.abs(result.samples[30000*2]-0.25)<0.0001);
 assert.equal(result.samples[40000*2],0.5);
 assert.equal(result.peak,0.5);
});
test('short audio requires explicit policy, clipping and invalid envelope fail',()=>{
 const pcm=new Float32Array(100).fill(0.75);
 const event={id:'a',asset:'a',start:0,end:24};
 assert.throws(()=>mixPCM({...film,audio:[event]},new Map([['a',pcm]])),/short/);
 assert.equal(mixPCM({...film,audio:[{...event,shortage:'silence'}]},new Map([['a',pcm]])).samples[200],0);
 assert.throws(()=>mixPCM({...film,audio:[{...event,loop:true,gain:2}]},new Map([['a',pcm]])),/clip/i);
 assert.throws(()=>mixPCM({...film,audio:[{...event,loop:true,envelope:[[25,1]]}]},new Map([['a',pcm]])),/envelope/);
});
test('FFmpeg VFR decode preserves ground truth frames and nonzero PTS',async()=>{
 const {mkdtemp,writeFile,rm}=await import('node:fs/promises');const {join}=await import('node:path');const {tmpdir}=await import('node:os');const {run}=await import('../src/process.js');const {prepare}=await import('../src/prepare.js');
 const dir=await mkdtemp(join(tmpdir(),'lvm-vfr-'));try{
 // Three independent solid PPM images with unequal durations, then shift source clock by 5 seconds.
 for(const [i,color] of [[0,[255,0,0]],[1,[0,255,0]],[2,[0,0,255]]] as const){await writeFile(join(dir,`${i}.ppm`),Buffer.concat([Buffer.from('P6\n2 2\n255\n'),Buffer.from([...color,...color,...color,...color])]));}
 await writeFile(join(dir,'concat.txt'),"file '0.ppm'\nduration 0.04\nfile '1.ppm'\nduration 0.08\nfile '2.ppm'\nduration 0.04\n");
 await run('ffmpeg',['-v','error','-f','concat','-safe','0','-i',join(dir,'concat.txt'),'-vf','setpts=PTS+5/TB','-fps_mode','vfr','-c:v','ffv1',join(dir,'vfr.mkv')]);
 const p=await prepare(dir,{...film,assets:[{id:'v',src:'vfr.mkv',kind:'video',outOfRange:'hold'}]});const v=p.videos.v;assert.equal(v.pts[0],5);assert.equal(selectVideoFrame(v.pts,0.09,v.duration,'hold'),1);
 const pixel=await run('ffmpeg',['-v','error','-i',v.files[1],'-f','rawvideo','-pix_fmt','rgb24','pipe:1']);assert.deepEqual([...pixel.subarray(0,3)],[0,255,0]);
 }finally{await rm(dir,{recursive:true,force:true});}
});
