import React from 'react';
import {defineFilm,secondsAt,type Asset} from '@launch-video-maker/runtime';
import {AssetImage,VideoFrame} from '@launch-video-maker/runtime/react';
import tracks from './src/tracks.json';
import content from './src/content.json';
import {Background} from './src/Background';
import {Headlines} from './src/Headlines';
import {Brand} from './src/Brand';
import {star,starTransform} from './src/star-trajectory';
import {homography,sample} from './src/motion';
type Replacement={src:string;kind:'image'|'video';sourceStart?:number;speed?:number};
const overrides=content.screens as Record<string,Replacement>;
const media=tracks.map(tr=>({id:tr.id,key:tr.key,asset:overrides[tr.key]?`replacement-${tr.key}`:tr.id,kind:overrides[tr.key]?.kind??'video',src:overrides[tr.key]?.src??`assets/screens/${tr.id}.mp4`}));
const screenAssets=[...new Map(media.map(m=>[m.asset,{id:m.asset,kind:m.kind,src:m.src,outOfRange:'hold'} as Asset])).values()];
export const film=defineFilm({width:960,height:540,fps:{num:30,den:1},durationInFrames:930,seed:1,
 scenes:[{id:'hero-fan',start:0,end:168},{id:'capability',start:168,end:225},{id:'perspective-drift',start:225,end:345},{id:'value-proof',start:345,end:435},{id:'pricing',start:435,end:516},{id:'orbit',start:516,end:579},{id:'gallery',start:579,end:627},{id:'workflow',start:627,end:741},{id:'detail',start:741,end:777},{id:'brand-resolve',start:777,end:930}],
 assets:[...screenAssets,{id:'font-600',kind:'font',family:'Jakarta 600',src:'assets/fonts/PlusJakartaSans-600.woff2'},{id:'font-800',kind:'font',family:'Jakarta 800',src:'assets/fonts/PlusJakartaSans-800.woff2'},{id:'music',kind:'audio',src:'assets/audio/reference.wav'},...(content.brandMark?[{id:'brand-mark',kind:'image',src:content.brandMark} as Asset]:[])],
 audio:[{id:'source-score',asset:'music',start:0,end:930,sourceStart:0,sourceEnd:31,gain:.75}],
 markers:{heroArrives:45,fanHold:105,perspectiveArrives:240,perspectiveRest:285,valueArrives:405,orbitRest:555,galleryRest:600,workflowRest:690,detailRest:765,starStarts:777,brandHold:870}
});
function Screens({time:t}:{time:number}){
 return <>{tracks.filter(tr=>t>=tr.poses[0][0]&&t<=tr.poses.at(-1)![0]).sort((a,b)=>a.z-b.z).map(tr=>{
  const m=media.find(x=>x.id===tr.id)!,override=overrides[tr.key];
  const sourceTime=override?(override.sourceStart??0)+Math.max(0,t-tr.poses[0][0])*(override.speed??1):t-tr.sourceStartFrame/30+1/60;
  return <div key={tr.id} data-card={tr.id} style={{position:'absolute',left:0,top:0,width:960,height:540,transformOrigin:'0 0',transform:homography(sample(tr.poses,t)),borderRadius:'3.2%',overflow:'hidden'}}>
   {m.kind==='image'?<AssetImage asset={m.asset} style={{width:'100%',height:'100%',objectFit:'fill'}}/>:<VideoFrame asset={m.asset} time={Math.max(0,sourceTime)} style={{width:'100%',height:'100%',objectFit:'fill'}}/>}
  </div>;
 })}</>;
}
export default function Frame({frame}:{frame:number}){
 const t=secondsAt(film,frame);
 return <div style={{position:'absolute',inset:0,overflow:'hidden',background:content.palette.paper}}>
  <Background time={t}/>
  {t<27.1&&<>
   {t>=25.8&&<svg width={0} height={0}><defs><clipPath id="transition-aperture" clipPathUnits="userSpaceOnUse"><path d={star} transform={starTransform(t)}/></clipPath></defs></svg>}
   <div style={{position:'absolute',inset:0,clipPath:t>=25.8?'url(#transition-aperture)':undefined}}>
    {t>=25.8&&<Background time={25.8}/>}
    <Screens time={Math.min(t,26.299)}/><Headlines time={Math.min(t,26.299)}/>
   </div>
  </>}
  {t>=25.8&&<Brand time={t}/>}
 </div>;
}
