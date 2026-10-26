import React,{createContext,useContext,useLayoutEffect} from 'react';
import {selectVideoFrame} from './media.js';
export type FrameContextValue={frame:number;signal:AbortSignal;assets:Record<string,string>;videos:Record<string,{pts:number[];duration:number;files:string[];policy:'hold'|'loop'|'error'}>;tasks:Promise<unknown>[]};
export const FrameContext=createContext<FrameContextValue|null>(null);
export function useFrame(){const c=useContext(FrameContext);if(!c)throw Error('Frame context missing');return c;}
/** Register asynchronous drawing in a layout effect; honor signal before committing. */
export function useFrameTask(task:(signal:AbortSignal)=>Promise<unknown>){const c=useFrame();useLayoutEffect(()=>{c.tasks.push(Promise.resolve().then(()=>task(c.signal)));},[c]);}
export function AssetImage({asset,...props}:{asset:string}&Omit<React.ImgHTMLAttributes<HTMLImageElement>,'src'>){const c=useFrame();if(!c.assets[asset])throw Error(`Unknown asset ${asset}`);return <img {...props} src={c.assets[asset]}/>;}
export function VideoFrame({asset,time,...props}:{asset:string;time:number}&Omit<React.ImgHTMLAttributes<HTMLImageElement>,'src'>){const c=useFrame(),v=c.videos[asset];if(!v)throw Error(`Unknown video ${asset}`);return <img {...props} src={v.files[selectVideoFrame(v.pts,time,v.duration,v.policy)]}/>;}
