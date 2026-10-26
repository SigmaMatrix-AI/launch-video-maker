import {test} from 'node:test';import assert from 'node:assert/strict';
import {mkdtemp,readFile,rm,writeFile} from 'node:fs/promises';import {join} from 'node:path';import {tmpdir} from 'node:os';
import {capturePage,analyzeAudio,validateReview} from '../src/tools.js';import {wavPCM} from '../src/audio.js';
test('capture records source, element bounds and high resolution crop',async()=>{
 const dir=await mkdtemp(join(tmpdir(),'lvm-capture-'));try{
 const result=await capturePage('data:text/html,<h1 id="title">Test product</h1>',dir,['#title']);
 assert.equal(result.elements.length,1);assert.ok(result.elements[0].bounds.width>0);assert.equal(result.scale,2);assert.ok((await readFile(join(dir,'page.png'))).length>100);
 }finally{await rm(dir,{recursive:true,force:true});}
});
test('audio analysis finds known impulse and reports energy without claiming musical beats',async()=>{
 const dir=await mkdtemp(join(tmpdir(),'lvm-audio-'));try{
 const pcm=new Float32Array(96000);pcm[48000]=0.5;pcm[48001]=0.5;const file=join(dir,'test.wav');await writeFile(file,wavPCM(pcm));
 const report=await analyzeAudio(file);assert.equal(report.peak,0.5);assert.ok(report.transients.some(t=>Math.abs(t-0.5)<0.02));assert.equal(report.duration,1);
 }finally{await rm(dir,{recursive:true,force:true});}
});
test('review never passes missing evidence, stale version, low dimension or blocker',()=>{
 const names=['风格还原','创意与惊艳','动效工艺','设计与排版','质感与细节','声音与同步','技术规格'];
 const report={version:'v1',independent:true,observedDynamics:true,listenedAudio:true,blockers:[],scores:Object.fromEntries(names.map(n=>[n,{score:8,evidence:'frame 12 + full playback'}]))};
 assert.equal(validateReview(report,'v1').status,'passed');
 assert.notEqual(validateReview({...report,listenedAudio:false},'v1').status,'passed');
 assert.notEqual(validateReview(report,'v2').status,'passed');
 assert.notEqual(validateReview({...report,scores:{...report.scores,'声音与同步':{score:7.4,evidence:'quiet'}}},'v1').status,'passed');
 assert.notEqual(validateReview({...report,blockers:['false claim']},'v1').status,'passed');
});
test('full page capture loads offscreen lazy images instead of waiting forever',{timeout:10000},async()=>{
 const dir=await mkdtemp(join(tmpdir(),'lvm-lazy-'));try{
 const image='data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="10" height="10"%3E%3Crect width="10" height="10" fill="red"/%3E%3C/svg%3E';
 const html=`<div style="height:8000px">top</div><img loading="lazy" src='${image}'>`;
 const result=await capturePage('data:text/html,'+encodeURIComponent(html),dir);assert.ok(result.source.startsWith('data:'));
 }finally{await rm(dir,{recursive:true,force:true});}
});
