import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import {dirname,resolve,join} from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';
import {mkdir,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
const project=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const require=createRequire(join(project,'package.json'));
const runtime=resolve(dirname(require.resolve('@launch-video-maker/runtime')),'..','..');
const {startServer}=await import(pathToFileURL(join(runtime,'runtime/dist/server.js')));
const {openCapture}=await import(pathToFileURL(join(runtime,'runtime/dist/renderer.js')));
const {run}=await import(pathToFileURL(join(runtime,'runtime/dist/process.js')));
const {doctor}=await import(pathToFileURL(join(runtime,'runtime/dist/project.js')));
const server=await startServer(project);
let capture;
try {
 const f=server.prepared.film;
 assert.deepEqual([f.width,f.height,f.fps.num,f.fps.den,f.durationInFrames],[1280,720,60,1,1200]);
 assert.deepEqual(f.scenes.map(s=>[s.start,s.end]),[[0,225],[225,360],[360,555],[555,795],[795,1080],[1080,1200]]);
 capture=await openCapture(server);
 const phases=[['Idea01',0,45],['Transform02',45,120],['Outcome03',120,180],['Bridge04',180,225],['Portfolio05',225,360],['Value06',360,420],['Showcase07',420,555],['Explain08',555,675],['Audience09',675,795],['Invite10',795,825],['Action11',825,855],['Search12',855,1005],['Book13',1005,1080],['Brand14',1080,1200]];
 const full=process.argv.includes('--full');
 const frames=full?Array.from({length:1200},(_,i)=>i):[...new Set(phases.flatMap(([,a,b])=>[a,a+1,Math.floor((a+b)/2),b-1]))].sort((a,b)=>a-b);
 const out=join(project,'.lvm/validation');await mkdir(join(out,'frames'),{recursive:true});
 const hashes=new Map();const hash=b=>createHash('sha256').update(b).digest('hex');
 for(const frame of frames){
  const png=await capture.frame(frame);hashes.set(frame,hash(png));
  const expected=phases.find(([,a,b])=>frame>=a&&frame<b)[0];
  assert.equal(await capture.page.locator('[data-phase]').getAttribute('data-phase'),expected,`phase at ${frame}`);
  await writeFile(join(out,'frames',`${String(frame).padStart(4,'0')}.png`),png);
  if(frame%120===0)console.log(`validated ${frame}/1200`);
 }
 const seeks=[1199,0,1004,420,855,224,795,120,1080,360,45,555,675,180,225,1005,825];
 for(const frame of seeks){const a=hash(await capture.frame(frame));const b=hash(await capture.frame(frame));assert.equal(a,b,`repeat ${frame}`);if(hashes.has(frame))assert.equal(a,hashes.get(frame),`reverse ${frame}`);}
 const sourcePCM=await run('ffmpeg',['-v','error','-i',join(project,'assets/audio/music-master.wav'),'-f','f32le','-ar','48000','-ac','2','pipe:1']);
 const mixedPCM=await run('ffmpeg',['-v','error','-i',join(server.prepared.cache,'mix.wav'),'-f','f32le','-ar','48000','-ac','2','pipe:1']);
 assert.equal(sourcePCM.length,48000*20*2*4);assert.ok(sourcePCM.equals(mixedPCM),'PCM must remain sample-identical');
 await capture.page.goto(server.url);
 await capture.page.waitForFunction(()=>window.__LVM__?.ready||window.__LVM__?.error);
 assert.equal(await capture.page.evaluate(()=>window.__LVM__.error),undefined);
 await capture.page.locator('#play').click();
 await capture.page.waitForFunction(()=>window.__LVM__.state().frame>=60,null,{timeout:30000});
 await capture.page.locator('#play').click();
 assert.equal(await capture.page.evaluate(()=>window.__LVM__.state().playing),false);
 await capture.page.evaluate(()=>{const s=document.querySelector('#seek');s.value='900';s.dispatchEvent(new Event('input'));});
 await capture.page.waitForFunction(()=>window.__LVM__.state().frame===900);
 await capture.page.locator('#play').click();
 await capture.page.waitForFunction(()=>window.__LVM__.state().frame>=960,null,{timeout:30000});
 await capture.page.locator('#play').click();
 assert.equal(await capture.page.locator('#error').textContent(),'');
 const report={status:'passed',scope:'runtime-visual',frames:frames.length,phases:14,repeatReverseChecks:seeks.length,version:server.prepared.version,tools:await doctor(),frameHashes:Object.fromEntries(hashes),audio:{pcm:'sample-identical to 20s source master',samplesPerChannel:960000,peak:server.prepared.peak,player:'play/pause/seek/resume passed'},commercialReview:'not claimed'};
 await writeFile(join(out,'runtime.json'),JSON.stringify(report,null,2));console.log(JSON.stringify({...report,frameHashes:undefined},null,2));
}finally{await capture?.close();await server.close();}
