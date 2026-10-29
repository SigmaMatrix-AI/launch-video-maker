import React from 'react';
import {ease} from './motion';
const mix=(a:number[],b:number[],t:number)=>`rgb(${a.map((v,i)=>v+(b[i]-v)*t).join(',')})`;
export function Background({time:t}:{time:number}){
 const settle=ease(t,25.7,27.1),x=45+12*Math.sin(t*.23),y=43+13*Math.cos(t*.18);
 const base=mix([239,230,248],[127,99,160],settle),light=mix([255,250,255],[202,179,224],settle),violet=mix([207,185,231],[105,74,141],settle);
 return <div style={{position:'absolute',inset:0,background:`radial-gradient(ellipse at ${x}% ${y}%,${light} 0%,transparent 66%),radial-gradient(ellipse at 95% 85%,${violet} 0%,transparent 75%),${base}`}}/>;
}
