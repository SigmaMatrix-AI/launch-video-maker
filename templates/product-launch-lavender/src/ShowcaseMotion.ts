import {ease} from './motion';
export type Pose={x:number;y:number;w:number;rx:number;rz:number};
const mix=(a:Pose,b:Pose,k:number):Pose=>Object.fromEntries(Object.keys(a).map(key=>[key,a[key as keyof Pose]+(b[key as keyof Pose]-a[key as keyof Pose])*k])) as Pose;
const center:Pose={x:480,y:270,w:640,rx:0,rz:0};
const stacked:Pose={x:580,y:160,w:590,rx:42,rz:0};
const proof:Pose={x:480,y:330,w:680,rx:0,rz:0};
const dashboard:Pose={x:480,y:270,w:800,rx:0,rz:0};
export function analyticsPose(t:number):Pose{
 if(t<6.15)return mix({...center,y:-230,w:540},center,ease(t,5.55,6.15));
 if(t<7.1)return center;
 if(t<8.15)return mix(center,stacked,ease(t,7.1,8.15));
 if(t<10.8)return {...stacked,x:580+12*ease(t,8.15,10.8)};
 if(t<11.85)return mix({...stacked,x:592},proof,ease(t,10.8,11.85));
 return mix(proof,dashboard,ease(t,14,14.8));
}
export function orbitPose(t:number,index:number):Pose{
 // Wider orbit leaves more breathing room around the central slogan.
 const angle=index*Math.PI*2/5+1.15*ease(t,17.85,18.9);
 return {x:480+380*Math.cos(angle),y:270+215*Math.sin(angle),w:250,rx:0,rz:0};
}
export function dashboardPose(t:number):Pose{
 if(t<14.8)return analyticsPose(t);
 if(t<16.05)return dashboard;
 if(t<17.25)return mix(dashboard,orbitPose(17.25,0),ease(t,16.05,17.25));
 return orbitPose(t,0);
}
export function galleryPose(t:number):Pose{
 const selected=orbitPose(18.9,1);
 if(t<19.7)return mix(selected,center,ease(t,18.9,19.7));
 return mix(center,{x:610,y:250,w:360,rx:28,rz:-18},ease(t,20.35,21.4));
}
export function stackPose(t:number,index:number):Pose{
 const target:Pose={x:index===0?470:360,y:index===0?290:410,w:600,rx:42,rz:0};
 const entering=mix({...center,w:610},target,ease(t,7.2+index*.12,8.25+index*.12));
 return mix(entering,{...proof,w:590},ease(t,10.8,11.8));
}
