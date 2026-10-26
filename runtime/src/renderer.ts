import {chromium} from 'playwright';
import {access,mkdir,writeFile,mkdtemp,rm,rename} from 'node:fs/promises';
import {join,dirname,resolve} from 'node:path';
import type {FilmServer} from './server.js';
import {run} from './process.js';
import {doctor} from './project.js';
export async function openCapture(server:FilmServer){
 const {film,version}=server.prepared;const browser=await chromium.launch({headless:true,args:['--force-color-profile=srgb']});
 try{
 const page=await browser.newPage({viewport:{width:film.width,height:film.height},deviceScaleFactor:1});
 const errors:string[]=[];page.on('pageerror',e=>errors.push(String(e)));
 await page.goto(server.url+'/?capture');await page.waitForFunction(()=>Boolean((window as any).__LVM__?.ready||(window as any).__LVM__?.error),{},{timeout:30000}).catch(e=>{throw Error(`${e}\n${errors.join('\n')}`);});
 const error=await page.evaluate(()=>(window as any).__LVM__.error);if(error)throw Error(error);
 let id=0;let busy=false;
 return {page,frame:async(frame:number)=>{
  if(busy)throw Error('Capture transaction busy');busy=true;
  try{
   await server.assertVersion();const requestId=++id;
   const ready=await page.evaluate(async({frame,version,requestId})=>(window as any).__LVM__.acquire(frame,version,requestId),{frame,version,requestId});
   if(ready.frame!==frame||ready.version!==version||ready.requestId!==requestId)throw Error('Mismatched frame readiness');
   const png=await page.locator('#stage').screenshot({type:'png',animations:'allow'});await server.assertVersion();if(errors.length)throw Error(errors.join('\n'));return png;
  }finally{await page.evaluate(()=>(window as any).__LVM__.release()).catch(()=>{});busy=false;}
 },close:()=>browser.close()};
 }catch(e){await browser.close();throw e;}
}
export async function inspect(file:string){
 const probe=JSON.parse((await run('ffprobe',['-v','error','-count_frames','-show_streams','-show_format','-of','json',file])).toString());
 const video=probe.streams.find((s:any)=>s.codec_type==='video'),audio=probe.streams.find((s:any)=>s.codec_type==='audio');if(!video)throw Error('Missing video stream');
 return {file:resolve(file),width:video.width,height:video.height,frames:Number(video.nb_read_frames),fps:video.r_frame_rate,duration:Number(probe.format.duration),codec:video.codec_name,pixelFormat:video.pix_fmt,colorSpace:video.color_space,audio,streams:probe.streams};
}
export async function render(server:FilmServer,output:string,signal?:AbortSignal){
 const dest=resolve(output);try{await access(dest);throw Error(`Output exists: ${dest}`);}catch(e){if((e as NodeJS.ErrnoException).code!=='ENOENT')throw e;}
 const f=server.prepared.film;if(f.width%2||f.height%2)throw Error('H264 yuv420p requires even dimensions');
 await mkdir(dirname(dest),{recursive:true});const temp=await mkdtemp(join(server.project,'.lvm','render-'));let capture:Awaited<ReturnType<typeof openCapture>>|undefined;
 try{
  capture=await openCapture(server);
  for(let frame=0;frame<f.durationInFrames;frame++){signal?.throwIfAborted();await writeFile(join(temp,`${String(frame).padStart(8,'0')}.png`),await capture.frame(frame));}
  await capture.close();capture=undefined;
  const encoded=join(temp,'output.mp4');await run('ffmpeg',['-v','error','-framerate',`${f.fps.num}/${f.fps.den}`,'-i',join(temp,'%08d.png'),'-i',join(server.prepared.cache,'mix.wav'),'-map','0:v:0','-map','1:a:0','-frames:v',String(f.durationInFrames),'-c:v','libx264','-preset','medium','-crf','18','-pix_fmt','yuv420p','-vf','scale=in_range=full:out_range=tv:out_color_matrix=bt709','-colorspace','bt709','-color_primaries','bt709','-color_trc','bt709','-c:a','aac','-b:a','320k','-ar','48000','-ac','2','-movflags','+faststart',encoded],{signal});
  const report=await inspect(encoded);if(report.frames!==f.durationInFrames||report.width!==f.width||report.height!==f.height||report.audio?.sample_rate!=='48000')throw Error('Encoded output failed specification check');
  await server.assertVersion();await access(dest).then(()=>{throw Error('Output exists');},e=>{if(e.code!=='ENOENT')throw e;});
  await rename(encoded,dest);await writeFile(dest+'.json',JSON.stringify({...report,file:dest,version:server.prepared.version,tools:await doctor(),review:'Technical probe only; visual/audio independent review pending'},null,2));return {...report,file:dest};
 }finally{await capture?.close();await rm(temp,{recursive:true,force:true});}
}
