import React from 'react';
import {createRoot} from 'react-dom/client';
import {flushSync} from 'react-dom';
import Frame,{film} from '@film';
import {assertFrame,secondsAt,scenesAt} from '@lvm-core';
import {FrameContext} from '@lvm-react';

window.__LVM__={ready:false};
const manifest=await (await fetch('/__lvm/manifest')).json();
const stage=document.querySelector('#stage');
stage.style.width=film.width+'px';stage.style.height=film.height+'px';
const captureMode=new URLSearchParams(location.search).has('capture');
if(captureMode){document.querySelector('#controls').remove();document.querySelector('#error').style.display='none';}
else{const scale=Math.min(1,innerWidth/film.width,(innerHeight-100)/film.height);stage.style.zoom=String(scale);}
class Boundary extends React.Component{
 state={error:null};
 static getDerivedStateFromError(error){return {error};}
 componentDidCatch(error){this.props.onError(error);}
 render(){return this.state.error?null:this.props.children;}
}
let serial=0,controller,locked=false,frame=0,playing=false,source,ctx,buffer,bufferPromise,epoch=0,offset=0;
let playbackSession=0,currentView;
const seek=document.querySelector('#seek'),label=document.querySelector('#time'),play=document.querySelector('#play'),error=document.querySelector('#error');
if(seek)seek.max=String(film.durationInFrames-1);
const stopAudio=()=>{if(source){try{source.stop();}catch{}source.disconnect();source=null;}};
function pause(){playbackSession++;playing=false;serial++;controller?.abort();stopAudio();if(play)play.textContent='Play';}
function fail(e){pause();if(error)error.textContent=String(e);}
const timeout=(promise,label)=>{let timer;return Promise.race([promise,new Promise((_,reject)=>{timer=setTimeout(()=>reject(Error(`Timed out: ${label}`)),15000);})]).finally(()=>clearTimeout(timer));};

async function setFrame(target,version=manifest.version,requestId=++serial){
 if(locked)throw Error('Capture locked');
 assertFrame(film,target);if(version!==manifest.version)throw Error('Content version mismatch');
 controller?.abort();controller=new AbortController();const signal=controller.signal,ticket=++serial,tasks=[];
 // Keep the previous committed view visible while this frame prepares offscreen.
 const layer=document.createElement('div');Object.assign(layer.style,{position:'absolute',inset:'0',visibility:'hidden'});stage.append(layer);
 const root=createRoot(layer);let renderError,committed=false;
 try{
  flushSync(()=>root.render(<Boundary onError={e=>{renderError=e;}}><FrameContext.Provider value={{frame:target,signal,assets:manifest.assets,videos:manifest.videos,tasks}}><Frame frame={target} scenes={scenesAt(film,target)} config={film}/></FrameContext.Provider></Boundary>));
  if(renderError)throw renderError;
  await timeout(Promise.all(tasks),'frame tasks');await timeout(document.fonts.ready,'fonts');
  const images=[...layer.querySelectorAll('img')];
  for(const img of images){const url=new URL(img.src,location.href);if(url.origin!==location.origin||!/^\/__lvm\/(asset|video)\//.test(url.pathname))throw Error(`Declare local image assets: ${img.src}`);}
  await timeout(Promise.all(images.map(img=>img.decode().catch(()=>{throw Error(`Image failed: ${img.src}`);}))), 'images');
  await new Promise(resolve=>requestAnimationFrame(resolve));
  if(ticket!==serial||signal.aborted)throw Error('Superseded frame request');
  if(layer.querySelector('video'))throw Error('Use VideoFrame for deterministic video');
  if(layer.getAnimations({subtree:true}).some(a=>a.playState==='running'))throw Error('Autonomous animation; derive visuals from frame');
  currentView?.root.unmount();currentView?.layer.remove();layer.style.visibility='visible';currentView={root,layer};committed=true;
  frame=target;if(seek)seek.value=String(target);if(label)label.textContent=`${target} / ${film.durationInFrames-1} · ${secondsAt(film,target).toFixed(3)}s`;
  return {frame:target,version:manifest.version,requestId};
 }finally{if(!committed){root.unmount();layer.remove();}}
}
async function checkVersion(){const r=await fetch('/__lvm/version');const data=await r.json();if(data.version!==manifest.version)throw Error('Content version changed; restart preview to prepare new media');}
async function acquire(target,version,requestId){await checkVersion();const ready=await setFrame(target,version,requestId);locked=true;return ready;}
Object.assign(window.__LVM__,{film,version:manifest.version,setFrame,acquire,release(){locked=false;},state:()=>({frame,playing,locked}),pause});
function audioStart(position){stopAudio();source=ctx.createBufferSource();source.buffer=buffer;source.connect(ctx.destination);offset=position;epoch=ctx.currentTime;source.start(0,position);}
function clockTime(){const ts=ctx.getOutputTimestamp?.();if(ts?.contextTime>0)return ts.contextTime+Math.max(0,performance.now()-ts.performanceTime)/1000;return ctx.currentTime;}
async function tick(session){
 if(!playing||session!==playbackSession)return;
 try{
  const target=Math.min(film.durationInFrames-1,Math.max(frame,Math.floor((offset+clockTime()-epoch)*film.fps.num/film.fps.den)));
  if(target!==frame){
   let buffering=false;
   const timer=setTimeout(()=>{if(session===playbackSession){buffering=true;stopAudio();}},1000*film.fps.den/film.fps.num);
   try{await setFrame(target);}finally{clearTimeout(timer);}
   if(!playing||session!==playbackSession)return;
   if(buffering)audioStart(secondsAt(film,target));
  }
  if(frame===film.durationInFrames-1&&offset+clockTime()-epoch>=secondsAt(film,film.durationInFrames)){pause();return;}
  requestAnimationFrame(()=>tick(session));
 }catch(e){if(session===playbackSession)fail(e);}
}
async function start(){
 pause();const session=playbackSession;if(error)error.textContent='';
 await checkVersion();if(session!==playbackSession)return;
 ctx??=new AudioContext({sampleRate:48000});await ctx.resume();if(session!==playbackSession)return;
 bufferPromise??=fetch('/__lvm/mix').then(r=>{if(!r.ok)throw Error('Mix unavailable');return r.arrayBuffer();}).then(b=>ctx.decodeAudioData(b)).catch(e=>{bufferPromise=undefined;throw e;});
 buffer=await bufferPromise;if(session!==playbackSession)return;
 if(frame===film.durationInFrames-1)await setFrame(0);if(session!==playbackSession)return;
 playing=true;play.textContent='Pause';audioStart(secondsAt(film,frame));requestAnimationFrame(()=>tick(session));
}
function userSeek(target){pause();const session=playbackSession;setFrame(target).catch(e=>{if(session===playbackSession&&!String(e).includes('Superseded'))fail(e);});}
if(!captureMode){
 play.onclick=()=>{if(playing)pause();else{const expected=playbackSession+1;start().catch(e=>{if(playbackSession===expected)fail(e);});}};
 seek.oninput=()=>userSeek(Number(seek.value));
 document.querySelector('#prev').onclick=()=>userSeek(Math.max(0,frame-1));
 document.querySelector('#next').onclick=()=>userSeek(Math.min(film.durationInFrames-1,frame+1));
 document.addEventListener('visibilitychange',()=>{if(document.hidden)pause();});
 setInterval(()=>checkVersion().catch(fail),1000);
}
try{
 for(const a of film.assets.filter(a=>a.kind==='font')){if(!a.family)throw Error(`Font family missing: ${a.id}`);const font=new FontFace(a.family,`url(${manifest.assets[a.id]})`);document.fonts.add(await timeout(font.load(),`font ${a.id}`));}
 await setFrame(0);window.__LVM__.ready=true;
}catch(e){window.__LVM__.error=String(e);fail(e);}
