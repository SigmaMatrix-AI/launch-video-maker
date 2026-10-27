import React from 'react';
import content from './content.json';
import {sample,ramp} from './motion';
const head=[[.35,295,230,370,54,0],[1.05,295,230,370,54,0],[1.3,290,230,380,60,1],[2.3,285,230,390,60,1],[2.5,252,205,456,69,1],[2.75,195,132,570,90,1],[3,172,116,615,100,1],[3.5,166,110,630,102,1],[4.5,155,109,650,106,1],[5,148,109,664,110,1],[5.25,120,124,720,115,1],[5.5,60,155,840,124,1],[5.65,0,210,960,150,0]];
export function Headlines({time:t}:{time:number}){
 const {copy,palette}=content;const hp=sample(head,t);
 const valueY=sample([[12.624,44],[13,47],[13.2,47],[13.5,54],[14,82],[14.2,109],[14.5176,210]],t)[0];
 const title=(text:React.ReactNode,style:React.CSSProperties)=><div style={{position:'absolute',fontFamily:'"Jakarta 800"',fontWeight:400,fontSynthesis:'none',color:palette.ink,whiteSpace:'pre-line',...style}}>{text}</div>;
 return <>
  {t<5.65&&<div data-motion="promo-pill" style={{position:'absolute',left:hp[0],top:hp[1],width:hp[2],height:hp[3],borderRadius:100,background:palette.pill,opacity:ramp(t,.315,1.315),boxShadow:'0 3px 12px rgba(48,89,189,.08)',display:'flex',alignItems:'center',justifyContent:'center'}}>
   {title(copy.promoTitle,{position:'relative',fontSize:hp[2]*.071,letterSpacing:-.624,opacity:hp[4],whiteSpace:'nowrap'})}
  </div>}
  {t>12.624&&t<14.5176&&<div data-motion="value-title" style={{opacity:Math.min(ramp(t,12.624,13.2815),1-ramp(t,14.202,14.5176))}}>
   {title(copy.valueTitle,{left:96,top:valueY,width:768,textAlign:'center',fontSize:43.2,lineHeight:1.1,letterSpacing:-1.44})}
   {title(copy.valueSubtitle,{left:172.8,top:valueY+50.76,width:614.4,textAlign:'center',fontSize:13.728,fontFamily:'"Jakarta 600"',lineHeight:1.2})}
  </div>}
  {t>17.1476&&t<19.3305&&title(copy.breadthTitle,{left:192,top:243,width:576,textAlign:'center',fontSize:42.24,lineHeight:1.1,letterSpacing:-1.152,opacity:Math.min(ramp(t,17.1476,17.621),1-ramp(t,19.0675,19.3305))})}
  {t>21.0926&&t<24.8535&&title([...copy.workflowTitle].map((char,i)=><span key={i} style={{opacity:Math.min(ramp(t,21.15+i*.022,21.31+i*.022),1-ramp(t,24.05+i*.022,24.23+i*.022))}}>{char}</span>),{left:49.92,top:230.36,width:316.8,fontSize:33.6,lineHeight:1.12,letterSpacing:-.672})}
  {t<26.3&&<div style={{position:'absolute',left:144,bottom:24.3,width:672,color:palette.ink,opacity:.48,textAlign:'center',fontFamily:'"Jakarta 600"',fontSize:6.336,letterSpacing:2.88}}>{copy.rightsLabel}{copy.rightsLabel&&copy.creatorCredit?' || ':''}{copy.creatorCredit}</div>}
 </>;
}
