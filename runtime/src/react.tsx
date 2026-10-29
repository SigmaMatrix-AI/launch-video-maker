import React,{createContext,useContext,useLayoutEffect} from 'react';
import {selectVideoFrame} from './media.js';
export type FrameContextValue={frame:number;signal:AbortSignal;assets:Record<string,string>;videos:Record<string,{pts:number[];duration:number;files:string[];policy:'hold'|'loop'|'error'}>;tasks:Promise<unknown>[]};
export const FrameContext=createContext<FrameContextValue|null>(null);
export function useFrame(){const c=useContext(FrameContext);if(!c)throw Error('Frame context missing');return c;}
/** Register asynchronous drawing in a layout effect; honor signal before committing. */
export function useFrameTask(task:(signal:AbortSignal)=>Promise<unknown>){const c=useFrame();useLayoutEffect(()=>{c.tasks.push(Promise.resolve().then(()=>task(c.signal)));},[c]);}
export function AssetImage({asset,...props}:{asset:string}&Omit<React.ImgHTMLAttributes<HTMLImageElement>,'src'>){const c=useFrame();if(!c.assets[asset])throw Error(`Unknown asset ${asset}`);return <img {...props} src={c.assets[asset]}/>;}
// Keep speculative decoded images bounded across all mounted video layers.
const prefetched=new Map<string,HTMLImageElement>();
function prefetch(src:string){
 const existing=prefetched.get(src);if(existing){prefetched.delete(src);prefetched.set(src,existing);return;}
 while(prefetched.size>=6){const oldest=prefetched.keys().next().value!;prefetched.get(oldest)!.removeAttribute('src');prefetched.delete(oldest);}
 const image=new Image();prefetched.set(src,image);image.src=src;
 // Speculation never gates readiness; the displayed img is decoded by the frame transaction.
 void image.decode().catch(()=>{if(prefetched.get(src)===image)prefetched.delete(src);});
}
export function VideoFrame({asset,time,...props}:{asset:string;time:number}&Omit<React.ImgHTMLAttributes<HTMLImageElement>,'src'>){const c=useFrame(),v=c.videos[asset];if(!v)throw Error(`Unknown video ${asset}`);const index=selectVideoFrame(v.pts,time,v.duration,v.policy);useLayoutEffect(()=>{if(!c.signal.aborted)for(const src of v.files.slice(index+1,index+3))prefetch(src);},[v,index,c.signal]);return <img {...props} src={v.files[index]}/>;}
