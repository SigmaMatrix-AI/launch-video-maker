import React from 'react';
import {AssetImage} from '@launch-video-maker/runtime/react';
import content from './content.json';
import {star,starTransform,transitionShape} from './star-trajectory';
import {ease,sample} from './motion';
export function Brand({time:t}:{time:number}){
 const shape=transitionShape(t),x=shape.x-shape.size/2,y=shape.y-shape.size/2,w=shape.size,h=shape.size;
 const nameX=sample([[27.55,420],[27.9,399],[28.1,385],[28.3,378],[28.5,374],[31,374]],t)[0];
 return <>
  {t<27.1&&<svg width={960} height={540} style={{position:'absolute',inset:0}}><defs><mask id="star-white"><rect width={960} height={540} fill="black"/><path d={star} transform={starTransform(t)} fill="white"/></mask></defs><rect width={960} height={540} fill={content.palette.white} mask="url(#star-white)" opacity={ease(t,26.35,26.95)}/></svg>}
  {t>=27.1&&(content.brandMark?<AssetImage asset="brand-mark" style={{position:'absolute',left:x,top:y,width:w,height:h,objectFit:'contain',transform:`rotate(${90*(1-ease(t,27.1,27.9))}deg)`}}/>:<svg width={960} height={540} style={{position:'absolute',inset:0}}><path d={star} transform={starTransform(t)} fill={content.palette.white}/></svg>)}
  {t>=27.55&&<div data-motion="brand-wordmark" style={{position:'absolute',left:nameX,top:237,width:'max-content',fontFamily:'"Jakarta 800"',fontSize:48.48,lineHeight:1.2,letterSpacing:-1.44,whiteSpace:'nowrap',opacity:ease(t,27.55,27.9),clipPath:`inset(0 ${(1-ease(t,27.55,28.15))*100}% 0 0)`,background:`linear-gradient(90deg,${content.palette.white} ${ease(t,27.8,28.7)*100}%,${content.palette.accent} 100%)`,backgroundClip:'text',color:'transparent'}}>{content.copy.brandName}</div>}
 </>;
}
