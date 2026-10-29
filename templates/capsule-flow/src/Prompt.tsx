import {createPlanePath} from './CreatePlane';
import {brandGreen,leafGreen,brandInk,brandGradient,brandGlow} from './palette';
import React from 'react';
import {progress,track} from './motion';
export function PlayRibbon({frame:f}:{frame:number}){
 if(f<171||f>=201)return null;
 const ribbon=[
  {x:[[171,730],[174,790],[177,478],[180,408],[183,65],[187,-90],[190,-650],[194,-1900]],w:[[171,50],[174,180],[177,240],[180,240],[183,250],[187,150],[190,200]]},
  {x:[[174,970],[177,718],[180,648],[183,315],[187,60],[190,-450],[194,-1750],[198,-2100]],w:[[174,0],[177,300],[180,380],[183,400],[187,600],[190,1170]]},
  {x:[[177,1018],[180,1028],[183,715],[187,660],[190,720],[194,-40],[198,-1200]],w:[[177,0],[180,340],[183,580],[187,800],[190,1160],[194,900],[198,850]]},
  {x:[[180,1368],[183,1295],[187,1460],[190,1880],[194,860],[198,-350],[201,-700]],w:[[180,0],[183,430],[187,390],[190,570],[194,800],[198,550],[201,600]]}
 ];
 return <svg viewBox="0 0 1920 1080" width="1920" height="1080" style={{position:'absolute',inset:0,overflow:'visible'}}><defs>{ribbon.map((r,i)=><linearGradient key={i} id={`plane-${i}`}><stop stopColor={brandGreen}/><stop offset=".5" stopColor={leafGreen}/><stop offset="1" stopColor={brandGreen}/></linearGradient>)}</defs>{ribbon.map((r,i)=>{const width=track(f,r.w as [number,number][]),height=width*.96,x=track(f,r.x as [number,number][]);return <path key={i} d={createPlanePath} transform={`translate(${x},${540-height/2}) scale(${width/100},${height/100})`} fill={`url(#plane-${i})`} opacity={f<r.x[0][0]?0:1}/>;})}</svg>;
}
// Character timings transcribed from the supplied reference.
const phrase='Help me create a product launch video';
const typing=Array.from({length:phrase.length},(_,i)=>[194+Math.round(i/(phrase.length-1)*70),phrase.slice(0,i+1)] as const);
export function Prompt({frame:f,textOpacity=1}:{frame:number;textOpacity?:number}){
 if(f<192)return null;
 const text=typing.filter(([at])=>f>=at).at(-1)?.[1]??'',isSmall=f>=221,fontSize=isSmall?214:408;
 const left=track(f,[[192,2200],[194,886],[198,188],[202,-50],[206,-240],[218,-260],[220,-260],[221,320],[222,320],[230,20],[234,-295],[238,-655],[242,-1105],[246,-1420],[250,-1780],[254,-2105],[258,-2400],[262,-2560],[264,-2590],[281,-2590]]),boxHeight=isSmall?710:1920;
 const prefix='Help me create a ',normal=text.startsWith(prefix)?prefix:text,colored=text.startsWith(prefix)?text.slice(prefix.length):'';
 const caretRight=track(f,[[194,1843],[198,1437],[202,1356],[206,1647],[210,1822],[214,1775],[218,1728],[220,1705],[221,1631],[222,1631],[226,1636],[230,1633],[234,1651],[238,1495],[240,1468],[242,1517],[246,1323],[250,1356],[254,1446],[258,1661],[262,1844],[264,1880],[281,1880]]);
 return <>
  <div style={{position:'absolute',left,top:540-boxHeight/2,width:5600,height:boxHeight,borderRadius:boxHeight/2,background:'#edf3f5',opacity:track(f,[[192,0],[194,1]]),overflow:'hidden'}}>
   <div style={{position:'absolute',inset:0,opacity:progress(f,234,245),background:brandGradient(112,'18')}}/>
  </div>
  <div style={{position:'absolute',left:caretRight,top:540,transform:'translate(-100%,-55%)',fontSize,lineHeight:1.2,letterSpacing:isSmall?-9:-10,whiteSpace:'pre',width:'max-content',color:'#727a7a',display:'flex',alignItems:'center',opacity:f<194?0:textOpacity}}>
   <span>{normal}</span><span style={{background:brandGradient(100+f),backgroundClip:'text',WebkitBackgroundClip:'text',color:'transparent'}}>{colored}</span>
   {f<264&&<span style={{width:isSmall?21:35,height:fontSize*1.31,display:'inline-block',background:colored?leafGreen:'#737b7b',marginLeft:isSmall?8:14,transform:'translateY(4%)'}}/>}
  </div>
 </>;
}
