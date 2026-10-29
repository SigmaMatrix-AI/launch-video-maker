import React from 'react';
import {AssetImage} from '@launch-video-maker/runtime/react';
import {ease} from './motion';
import {analyticsPose,dashboardPose,galleryPose,orbitPose,stackPose,type Pose} from './ShowcaseMotion';
function Card({asset,pose,opacity=1,id}:{asset:string;pose:Pose;opacity?:number;id:string}){
 if(opacity<=0)return null;
 return <div data-continuous-card={id} style={{position:'absolute',left:pose.x,top:pose.y,width:pose.w,height:pose.w*9/16,opacity,transform:`translate(-50%,-50%) perspective(1400px) rotateX(${pose.rx}deg) rotateZ(${pose.rz}deg)`,borderRadius:12,overflow:'hidden',background:'#faf8ff',boxShadow:'0 16px 34px rgba(66,35,91,.09)'}}><AssetImage asset={asset} style={{width:'100%',height:'100%',objectFit:'cover'}}/></div>;
}
const orbitAssets=['replacement-dashboardScreen','replacement-heroScreen','replacement-proofScreen','replacement-detailScreen','replacement-overviewScreen'];
export function ContinuousShowcase({time:t}:{time:number}){
 return <>
  {[1,0].map(i=><Card key={`stack-${i}`} id={`stack-${i}`} asset={i===0?'replacement-heroScreen':'replacement-dashboardScreen'} pose={stackPose(t,i)} opacity={ease(t,7.2+i*.12,7.95+i*.12)*(1-ease(t,10.8,11.65))}/>)}
  <Card id="analytics-continuous" asset="replacement-proofScreen" pose={analyticsPose(t)} opacity={ease(t,5.55,5.85)*(1-ease(t,14,14.8))}/>
  <Card id="dashboard-orbit-seed" asset={orbitAssets[0]} pose={dashboardPose(t)} opacity={ease(t,14,14.8)*(1-ease(t,18.9,19.55))}/>
  {[2,3,4].map(i=><Card key={i} id={`orbit-${i}`} asset={orbitAssets[i]} pose={orbitPose(t,i)} opacity={ease(t,17.25+(i-1)*.1,17.65+(i-1)*.1)*(1-ease(t,18.9,19.55))}/>)}
  <Card id="orbit-hero-to-wall" asset={orbitAssets[1]} pose={t<18.9?orbitPose(t,1):galleryPose(t)} opacity={ease(t,17.25,17.65)*(1-ease(t,20.35,21.4))}/>
 </>;
}
