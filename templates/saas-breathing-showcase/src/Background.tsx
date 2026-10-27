import React from 'react';
import fields from './background.json';
export function Background({time}:{time:number}){
 const rows=fields as [number,number[][]][];
 let j=rows.findIndex(r=>r[0]>=time);if(j<0)j=rows.length-1;
 const b=rows[j],a=rows[Math.max(0,j-1)],k=a===b?0:(time-a[0])/(b[0]-a[0]);
 // Interpolate measured color fields continuously; never step at the original
 // 10Hz background-analysis frequency. These contain no typography or screens.
 return <svg viewBox="0 0 24 14" preserveAspectRatio="none" style={{position:'absolute',inset:0,width:960,height:540}}>
  <defs><filter id="background-soft" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation=".9"/></filter></defs>
  <g filter="url(#background-soft)">{b[1].map((c,i)=><rect key={i} x={i%24===0?-4:i%24-.5} y={Math.floor(i/24)===0?-4:Math.floor(i/24)-.5} width={i%24===0||i%24===23?6:2} height={Math.floor(i/24)===0||Math.floor(i/24)===13?6:2} fill={`rgb(${c.map((v,n)=>a[1][i][n]+(v-a[1][i][n])*k).join(',')})`}/>)}</g>
 </svg>;
}
