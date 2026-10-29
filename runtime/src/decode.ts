import {spawn} from 'node:child_process';
import {writeFile,mkdir,rm} from 'node:fs/promises';
import {join} from 'node:path';
/** Stream PNG frames with backpressure; enforce budget before any over-budget write. */
export async function decodeVideo(source:string,directory:string,maxBytes:number){
 await mkdir(directory,{recursive:true});
 const child=spawn('ffmpeg',['-v','error','-i',source,'-map','0:v:0','-fps_mode','passthrough','-c:v','png','-f','image2pipe','pipe:1'],{stdio:['ignore','pipe','pipe']});
 let stderr='';child.stderr.on('data',b=>{stderr=(stderr+b.toString()).slice(-8000);});
 const done=new Promise<void>((resolve,reject)=>{child.once('error',reject);child.once('close',code=>code===0?resolve():reject(Error(`Video decoder failed (${code}): ${stderr}`)));});void done.catch(()=>{});
 let pending=Buffer.alloc(0),bytes=0,count=0;
 try{
  for await(const chunk of child.stdout){
   bytes+=chunk.length;if(bytes>maxBytes)throw Error('Decoded video byte budget exceeded; trim source or increase preparation budget');
   pending=Buffer.concat([pending,chunk]);
   while(pending.length>=8){
    if(pending.subarray(0,8).toString('hex')!=='89504e470d0a1a0a')throw Error('Invalid PNG stream');
    let offset=8,end=0;
    while(offset+12<=pending.length){const length=pending.readUInt32BE(offset);if(offset+12+length>pending.length)break;const type=pending.toString('ascii',offset+4,offset+8);offset+=12+length;if(type==='IEND'){end=offset;break;}}
    if(!end)break;
    await writeFile(join(directory,`${String(count++).padStart(8,'0')}.png`),pending.subarray(0,end));pending=pending.subarray(end);
   }
  }
  await done;if(pending.length)throw Error('Incomplete PNG frame');return {count,bytes};
 }catch(e){child.kill('SIGTERM');await done.catch(()=>{});await rm(directory,{recursive:true,force:true});throw e;}
}
