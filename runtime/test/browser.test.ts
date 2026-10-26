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
 server=await startServer(dir);const {chromium}=await import('playwright');browser=await chromium.launch();const page=await browser.newPage();await page.goto(server.url);await page.waitForFunction(()=>window.__LVM__?.ready);
 await page.click('#play');await page.waitForTimeout(1100);
 const state=await page.evaluate(()=>window.__LVM__.state());assert.ok(state.frame>=25,`Playback drift: ${state.frame} frames in 1.1s`);
 await page.click('#play');const paused=await page.evaluate(()=>window.__LVM__.state().frame);await page.waitForTimeout(150);assert.equal(await page.evaluate(()=>window.__LVM__.state().frame),paused);
 await page.locator('#seek').fill('7');await page.waitForFunction(()=>window.__LVM__.state().frame===7);assert.equal(await page.evaluate(()=>window.__LVM__.state().playing),false);
 }finally{await browser?.close();await server?.close();await rm(dir,{recursive:true,force:true});}
});
