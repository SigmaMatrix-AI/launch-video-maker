import React from 'react';
import {AssetImage} from '@launch-video-maker/runtime/react';
import {ease} from './motion';
const media=['replacement-heroScreen','replacement-dashboardScreen','replacement-proofScreen','replacement-detailScreen'];
export function IsometricWall({time:t}:{time:number}){
 const elapsed=t-20.9;
 return <div data-motion="isometric-page-wall" style={{position:'absolute',inset:0,overflow:'hidden',maskImage:'linear-gradient(90deg,transparent 36%,black 49%)',opacity:ease(t,20.35,21.4)*(1-ease(t,24.65,24.95)),perspective:1600}}>
  <div style={{position:'absolute',left:365,top:-380,width:1060,height:1600,transformOrigin:'50% 50%',transform:'rotateX(28deg) rotateZ(-18deg)',transformStyle:'preserve-3d'}}>
   <div style={{display:'grid',gridTemplateColumns:'repeat(3, 320px)',gap:26,transform:`translateY(${-elapsed*84}px)`}}>
    {Array.from({length:24},(_,i)=><div key={i} style={{width:320,height:180,borderRadius:8,overflow:'hidden',background:'#faf8ff',boxShadow:'0 10px 25px rgba(63,34,90,.14)',transform:`translateY(${i%3===1?78:0}px)`}}><AssetImage asset={media[(i+Math.floor(i/3)*2)%4]} style={{width:'100%',height:'100%',objectFit:'cover'}}/></div>)}
   </div>
  </div>
 </div>;
}
