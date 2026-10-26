import {chromium,type Page} from 'playwright';
import {mkdir,writeFile,readFile,copyFile} from 'node:fs/promises';
import {join} from 'node:path';
import {run} from './process.js';
import type {FilmServer} from './server.js';
import {openCapture} from './renderer.js';
export async function capturePage(url:string,dest:string,selectors:string[]=[],interact?:(page:Page)=>Promise<void>){
 await mkdir(dest,{recursive:true});const browser=await chromium.launch();try{
 const page=await browser.newPage({viewport:{width:1440,height:900},deviceScaleFactor:2});await page.goto(url,{waitUntil:'load'});if(interact)await interact(page);
 await page.evaluate(async()=>{
  // Eagerly request lazy images before a full-page capture; do not wait on offscreen lazy loading.
  for(const image of document.images)image.loading='eager';
  let timer:ReturnType<typeof setTimeout>;
  await Promise.race([Promise.all([document.fonts.ready,...[...document.images].filter(i=>i.currentSrc||i.getAttribute('src')).map(i=>i.decode().catch(()=>{throw Error('Image failed: '+i.src);}))]),new Promise((_,reject)=>{timer=setTimeout(()=>reject(Error('Page resources not ready within 15 seconds')),15000);})]).finally(()=>clearTimeout(timer));
 });
 await page.screenshot({path:join(dest,'page.png'),fullPage:true});const elements=[];
 for(const [i,selector] of selectors.entries()){const loc=page.locator(selector);await loc.waitFor({state:'visible'});const bounds=await loc.boundingBox();await loc.screenshot({path:join(dest,`element-${i}.png`)});elements.push({selector,bounds,file:`element-${i}.png`});}
 const result={source:url,finalURL:page.url(),capturedAt:new Date().toISOString(),scale:2,viewport:{width:1440,height:900},elements};await writeFile(join(dest,'capture.json'),JSON.stringify(result,null,2));return result;
 }finally{await browser.close();}
}
export async function analyzeAudio(file:string){
 const raw=await run('ffmpeg',['-v','error','-i',file,'-f','f32le','-ar','48000','-ac','2','pipe:1']);const frames=raw.length/8;let peak=0;const windows:{time:number;peak:number;rms:number}[]=[],transients:number[]=[];
 for(let start=0;start<frames;start+=480){let p=0,energy=0;const n=Math.min(480,frames-start);for(let i=0;i<n;i++){const l=raw.readFloatLE((start+i)*8),r=raw.readFloatLE((start+i)*8+4);p=Math.max(p,Math.abs(l),Math.abs(r));energy+=(l*l+r*r)/2;}peak=Math.max(peak,p);windows.push({time:start/48000,peak:p,rms:Math.sqrt(energy/n)});}
 for(let i=0;i<windows.length;i++)if(windows[i].peak>0.05&&windows[i].peak>(windows[i-1]?.peak??0)*2+0.02)transients.push(windows[i].time);
 return {duration:frames/48000,peak,windows,transients,note:'Transient candidates, not verified beats. Listen and calibrate musical markers.'};
}
const dimensions=['风格还原','创意与惊艳','动效工艺','设计与排版','质感与细节','声音与同步','技术规格'];
export function validateReview(report:any,version:string){
 const missing:string[]=[];if(report.version!==version)missing.push('stale version');
 for(const k of ['independent','observedDynamics','listenedAudio'])if(report[k]!==true)missing.push(k);
 for(const name of dimensions){const item=report.scores?.[name];if(!item||typeof item.score!=='number'||!Number.isFinite(item.score)||item.score<0||item.score>10||!item.evidence?.trim())missing.push(name);}
 if(missing.length)return {status:'incomplete',missing};
 if(!Array.isArray(report.blockers))return {status:'incomplete',missing:['blockers']};
 const low=dimensions.filter(n=>report.scores[n].score<7.5);return {status:low.length||report.blockers.length?'failed':'passed',low,blockers:report.blockers};
}
export async function reviewPack(server:FilmServer,dest:string){
 await mkdir(dest,{recursive:true});const capture=await openCapture(server);const f=server.prepared.film;
 try{
 const frames=[...new Set([0,f.durationInFrames-1,...f.scenes.flatMap(s=>[s.start,Math.floor((s.start+s.end-1)/2),s.end-1])])].sort((a,b)=>a-b);
 for(const frame of frames)await writeFile(join(dest,`frame-${frame}.png`),await capture.frame(frame));
 await copyFile(join(server.prepared.cache,'mix.wav'),join(dest,'mix.wav'));
 const inputs:Record<string,string>={};for(const file of ['records/brief.md','records/direction.md','records/storyboard.md','brand-kit/sources.json']){try{inputs[file]=await readFile(join(server.project,file),'utf8');}catch{inputs[file]='MISSING';}}
 const report={version:server.prepared.version,project:server.project,previewCommand:'npm run preview',film:f,inputs,keyframes:frames,peak:server.prepared.peak,status:'incomplete',independent:false,observedDynamics:false,listenedAudio:false,blockers:[],scores:Object.fromEntries(dimensions.map(n=>[n,{score:null,evidence:''}]))};
 await writeFile(join(dest,'review.json'),JSON.stringify(report,null,2));return report;
 }finally{await capture.close();}
}
