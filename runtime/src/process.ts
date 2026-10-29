import {spawn} from 'node:child_process';
export function run(command:string,args:string[],options:{cwd?:string;signal?:AbortSignal;maxBytes?:number}={}):Promise<Buffer>{
 return new Promise((resolve,reject)=>{
  const child=spawn(command,args,{cwd:options.cwd,signal:options.signal,stdio:['ignore','pipe','pipe']});const chunks:Buffer[]=[];let size=0,err='';let failure:Error|undefined;
  child.stdout.on('data',(data:Buffer)=>{size+=data.length;if(size>(options.maxBytes??512*1024*1024)){failure=Error(`${command}: output exceeds memory budget`);child.kill();}else chunks.push(data);});
  child.stderr.on('data',data=>{err=(err+data.toString()).slice(-12000);});
  child.on('error',reject);child.on('close',code=>code===0&&!failure?resolve(Buffer.concat(chunks)):reject(failure??Error(`${command} failed (${code}): ${err}`)));
 });
}
