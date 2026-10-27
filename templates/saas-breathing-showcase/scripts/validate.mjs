import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import {dirname,resolve,join} from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';
import {mkdir,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
const project=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const require=createRequire(join(project,'package.json'));
const runtime=resolve(dirname(require.resolve('@launch-video-maker/runtime')),'../..');
const {startServer}=await import(pathToFileURL(join(runtime,'runtime/dist/server.js')));
const {openCapture}=await import(pathToFileURL(join(runtime,'runtime/dist/renderer.js')));
const {run}=await import(pathToFileURL(join(runtime,'runtime/dist/process.js')));
const server=await startServer(project);let capture;
try {
 const f=server.prepared.film;assert.deepEqual([f.width,f.height,f.fps.num,f.durationInFrames],[960,540,30,930]);
 assert.equal(f.scenes[0].start,0);assert.equal(f.scenes.at(-1).end,930);
 for(let i=1;i<f.scenes.length;i++)assert.equal(f.scenes[i].start,f.scenes[i-1].end);
 capture=await openCapture(server);const full=process.argv.includes('--full');
 const frames=full?Array.from({length:930},(_,i)=>i):[...new Set([0,929,...Array.from({length:62},(_,i)=>i*15),...f.scenes.flatMap(s=>[s.start,s.start+1,s.end-1])])].sort((a,b)=>a-b);
 const out=join(project,'.lvm/validation');await mkdir(join(out,'frames'),{recursive:true});const hashes={};const hash=b=>createHash('sha256').update(b).digest('hex');
 for(const frame of frames){const png=await capture.frame(frame);hashes[frame]=hash(png);await writeFile(join(out,'frames',`${String(frame).padStart(4,'0')}.png`),png);if(frame%90===0)console.log(`checked ${frame}/930`);}
 for(const frame of [929,0,795,345,510,225,600,120,780,30]){const a=hash(await capture.frame(frame));assert.equal(a,hash(await capture.frame(frame)));if(hashes[frame])assert.equal(a,hashes[frame]);}
 const decode=file=>run('ffmpeg',['-v','error','-i',file,'-f','f32le','-ar','48000','-ac','2','pipe:1']);
 const source=await decode(join(project,'assets/audio/reference.wav')),mix=await decode(join(server.prepared.cache,'mix.wav'));
 assert.equal(source.length,31*48000*2*4);let maxError=0;for(let i=0;i<source.length;i+=4)maxError=Math.max(maxError,Math.abs(mix.readFloatLE(i)-Math.fround(source.readFloatLE(i)*.75)));assert.ok(maxError<1e-7,`Audio sample error ${maxError}`);
 await capture.page.goto(server.url);await capture.page.waitForFunction(()=>window.__LVM__?.ready||window.__LVM__?.error);assert.equal(await capture.page.evaluate(()=>window.__LVM__.error),undefined);
 await capture.page.locator('#play').click();await capture.page.waitForFunction(()=>window.__LVM__.state().frame>=30,null,{timeout:30000});await capture.page.locator('#play').click();
 await capture.page.evaluate(()=>{const s=document.querySelector('#seek');s.value='825';s.dispatchEvent(new Event('input'));});await capture.page.waitForFunction(()=>window.__LVM__.state().frame===825);
 await capture.page.locator('#play').click();await capture.page.waitForFunction(()=>window.__LVM__.state().frame>=855,null,{timeout:30000});await capture.page.locator('#play').click();assert.equal(await capture.page.locator('#error').textContent(),'');
 const report={status:'passed',scope:'runtime technical',version:server.prepared.version,frames:frames.length,reverseRepeat:10,audio:{duration:31,gain:.75,maxSampleError:maxError,alignment:'sample-identical after explicit gain'},player:'play/pause/seek/resume passed',peak:server.prepared.peak,frameHashes:hashes};
 await writeFile(join(out,full?'full.json':'smoke.json'),JSON.stringify(report,null,2));console.log(JSON.stringify({...report,frameHashes:undefined}));
}finally{await capture?.close();await server.close();}
