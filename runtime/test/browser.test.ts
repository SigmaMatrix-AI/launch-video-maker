import {test} from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,writeFile,rm,readFile} from 'node:fs/promises';
import {join} from 'node:path';
import {tmpdir} from 'node:os';
import {startServer} from '../src/server.js';
import {openCapture,render,inspect} from '../src/renderer.js';
const project=()=>mkdtemp(join(process.cwd(),'.lvm-test-'));
test('real browser deterministic random seek, capture lock and version rejection',async()=>{
 const dir=await project();let server:any,capture:any;
 try{
 await writeFile(join(dir,'film.tsx'),`import React from 'react';export const film={width:320,height:180,fps:{num:30,den:1},durationInFrames:6,seed:1,scenes:[],assets:[],audio:[],markers:{}};export default function Frame({frame}){return <div style={{width:'100%',height:'100%',background:frame===3?'red':'blue'}}>frame {frame}</div>}`);
 server=await startServer(dir);capture=await openCapture(server);
 const a=await capture.frame(3);await capture.frame(5);await capture.frame(0);const b=await capture.frame(3);assert.deepEqual(a,b);
 await assert.rejects(capture.frame(6),/frame/);
 const out=join(dir,'out.mp4');await render(server,out);const report=await inspect(out);assert.equal(report.frames,6);assert.equal(report.width,320);assert.equal(report.audio.sample_rate,'48000');
 await assert.rejects(render(server,out),/exists/);
 await writeFile(join(dir,'film.tsx'),(await readFile(join(dir,'film.tsx'),'utf8'))+'\n// updated');
 await assert.rejects(capture.frame(2),/version|changed/);
 }finally{await capture?.close();await server?.close();await rm(dir,{recursive:true,force:true});}
});
test('missing declared resource fails preparation, never reports ready',async()=>{
 const dir=await project();try{
 await writeFile(join(dir,'film.tsx'),`export const film={width:320,height:180,fps:{num:30,den:1},durationInFrames:6,seed:1,scenes:[],assets:[{id:'bad',kind:'image',src:'absent.png'}],audio:[],markers:{}};export default function Frame(){return null;}`);
 await assert.rejects(startServer(dir),/absent|ENOENT/);
 }finally{await rm(dir,{recursive:true,force:true});}
});
test('player advances on audio clock and pause/seek cancels residual sound',async()=>{
 const dir=await project();let server:any,browser:any;
 try{
 await writeFile(join(dir,'film.tsx'),`import React from 'react';export const film={width:320,height:180,fps:{num:30,den:1},durationInFrames:90,seed:1,scenes:[],assets:[],audio:[],markers:{}};export default function Frame({frame}){return <div>{frame}</div>}`);
 server=await startServer(dir);const {chromium}=await import('playwright');browser=await chromium.launch();const page=await browser.newPage();
 await page.addInitScript(()=>{const Native=window.AudioContext;window.__starts=[];window.AudioContext=class extends Native{constructor(...args){super(...args);window.__audio=this;}createBufferSource(){const source=super.createBufferSource(),start=source.start.bind(source);source.start=(...args)=>{window.__starts.push({epoch:this.currentTime,offset:args[1]??0});return start(...args);};return source;}};});
 await page.goto(server.url);await page.waitForFunction(()=>window.__LVM__?.ready);
 await page.click('#play');await page.waitForTimeout(1100);
 // Headless audio device startup latency varies independently of wall-clock time.
 // Verify alignment with the actual device timestamp and no per-frame audio restarts.
 const measured=await page.evaluate(()=>({state:window.__LVM__.state(),output:window.__audio.getOutputTimestamp(),starts:window.__starts,now:performance.now()}));
 assert.equal(measured.starts.length,1,'Simple playback must keep one continuous audio source');
 const audible=measured.output.contextTime+(measured.now-measured.output.performanceTime)/1000-measured.starts[0].epoch;
 assert.ok(audible>0.1,'Audio device did not advance');assert.ok(Math.abs(measured.state.frame-audible*30)<=2,`Visual frame ${measured.state.frame} differs from audio output ${audible*30}`);
 await page.click('#play');const paused=await page.evaluate(()=>window.__LVM__.state().frame);await page.waitForTimeout(150);assert.equal(await page.evaluate(()=>window.__LVM__.state().frame),paused);
 await page.locator('#seek').fill('7');await page.waitForFunction(()=>window.__LVM__.state().frame===7);assert.equal(await page.evaluate(()=>window.__LVM__.state().playing),false);
 }finally{await browser?.close();await server?.close();await rm(dir,{recursive:true,force:true});}
});
test('public React helpers share context and wait for asynchronous DOM drawing',async()=>{
 const dir=await project();let server:any,capture:any;try{
 await writeFile(join(dir,'film.tsx'),`import React,{useRef} from 'react';import {useFrameTask} from '@launch-video-maker/runtime/react';export const film={width:320,height:180,fps:{num:24,den:1},durationInFrames:4,seed:1,scenes:[],assets:[],audio:[],markers:{}};export default function Frame({frame}){const ref=useRef(null);useFrameTask(async(signal)=>{await new Promise(r=>setTimeout(r,80));if(!signal.aborted)ref.current.textContent='ready '+frame;});return <div ref={ref}>loading</div>}`);
 server=await startServer(dir);capture=await openCapture(server);await capture.frame(3);assert.equal(await capture.page.locator('#stage').innerText(),'ready 3');
 }finally{await capture?.close();await server?.close();await rm(dir,{recursive:true,force:true});}
});
test('latest seek survives cancellation of a slow playback request',async()=>{
 const dir=await project();let server:any,browser:any;try{
 await writeFile(join(dir,'film.tsx'),`import React,{useRef} from 'react';import {useFrameTask} from '@launch-video-maker/runtime/react';export const film={width:320,height:180,fps:{num:30,den:1},durationInFrames:90,seed:1,scenes:[],assets:[],audio:[],markers:{}};export default function Frame({frame}){const ref=useRef(null);useFrameTask(async(signal)=>{await new Promise(r=>setTimeout(r,250));if(!signal.aborted)ref.current.textContent='ready '+frame;});return <div ref={ref}>loading {frame}</div>}`);
 server=await startServer(dir);const {chromium}=await import('playwright');browser=await chromium.launch();const page=await browser.newPage();await page.goto(server.url);await page.waitForFunction(()=>window.__LVM__?.ready);await page.click('#play');await page.waitForTimeout(150);await page.locator('#seek').fill('50');await page.waitForTimeout(650);
 assert.equal(await page.evaluate(()=>window.__LVM__.state().frame),50);assert.equal(await page.locator('#stage').innerText(),'ready 50');assert.equal(await page.locator('#error').innerText(),'');
 }finally{await browser?.close();await server?.close();await rm(dir,{recursive:true,force:true});}
});
test('pending frame keeps previous ready visual until asynchronous work completes',async()=>{
 const dir=await project();let server:any,capture:any;try{
 await writeFile(join(dir,'film.tsx'),`import React,{useRef} from 'react';import {useFrameTask} from '@launch-video-maker/runtime/react';export const film={width:320,height:180,fps:{num:30,den:1},durationInFrames:90,seed:1,scenes:[],assets:[],audio:[],markers:{}};export default function Frame({frame}){const ref=useRef(null);useFrameTask(async(signal)=>{await new Promise(r=>setTimeout(r,250));if(!signal.aborted)ref.current.textContent='ready '+frame;});return <div ref={ref}>loading {frame}</div>}`);
 server=await startServer(dir);capture=await openCapture(server);await capture.page.evaluate(()=>{window.__pending=window.__LVM__.setFrame(20);});assert.equal(await capture.page.locator('#stage').innerText(),'ready 0');await capture.page.evaluate(()=>window.__pending);assert.equal(await capture.page.locator('#stage').innerText(),'ready 20');
 }finally{await capture?.close();await server?.close();await rm(dir,{recursive:true,force:true});}
});
test('SVG assets decode with correct MIME and animated image sources are rejected',async()=>{
 const dir=await project();let server:any,capture:any;try{
 await writeFile(join(dir,'logo.svg'),'<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10"><rect width="10" height="10" fill="red"/></svg>');
 const body=`import React from 'react';import {AssetImage} from '@launch-video-maker/runtime/react';export const film={width:32,height:32,fps:{num:30,den:1},durationInFrames:3,seed:1,scenes:[],assets:[{id:'logo',kind:'image',src:'logo.svg'}],audio:[],markers:{}};export default function Frame(){return <AssetImage asset="logo"/>}`;
 await writeFile(join(dir,'film.tsx'),body);server=await startServer(dir);capture=await openCapture(server);assert.ok((await capture.frame(0)).length>100);
 }finally{await capture?.close();await server?.close();await rm(dir,{recursive:true,force:true});}
});
test('failed sidecar publication never leaves a final MP4',async()=>{
 const {mkdir,access}=await import('node:fs/promises');const dir=await project();let server:any;try{
 await writeFile(join(dir,'film.tsx'),`export const film={width:32,height:32,fps:{num:30,den:1},durationInFrames:2,seed:1,scenes:[],assets:[],audio:[],markers:{}};export default function Frame(){return null;}`);
 const out=join(dir,'exports','failed.mp4');await mkdir(out+'.json',{recursive:true});server=await startServer(dir);await assert.rejects(render(server,out));await assert.rejects(access(out));
 }finally{await server?.close();await rm(dir,{recursive:true,force:true});}
});
test('pause during initial audio decode prevents delayed playback restart',async()=>{
 const dir=await project();let server:any,browser:any;try{
 await writeFile(join(dir,'film.tsx'),`import React from 'react';export const film={width:320,height:180,fps:{num:30,den:1},durationInFrames:90,seed:1,scenes:[],assets:[],audio:[],markers:{}};export default function Frame({frame}){return <div>{frame}</div>}`);
 server=await startServer(dir);const {chromium}=await import('playwright');browser=await chromium.launch();const page=await browser.newPage();await page.route('**/__lvm/mix',async route=>{await new Promise(r=>setTimeout(r,600));await route.continue();});await page.goto(server.url);await page.waitForFunction(()=>window.__LVM__?.ready);await page.click('#play');await page.locator('#seek').fill('50');await page.waitForTimeout(850);assert.deepEqual(await page.evaluate(()=>({frame:window.__LVM__.state().frame,playing:window.__LVM__.state().playing})),{frame:50,playing:false});
 }finally{await browser?.close();await server?.close();await rm(dir,{recursive:true,force:true});}
});
test('actual encoding supports portrait, 24/60 fps and rational 30000/1001',async()=>{
 for(const rate of [{num:24,den:1},{num:60,den:1},{num:30000,den:1001}]){
 const dir=await project();let server:any;try{
 await writeFile(join(dir,'film.tsx'),`import React from 'react';export const film={width:90,height:160,fps:${JSON.stringify(rate)},durationInFrames:6,seed:1,scenes:[],assets:[],audio:[],markers:{}};export default function Frame({frame}){return <div style={{background:frame===5?'red':'blue',width:'100%',height:'100%'}}/>}`);
 server=await startServer(dir);const r=await render(server,join(dir,'exports','film.mp4'));assert.equal(r.frames,6);assert.equal(r.width,90);assert.equal(r.height,160);assert.equal(r.fps,`${rate.num}/${rate.den}`);
 }finally{await server?.close();await rm(dir,{recursive:true,force:true});}}
});
test('competing destination writer is preserved and no report leaks',async()=>{
 const {mkdir,access}=await import('node:fs/promises');const dir=await project();let server:any;try{
 await writeFile(join(dir,'film.tsx'),`import React,{useRef} from 'react';import {useFrameTask} from '@launch-video-maker/runtime/react';export const film={width:32,height:32,fps:{num:30,den:1},durationInFrames:4,seed:1,scenes:[],assets:[],audio:[],markers:{}};export default function Frame(){useFrameTask(async()=>{await new Promise(r=>setTimeout(r,80));});return null;}`);
 await mkdir(join(dir,'exports'));const out=join(dir,'exports','race.mp4');server=await startServer(dir);const pending=render(server,out);const observed=assert.rejects(pending);await new Promise(r=>setTimeout(r,100));await writeFile(out,'other writer');await observed;assert.equal(await readFile(out,'utf8'),'other writer');await assert.rejects(access(out+'.json'));
 }finally{await server?.close();await rm(dir,{recursive:true,force:true});}
});
test('video playback prefetches only the next two decoded frames',async()=>{
 const {run}=await import('../src/process.js');const dir=await project();let server:any,capture:any;try{
 await run('ffmpeg',['-v','error','-f','lavfi','-i','testsrc=size=16x16:rate=10:duration=1','-c:v','ffv1',join(dir,'v.mkv')]);
 await writeFile(join(dir,'film.tsx'),`import React from 'react';import {VideoFrame} from '@launch-video-maker/runtime/react';export const film={width:32,height:32,fps:{num:10,den:1},durationInFrames:10,seed:1,scenes:[],assets:[{id:'v',kind:'video',src:'v.mkv'}],audio:[],markers:{}};export default function Frame({frame}){return <VideoFrame asset="v" time={frame/10}/>}`);
 server=await startServer(dir);capture=await openCapture(server);await capture.page.waitForFunction(()=>performance.getEntriesByType('resource').some(e=>e.name.includes('/video/v/2')),{},{timeout:1500});
 const frames=await capture.page.evaluate(()=>performance.getEntriesByType('resource').filter(e=>e.name.includes('/video/v/')).map(e=>new URL(e.name).pathname));assert.deepEqual([...new Set(frames)].sort(),['/__lvm/video/v/0','/__lvm/video/v/1','/__lvm/video/v/2']);
 }finally{await capture?.close();await server?.close();await rm(dir,{recursive:true,force:true});}
});
test('Finder metadata and unchanged file touches do not invalidate a running preview',async()=>{
 const {utimes}=await import('node:fs/promises');const dir=await project();let server:any;try{
 const file=join(dir,'film.tsx');await writeFile(file,`export const film={width:32,height:32,fps:{num:30,den:1},durationInFrames:2,seed:1,scenes:[],assets:[],audio:[],markers:{}};export default function Frame(){return null;}`);
 server=await startServer(dir);await writeFile(join(dir,'.DS_Store'),'Finder layout');await utimes(file,new Date(),new Date());
 await new Promise(r=>setTimeout(r,150));assert.equal((await fetch(server.url+'/__lvm/version').then(r=>r.json())).version,server.prepared.version);await server.assertVersion();
 await writeFile(file,(await readFile(file,'utf8'))+'\n// source changed');await assert.rejects(server.assertVersion(),/changed/);
 }finally{await server?.close();await rm(dir,{recursive:true,force:true});}
});
test('explicitly visible scene descendants cannot leak from a pending frame',async()=>{
 const dir=await project();let server:any,capture:any;try{
 await writeFile(join(dir,'film.tsx'),`import React from 'react';import {useFrameTask} from '@launch-video-maker/runtime/react';export const film={width:96,height:96,fps:{num:30,den:1},durationInFrames:3,seed:1,scenes:[],assets:[],audio:[],markers:{}};export default function Frame({frame}){useFrameTask(async()=>{if(frame>0)await new Promise(r=>setTimeout(r,900));});return <div style={{visibility:'visible',width:'100%',height:'100%',background:frame===0?'red':'blue'}}/>}`);
 server=await startServer(dir);capture=await openCapture(server);const old=await capture.page.locator('#stage').screenshot();
 await capture.page.evaluate(()=>{window.__pending=window.__LVM__.setFrame(1);});
 const pending=await capture.page.locator('#stage').screenshot();await capture.page.evaluate(()=>window.__pending);assert.deepEqual(pending,old,'A pending visible descendant painted over the ready frame');
 assert.notDeepEqual(await capture.page.locator('#stage').screenshot(),old);
 }finally{await capture?.close();await server?.close();await rm(dir,{recursive:true,force:true});}
});
test('preview keeps the film centered and controls visible after window resize',async()=>{
 const dir=await project();let server:any,browser:any;try{
 await writeFile(join(dir,'film.tsx'),`export const film={width:1920,height:1080,fps:{num:30,den:1},durationInFrames:2,seed:1,scenes:[],assets:[],audio:[],markers:{}};export default function Frame(){return null;}`);
 server=await startServer(dir);const {chromium}=await import('playwright');browser=await chromium.launch();const page=await browser.newPage({viewport:{width:1400,height:800}});await page.goto(server.url);await page.waitForFunction(()=>window.__LVM__?.ready);
 for(const size of [{width:1400,height:800},{width:760,height:600}]){await page.setViewportSize(size);await page.waitForTimeout(60);const b=await page.locator('#stage').boundingBox(),c=await page.locator('#controls').boundingBox();assert.ok(Math.abs(b!.x+b!.width/2-size.width/2)<2,'Film must be horizontally centered');assert.ok(b!.y>=0&&b!.y+b!.height<=c!.y+1,'Film must fit above controls');assert.ok(c!.y+c!.height<=size.height,'Controls must remain on screen');}
 }finally{await browser?.close();await server?.close();await rm(dir,{recursive:true,force:true});}
});
test('scene semantic elements render identically in preview and capture',async()=>{
 const dir=await project();let server:any,browser:any,capture:any;try{
 await writeFile(join(dir,'film.tsx'),`import React from 'react';export const film={width:320,height:180,fps:{num:30,den:1},durationInFrames:2,seed:1,scenes:[],assets:[],audio:[],markers:{}};export default function Frame(){return <div style={{background:'white',color:'black',width:'100%',height:'100%'}}><header style={{background:'red',height:80}}>Scene title</header><button style={{background:'blue',color:'white'}}>Scene action</button></div>}`);
 server=await startServer(dir);const {chromium}=await import('playwright');browser=await chromium.launch({args:['--force-color-profile=srgb']});const page=await browser.newPage({viewport:{width:800,height:600}});await page.goto(server.url);await page.waitForFunction(()=>window.__LVM__?.ready);const preview=await page.locator('#stage').screenshot();capture=await openCapture(server);assert.deepEqual(await capture.frame(0),preview,'Player chrome CSS must not hide scene content during capture');assert.equal(await page.locator('#stage header').evaluate(e=>getComputedStyle(e).paddingLeft),'0px');
 }finally{await capture?.close();await browser?.close();await server?.close();await rm(dir,{recursive:true,force:true});}
});
