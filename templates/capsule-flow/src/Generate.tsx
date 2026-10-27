import {Prompt} from './Prompt';
import {CreatePlane} from './CreatePlane';
import {brandGreen,leafGreen,brandInk,brandGradient,brandGlow} from './palette';
import React from 'react';
import {Hand} from './Icons';
import {abs,Center,Glow,FileIcon,Glyph,Panel,Photo,sec,p,tr,textGrad} from './ui';
export function Generate({frame}:{frame:number}){const t=sec(frame);
 if(t<10.2){const pull=p(t,9.4,10.15),scale=1-.75*pull;return <><Glow opacity={p(t,9.5,10.5)}/><div style={{...abs,inset:0,transformOrigin:'960px 540px',transform:`translateX(${750*pull*scale}px) scale(${scale})`}}><Prompt frame={281} textOpacity={1-p(t,9.98,10.2)}/></div></>;}
 if(t<13.2){const morph=p(t,10.2,11.1),z=tr(t,[[11.4,1],[12.8,1.04]]),insert=p(t,11.05,11.65),click=p(t,12.35,12.55)*(1-p(t,12.6,12.8));
 return <><Glow opacity={p(t,9.5,10.5)}/><div style={{...abs,inset:0,opacity:1-p(t,12.9,13.2)}}>
 <Center style={{transform:`translate(-50%,-50%) scale(${z})`,width:1400+60*morph,height:177.5+332.5*morph,borderRadius:88.75-48.75*morph,background:'#edf3f5',boxShadow:`0 14px 65px rgba(102,116,160,${.094*morph})`,padding:'55px 60px',boxSizing:'border-box',color:'#11192d'}}>
 <div style={{...abs,inset:0,borderRadius:'inherit',background:brandGradient(112,'18'),opacity:1-morph}}/><div style={{...abs,inset:0,borderRadius:'inherit',background:'#fff',opacity:morph}}/>
 <div style={{position:'relative',opacity:p(t,10.8,11.15)}}>
  <div style={{display:'flex',alignItems:'center',gap:18,width:510,height:70,border:'2px solid #e0e6ee',borderRadius:40,background:'#f8fafc',padding:'0 20px',boxSizing:'border-box',opacity:p(t,11.05,11.3),transform:`translate(${(1-insert)*580}px,${-(1-insert)*160}px) scale(${1+(1-insert)*.12})`}}><span style={{display:'grid',placeItems:'center',width:42,height:42,borderRadius:12,background:'#eef4df',color:leafGreen}}><svg width="27" height="27" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-2 2M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l2-2"/></svg></span><span style={{fontSize:32}}>https://tapvid.ai</span><span style={{marginLeft:'auto',fontSize:30,color:'#94a3b8'}}>×</span></div>
  <div style={{fontSize:46,lineHeight:1.45,letterSpacing:-.5,marginTop:30,maxWidth:1180}}>Create a product launch video from this URL.</div></div>
  <div style={{position:'absolute',left:60,right:60,bottom:45,opacity:p(t,11.1,11.45),display:'flex',alignItems:'center',gap:18}}><span style={{fontSize:58,marginRight:12}}>+</span>{['16:9','60s','English'].map(label=><span key={label} style={{fontSize:28,border:'2px solid #e0e6ee',padding:'15px 26px',borderRadius:40,color:'#58677d'}}>{label}</span>)}<div style={{marginLeft:'auto',width:82,height:82,borderRadius:'50%',background:'#11192d',display:'grid',placeItems:'center',color:'white',boxShadow:'0 0 0 5px white,0 0 0 8px #78d701',transform:`scale(${1-.08*click})`}}><CreatePlane size={40}/></div></div>
 </Center>
 {t>11.8&&<Hand x={tr(t,[[11.8,1850],[12.35,1590],[12.7,1590]])} y={tr(t,[[11.8,1050],[12.35,705],[12.7,705]])} size={125} press={click}/>}
 </div></>;
 }
 if(t<14.75){const s=tr(t,[[13.2,1.45],[13.5,1.75],[14,1.75],[14.6,2.1],[14.75,2.5]]);return <><Glow/><Center style={{width:850,height:230,borderRadius:160,display:'flex',gap:35,justifyContent:'center',alignItems:'center',fontSize:98,color:brandInk,background:brandGradient(110),boxShadow:'15px 28px 60px #529d3035',transform:`translate(-50%,-50%) perspective(1200px) rotateY(${tr(t,[[13.2,-8],[13.8,0],[14.75,-35]])}deg) scale(${s})`,opacity:1-p(t,14.55,14.75)}}>Creating…<Glyph name="spark" size={95}/></Center></>}
 const zoom=tr(t,[[14.75,3.1],[15.4,2.15],[16.1,1],[17.25,1],[17.75,.96]]);
 return <><Glow/><div style={{...abs,left:280,top:110,width:1360,height:800,transform:`translate(${-90*(1-p(t,15.5,16.1))}px,${-650*(1-p(t,15.5,16.1))}px) perspective(2400px) rotateY(${-16*(1-p(t,15.5,16.1))}deg) scale(${zoom})`,transformOrigin:'50% 50%',opacity:p(t,14.75,15.05)*(1-p(t,17.5,17.8)),borderRadius:28,overflow:'hidden'}}><Photo id="demo-outline" style={{objectFit:'contain'}}/></div><div style={{...abs,bottom:45,width:'100%',textAlign:'center',fontSize:24,color:'#66757c',opacity:p(t,16.1,16.4)}}>Review the outline · TapVid official demo</div></>;
}
