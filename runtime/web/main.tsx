import React from 'react';
import {createRoot} from 'react-dom/client';
import {flushSync} from 'react-dom';
import Frame,{film} from '@film';
import {assertFrame,secondsAt,scenesAt} from '@lvm-core';
import {FrameContext} from '@lvm-react';
const manifest=await (await fetch('/__lvm/manifest')).json();
const stage=document.querySelector('#stage');stage.style.width=film.width+'px';stage.style.height=film.height+'px';
const captureMode=new URLSearchParams(location.search).has('capture');
if(captureMode){document.querySelector('#controls').remove();document.querySelector('#error').style.display='none';}else{const scale=Math.min(1,innerWidth/film.width,(innerHeight-100)/film.height);stage.style.zoom=String(scale);}
let renderError;class Boundary extends React.Component{state={error:null};static getDerivedStateFromError(error){renderError=error;return {error};}render(){return this.state.error?null:this.props.children;}}
const root=createRoot(stage);let serial=0,controller,locked=false,frame=0,playing=false,source,ctx,buffer,epoch=0,offset=0;
const seek=document.querySelector('#seek'),label=document.querySelector('#time'),play=document.querySelector('#play'),error=document.querySelector('#error');
if(seek)seek.max=String(film.durationInFrames-1);
const stopAudio=()=>{if(source){try{source.stop();}catch{}source.disconnect();source=null;}};
function pause(){playing=false;serial++;controller?.abort();stopAudio();if(play)play.textContent='Play';}
function fail(e){pause();if(error)error.textContent=String(e);}
const timeout=(promise,label)=>{let timer;return Promise.race([promise,new Promise((_,reject)=>{timer=setTimeout(()=>reject(Error(`Timed out: ${label}`)),15000);})]).finally(()=>clearTimeout(timer));};
for(const a of film.assets.filter(a=>a.kind==='font')){if(!a.family)throw Error(`Font family missing: ${a.id}`);const f=new FontFace(a.family,`url(${manifest.assets[a.id]})`);document.fonts.add(await f.load());}
async function setFrame(target,version=manifest.version,requestId=++serial){
 if(locked)throw Error('Capture locked');assertFrame(film,target);if(version!==manifest.version)throw Error('Content version mismatch');
 controller?.abort();controller=new AbortController();const signal=controller.signal;const ticket=++serial;const tasks=[];
 renderError=null;
 flushSync(()=>root.render(<Boundary key={ticket}><FrameContext.Provider value={{frame:target,signal,assets:manifest.assets,videos:manifest.videos,tasks}}><Frame frame={target} scenes={scenesAt(film,target)} config={film}/></FrameContext.Provider></Boundary>));
 if(renderError)throw renderError;
 await timeout(Promise.all(tasks),'frame tasks');await timeout(document.fonts.ready,'fonts');
 await timeout(Promise.all([...stage.querySelectorAll('img')].map(img=>img.decode().catch(()=>{throw Error(`Image failed: ${img.src}`);}))), 'images');
 await new Promise(resolve=>requestAnimationFrame(resolve));
 if(ticket!==serial||signal.aborted)throw Error('Superseded frame request');
 if(stage.querySelector('video'))throw Error('Use VideoFrame for deterministic video');
 if(stage.getAnimations({subtree:true}).some(a=>a.playState==='running'))throw Error('Autonomous animation; derive visuals from frame');
 frame=target;if(seek)seek.value=String(target);if(label)label.textContent=`${target} / ${film.durationInFrames-1} · ${secondsAt(film,target).toFixed(3)}s`;
 return {frame:target,version:manifest.version,requestId};
}
async function checkVersion(){const r=await fetch('/__lvm/version');const data=await r.json();if(data.version!==manifest.version)throw Error('Content version changed; restart preview to prepare new media');}
async function acquire(target,version,requestId){await checkVersion();const ready=await setFrame(target,version,requestId);locked=true;return ready;}
window.__LVM__={film,version:manifest.version,setFrame,acquire,release(){locked=false;},state:()=>({frame,playing,locked}),pause};
function audioStart(position){stopAudio();source=ctx.createBufferSource();source.buffer=buffer;source.connect(ctx.destination);offset=position;epoch=ctx.currentTime;source.start(0,position);}
function clockTime(){const ts=ctx.getOutputTimestamp?.();if(ts?.contextTime>0)return ts.contextTime+Math.max(0,performance.now()-ts.performanceTime)/1000;return ctx.currentTime;}
async function tick(){if(!playing)return;try{
 const target=Math.min(film.durationInFrames-1,Math.max(frame,Math.floor((offset+clockTime()-epoch)*film.fps.num/film.fps.den)));
 if(target!==frame){
  let buffering=false;const timer=setTimeout(()=>{buffering=true;stopAudio();},1000*film.fps.den/film.fps.num);
  try{await setFrame(target);}finally{clearTimeout(timer);}
  if(!playing)return;if(buffering)audioStart(secondsAt(film,target));
 }
 if(frame===film.durationInFrames-1&&offset+clockTime()-epoch>=secondsAt(film,film.durationInFrames)){pause();return;}
 requestAnimationFrame(tick);
 }catch(e){fail(e);}}
async function start(){pause();if(error)error.textContent='';await checkVersion();ctx??=new AudioContext({sampleRate:48000});await ctx.resume();buffer??=await ctx.decodeAudioData(await (await fetch('/__lvm/mix')).arrayBuffer());if(frame===film.durationInFrames-1)await setFrame(0);playing=true;play.textContent='Pause';audioStart(secondsAt(film,frame));requestAnimationFrame(tick);}
if(!captureMode){play.onclick=()=>{if(playing)pause();else start().catch(fail);};seek.oninput=()=>{pause();setFrame(Number(seek.value)).catch(e=>{if(!String(e).includes('Superseded'))fail(e);});};document.querySelector('#prev').onclick=()=>{pause();setFrame(Math.max(0,frame-1)).catch(fail);};document.querySelector('#next').onclick=()=>{pause();setFrame(Math.min(film.durationInFrames-1,frame+1)).catch(fail);};document.addEventListener('visibilitychange',()=>{if(document.hidden)pause();});setInterval(()=>checkVersion().catch(fail),1000);}
try{await setFrame(0);window.__LVM__.ready=true;}catch(e){window.__LVM__.error=String(e);fail(e);}
