import {test} from 'node:test';import assert from 'node:assert/strict';import {mkdtemp,writeFile,rm} from 'node:fs/promises';import {join} from 'node:path';import {startServer} from '../src/server.js';import {render} from '../src/renderer.js';import {run} from '../src/process.js';import {wavPCM} from '../src/audio.js';
test('60 second encoded film preserves start/middle/end impulses and exact visual anchor frames',{skip:process.env.LVM_LONG_TEST!=='1',timeout:300000},async()=>{
 const dir=await mkdtemp(join(process.cwd(),'.lvm-test-'));let server:any;try{
 const pcm=new Float32Array(60*48000*2);for(const time of [.5,30,59])for(let n=0;n<480;n++){const x=.7*Math.sin(2*Math.PI*1000*n/48000)*Math.sin(Math.PI*n/480);pcm[(time*48000+n)*2]=x;pcm[(time*48000+n)*2+1]=x;}
 await writeFile(join(dir,'probe.wav'),wavPCM(pcm));
 await writeFile(join(dir,'film.tsx'),`import React from 'react';export const film={width:64,height:64,fps:{num:30,den:1},durationInFrames:1800,seed:1,scenes:[],assets:[{id:'probe',kind:'audio',src:'probe.wav'}],audio:[{id:'probe',asset:'probe',start:0,end:1800}],markers:{}};export default function Frame({frame}){return <div style={{width:'100%',height:'100%',background:[15,900,1770].includes(frame)?'white':'black'}}/>}`);
 server=await startServer(dir);const dest=join(dir,'probe.mp4');const result=await render(server,dest);assert.equal(result.frames,1800);
 const raw=await run('ffmpeg',['-v','error','-i',dest,'-map','0:a:0','-ar','48000','-ac','1','-f','f32le','pipe:1']);
 for(const time of [.5,30,59]){let peak=0,index=0;for(let n=Math.floor((time-.05)*48000);n<(time+.05)*48000;n++){const value=Math.abs(raw.readFloatLE(n*4));if(value>peak){peak=value;index=n;}}assert.ok(peak>.3);assert.ok(Math.abs(index/48000-time)<1/30);}
 for(const f of [14,15,899,900,1769,1770]){const raw=await run('ffmpeg',['-v','error','-i',dest,'-vf',`select=eq(n\\,${f})`,'-frames:v','1','-pix_fmt','rgb24','-f','rawvideo','pipe:1']);assert.ok([15,900,1770].includes(f)?raw[0]>240:raw[0]<10,`wrong visual anchor ${f}`);}
 }finally{await server?.close();await rm(dir,{recursive:true,force:true});}
});
