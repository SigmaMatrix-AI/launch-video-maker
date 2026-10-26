import {createHash} from 'node:crypto';
import {readFile,readdir,mkdir,writeFile,rename,rm,realpath,stat} from 'node:fs/promises';
import {join,resolve,sep,extname} from 'node:path';
import {defineFilm,type Film} from './core.js';
import {mixPCM,wavPCM} from './audio.js';
import {run} from './process.js';
import {decodeVideo} from './decode.js';
export async function contentVersion(project:string){
 const hash=createHash('sha256');
 async function visit(dir:string){for(const entry of (await readdir(dir,{withFileTypes:true})).sort((a,b)=>a.name.localeCompare(b.name))){
  if(['node_modules','.git','.lvm','exports','vendor','.DS_Store','Thumbs.db'].includes(entry.name)||entry.name.startsWith('._')||entry.name.startsWith('.lvm-test-')||entry.name.startsWith('.lvm-render-')||/\.(mp4|png|wav)\.tmp$/.test(entry.name))continue;
  const file=join(dir,entry.name);if(entry.isSymbolicLink())throw Error(`Project symlink unsupported: ${file}`);
  if(entry.isDirectory())await visit(file);else if(entry.isFile()){hash.update(file.slice(project.length));hash.update(await readFile(file));}
 }}await visit(project);return hash.digest('hex');
}
export async function localAsset(project:string,src:string){const root=await realpath(project),path=await realpath(resolve(project,src));if(!path.startsWith(root+sep))throw Error(`Asset must be inside project: ${src}`);return path;}
export type VideoInfo={pts:number[];duration:number;files:string[];policy:'hold'|'loop'|'error'};
export type Prepared={version:string;film:Film;cache:string;assets:Record<string,string>;videos:Record<string,VideoInfo>;peak:number};
export async function prepare(project:string,config:Film,options:{maxDecodedBytes?:number}={}):Promise<Prepared>{
 const maxBytes=options.maxDecodedBytes??2*1024**3;
 if(!Number.isSafeInteger(maxBytes)||maxBytes<=0)throw Error('Invalid decoded byte budget');
 const film=defineFilm(config),version=await contentVersion(project),cache=join(project,'.lvm',version),assets:Record<string,string>={},videos:Record<string,VideoInfo>={};
 await mkdir(cache,{recursive:true});const sources=new Map<string,Float32Array>();let bytes=0;
 for(const a of film.assets){
  if(!/^[a-zA-Z0-9_-]+$/.test(a.id))throw Error(`Unsafe asset id: ${a.id}`);
  const source=await localAsset(project,a.src);assets[a.id]=source;
  if(a.kind==='image'){
   if(extname(source).toLowerCase()==='.svg'){
    const svg=await readFile(source,'utf8');if(/<(?:animate|set|script)\b|@keyframes|https?:\/\//i.test(svg.replace(/xmlns="[^"]*"/g,'')))throw Error(`Animated or external SVG unsupported: ${a.id}`);
   }else{
    const probe=JSON.parse((await run('ffprobe',['-v','error','-count_frames','-select_streams','v:0','-show_entries','stream=nb_read_frames','-of','json',source])).toString());
    if(probe.streams?.length!==1||Number(probe.streams[0].nb_read_frames)!==1)throw Error(`Animated image unsupported: ${a.id}; use video frames`);
   }
  }
  if(a.kind==='audio'){
   const raw=await run('ffmpeg',['-v','error','-i',source,'-f','f32le','-ar','48000','-ac','2','pipe:1']);
   const pcm=new Float32Array(raw.length/4);for(let i=0;i<pcm.length;i++)pcm[i]=raw.readFloatLE(i*4);sources.set(a.id,pcm);
  }
  if(a.kind==='video'){
   const info=JSON.parse((await run('ffprobe',['-v','error','-select_streams','v:0','-show_frames','-show_streams','-show_entries','frame=best_effort_timestamp_time,duration_time:stream=duration','-of','json',source])).toString());
   const pts=info.frames.map((f:any)=>Number(f.best_effort_timestamp_time));
   if(!pts.length||pts.some((x:number,i:number)=>!Number.isFinite(x)||(i>0&&x<=pts[i-1])))throw Error(`Invalid video PTS: ${a.id}`);
   const tail=Number(info.frames.at(-1).duration_time)||Number(info.streams[0].duration)-(pts.at(-1)!-pts[0]);
   const duration=pts.at(-1)!-pts[0]+tail;if(!(tail>0))throw Error(`Unknown final video frame duration: ${a.id}`);
   const dir=join(cache,a.id),marker=join(dir,'complete.json');
   const files=pts.map((_:number,i:number)=>join(dir,`${String(i).padStart(8,'0')}.png`));let complete=false,existingBytes=0;
   try{const saved=JSON.parse(await readFile(marker,'utf8'));for(const file of files)existingBytes+=(await stat(file)).size;complete=saved.count===pts.length&&existingBytes===saved.bytes;}catch{}
   if(!complete){
    const staging=dir+`-partial-${process.pid}`;await rm(staging,{recursive:true,force:true});
    const decoded=await decodeVideo(source,staging,maxBytes-bytes);
    if(decoded.count!==pts.length){await rm(staging,{recursive:true,force:true});throw Error(`Video frame count mismatch: ${a.id}`);}
    await writeFile(join(staging,'complete.json'),JSON.stringify(decoded));await rm(dir,{recursive:true,force:true});await rename(staging,dir);existingBytes=decoded.bytes;
   }
   bytes+=existingBytes;if(bytes>maxBytes)throw Error('Decoded video byte budget exceeded');
   videos[a.id]={pts,duration,files,policy:a.outOfRange??'error'};
  }
 }
 const mix=mixPCM(film,sources);await writeFile(join(cache,'mix.wav'),wavPCM(mix.samples));
 const result={version,film,cache,assets,videos,peak:mix.peak};await writeFile(join(cache,'prepared.json'),JSON.stringify(result,null,2));
 if(await contentVersion(project)!==version)throw Error('Content changed during preparation');return result;
}
