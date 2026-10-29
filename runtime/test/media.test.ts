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
test('brand-kit video mutations invalidate content version',async()=>{
 const {mkdtemp,mkdir,writeFile,rm}=await import('node:fs/promises');const {join}=await import('node:path');const {tmpdir}=await import('node:os');const {contentVersion}=await import('../src/prepare.js');const dir=await mkdtemp(join(tmpdir(),'lvm-hash-'));
 try{await mkdir(join(dir,'brand-kit'));await writeFile(join(dir,'brand-kit','clip.mp4'),'v1');const first=await contentVersion(dir);await writeFile(join(dir,'brand-kit','clip.mp4'),'v2');assert.notEqual(await contentVersion(dir),first);}finally{await rm(dir,{recursive:true,force:true});}
});
test('animated GIF cannot masquerade as deterministic still image',async()=>{
 const {mkdtemp,rm}=await import('node:fs/promises');const {join}=await import('node:path');const {tmpdir}=await import('node:os');const {run}=await import('../src/process.js');const {prepare}=await import('../src/prepare.js');const dir=await mkdtemp(join(tmpdir(),'lvm-gif-'));
 try{await run('ffmpeg',['-v','error','-f','lavfi','-i','color=red:s=16x16:r=2:d=1','-frames:v','2',join(dir,'animated.gif')]);await assert.rejects(prepare(dir,{...film,assets:[{id:'a',kind:'image',src:'animated.gif'}]}),/animated/i);}finally{await rm(dir,{recursive:true,force:true});}
});
test('video byte budget aborts during decode and removes partial cache',async()=>{
 const {mkdtemp,rm,readdir}=await import('node:fs/promises');const {join}=await import('node:path');const {tmpdir}=await import('node:os');const {run}=await import('../src/process.js');const {prepare}=await import('../src/prepare.js');const dir=await mkdtemp(join(tmpdir(),'lvm-budget-'));
 try{await run('ffmpeg',['-v','error','-f','lavfi','-i','testsrc=size=64x64:rate=30:duration=1','-c:v','ffv1',join(dir,'source.mkv')]);await assert.rejects(prepare(dir,{...film,assets:[{id:'v',kind:'video',src:'source.mkv'}]},{maxDecodedBytes:100}),/budget|limit/i);const names=await readdir(join(dir,'.lvm'),{recursive:true});assert.ok(!names.some(n=>String(n).endsWith('.png')));}finally{await rm(dir,{recursive:true,force:true});}
});
test('product brief revisions invalidate independent review version',async()=>{
 const {mkdtemp,mkdir,writeFile,rm}=await import('node:fs/promises');const {join}=await import('node:path');const {tmpdir}=await import('node:os');const {contentVersion}=await import('../src/prepare.js');const dir=await mkdtemp(join(tmpdir(),'lvm-brief-'));
 try{await mkdir(join(dir,'records'));await writeFile(join(dir,'records','brief.md'),'claim one');const version=await contentVersion(dir);await writeFile(join(dir,'records','brief.md'),'claim two');assert.notEqual(await contentVersion(dir),version);}finally{await rm(dir,{recursive:true,force:true});}
});
test('mixed source sample rates normalize to stereo 48k and speed follows pitch',async()=>{
 const {mkdtemp,readFile,rm}=await import('node:fs/promises');const {join}=await import('node:path');const {tmpdir}=await import('node:os');const {run}=await import('../src/process.js');const {prepare}=await import('../src/prepare.js');const dir=await mkdtemp(join(tmpdir(),'lvm-rates-'));
 try{
 await run('ffmpeg',['-v','error','-f','lavfi','-i','sine=frequency=220:sample_rate=22050:duration=1',join(dir,'a.wav')]);await run('ffmpeg',['-v','error','-f','lavfi','-i','sine=frequency=440:sample_rate=44100:duration=1','-ac','2',join(dir,'b.wav')]);
 const p=await prepare(dir,{...film,assets:[{id:'a',kind:'audio',src:'a.wav'},{id:'b',kind:'audio',src:'b.wav'}],audio:[{id:'a',asset:'a',start:0,end:12},{id:'b',asset:'b',start:12,end:24,speed:2}]});const wav=await readFile(join(p.cache,'mix.wav'));assert.equal(wav.readUInt32LE(24),48000);assert.equal(wav.readUInt16LE(22),2);assert.equal(wav.length,44+96000*4);
 const crossings=(a:number,b:number)=>{let n=0;for(let i=a+1;i<b;i++)if(wav.readFloatLE(44+(i-1)*8)<0&&wav.readFloatLE(44+i*8)>=0)n++;return n;};assert.ok(Math.abs(crossings(0,24000)-110)<=1);assert.ok(Math.abs(crossings(24000,48000)-440)<=1);
 }finally{await rm(dir,{recursive:true,force:true});}
});
