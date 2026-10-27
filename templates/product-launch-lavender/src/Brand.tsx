import React from 'react';
import {AssetImage} from '@launch-video-maker/runtime/react';
import content from './content.json';
import {star,starTransform,transitionShape} from './star-trajectory';
import {ease,sample} from './motion';
export function Brand({time:t}:{time:number}){
 const shape=transitionShape(t),x=shape.x-shape.size/2,y=shape.y-shape.size/2,w=shape.size,h=shape.size;
 const nameX=sample([[27.55,420],[27.9,399],[28.1,385],[28.3,378],[28.5,374],[31,374]],t)[0];
 return <>
  <svg width={960} height={540} style={{position:'absolute',inset:0}}>
   <g transform={starTransform(t)}>
    <path d={star} fill={content.palette.white} opacity={ease(t,26.35,26.95)*(1-ease(t,27.1,27.6))}/>
    <g fill="none" stroke={content.palette.white} strokeWidth={.065} opacity={content.brandMark?0:ease(t,27.1,27.6)}>
     {Array.from({length:6},(_,i)=><ellipse key={i} cx={0} cy={-.19} rx={.57} ry={.76} transform={`rotate(${i*60})`}/>)}
    </g>
   </g>
  </svg>
  {content.brandMark&&t>=27.1&&<AssetImage asset="brand-mark" style={{position:"absolute",left:x,top:y,width:w,height:h,objectFit:"contain",opacity:ease(t,27.1,27.6)}}/>}
  {t>=27.55&&<div data-motion="brand-wordmark" style={{position:'absolute',left:nameX+76,top:237,width:'max-content',fontFamily:'"Jakarta 800"',fontSize:48.48,lineHeight:1.2,letterSpacing:-1.44,whiteSpace:'nowrap',opacity:ease(t,27.55,27.9),clipPath:`inset(0 ${(1-ease(t,27.55,28.15))*100}% 0 0)`,background:`linear-gradient(90deg,${content.palette.white} ${ease(t,27.8,28.7)*100}%,${content.palette.accent} 100%)`,backgroundClip:'text',color:'transparent'}}>{content.copy.brandName}</div>}
 </>;
}
