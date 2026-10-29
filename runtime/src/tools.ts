import {chromium,type Page} from 'playwright';
import {mkdir,writeFile} from 'node:fs/promises';
import {join} from 'node:path';
import {run} from './process.js';
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
