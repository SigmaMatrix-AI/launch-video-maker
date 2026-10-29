import React from 'react';
import {defineFilm,ease,interpolate} from '@launch-video-maker/runtime';
export const film=defineFilm({width:1920,height:1080,fps:{num:24,den:1},durationInFrames:288,seed:7,scenes:[{id:'address',start:0,end:96},{id:'seek',start:96,end:192},{id:'resolve',start:192,end:288}],assets:[{id:'inter',kind:'font',family:'Inter',src:'brand-kit/Inter.ttf'},{id:'mono',kind:'font',family:'Mono',src:'brand-kit/JetBrainsMono-var.ttf'},{id:'score',kind:'audio',src:'assets/score.wav'}],audio:[{id:'score',asset:'score',start:0,end:288,fadeOut:24}],markers:{snap:96,return:192}});
const accent='#b7f34a';
export default function Frame({frame:f}:{frame:number}){
 const reveal=ease(f/30),phase=ease((f-84)/12)+ease((f-180)/12),finish=ease((f-200)/24);
 return <div style={{position:'relative',width:'100%',height:'100%',overflow:'hidden',background:'radial-gradient(ellipse at 50% 0%,#202737 0%,#090c12 65%)',fontFamily:'Inter',color:'#f4f7fc'}}>
  <div style={{position:'absolute',inset:0,backgroundImage:'linear-gradient(#ffffff06 1px,transparent 1px),linear-gradient(90deg,#ffffff06 1px,transparent 1px)',backgroundSize:'48px 48px',maskImage:'radial-gradient(ellipse,black,transparent 75%)'}}/>
  <div style={{position:'absolute',top:78,left:120,fontFamily:'Mono',fontSize:22,letterSpacing:4,color:'#8893a7'}}>LAUNCH VIDEO MAKER <span style={{marginLeft:90,color:'#536074'}}>FRAME STUDY / 01</span></div>
  <div style={{position:'absolute',left:120,top:210,fontSize:75,fontWeight:600,letterSpacing:-3,transform:`translateY(${(1-reveal)*24}px)`,clipPath:`inset(0 ${100-reveal*100}% 0 0)`}}>Every frame. On purpose.</div>
  <div style={{position:'absolute',left:120,top:380,width:1680,height:430,borderRadius:22,overflow:'hidden',border:'1px solid #ffffff1f',background:'linear-gradient(145deg,#1d2631,#11171d)',boxShadow:'inset 0 1px #ffffff18,0 40px 100px #0006',clipPath:`inset(0 ${100-reveal*100}% 0 0 round 22px)`}}>
   <div style={{position:'absolute',top:0,left:0,width:'100%',transform:`translateY(${-phase*430}px)`}}>{['00','42','00'].map((n,i)=><div key={i} style={{height:430,position:'relative',display:'flex',alignItems:'center',paddingLeft:70,gap:120}}><div style={{width:460,fontSize:270,letterSpacing:-16,fontWeight:600,color:accent}}>{n}</div><div><div style={{fontFamily:'Mono',fontSize:24,color:'#8693a7',letterSpacing:5}}>0{i+1} / {['SET','SEEK','RETURN'][i]}</div><div style={{fontSize:42,marginTop:28,color:'#e8ecf2'}}>{['Start at a known address.','Jump across the timeline.','Resolve the same picture.'][i]}</div></div></div>)}</div>
  </div>
  <div style={{position:'absolute',bottom:140,left:120,width:1680,height:2,background:'#ffffff18'}}><div style={{height:2,background:'#8a96a8',width:`${interpolate(f,[0,96,192,264],[0,50,100,100])}%`}}/></div>
  <div style={{position:'absolute',bottom:72,left:120,fontFamily:'Mono',fontSize:22,color:'#8a96a8'}}>REACT SCENES · ONE TIMELINE</div><div style={{position:'absolute',bottom:64,right:120,fontSize:28,opacity:finish,color:'#e6eaf0'}}>Same input. Same frame.</div>
 </div>;
}
