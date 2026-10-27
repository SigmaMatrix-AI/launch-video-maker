import {CreatePlane} from './CreatePlane';
import {brandGreen,leafGreen,brandInk,brandGradient,brandGlow} from './palette';
import React from 'react';
import {AssetImage} from '@launch-video-maker/runtime/react';
import {progress,track} from './motion';

const gradientText:React.CSSProperties={background:brandGradient(),backgroundClip:'text',WebkitBackgroundClip:'text',color:'transparent'};
function EdgeLight({f,width,id}:{f:number;width:number;id:string}){
 return <svg width={width} height="180" viewBox={`0 0 ${width} 180`} style={{position:'absolute',inset:0,pointerEvents:'none'}}><defs><linearGradient id={id} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#6ba34c" stopOpacity="0"/><stop offset=".3" stopColor="#78d701"/><stop offset=".53" stopColor="#fff" stopOpacity="0"/><stop offset=".85" stopColor="#a9d76d"/><stop offset="1" stopColor="#65a347" stopOpacity="0"/></linearGradient></defs><rect x="1" y="1" width={width-2} height="178" rx="53" stroke={`url(#${id})`} fill="none" strokeWidth="1.4" strokeDasharray="280 130" strokeDashoffset={-f*3}/></svg>;
}
// A rotating type block becomes the Tapvid launch button. All motion is frame-driven.
export function Opening({frame:f}:{frame:number}){
 const appear=progress(f,5,20), morph=progress(f,90,114);
 const turn=90*progress(f,34,51)+90*progress(f,68,85);
 const press=track(f,[[122,0],[125,1],[129,0],[162,0],[165,1],[169,0]],true);
 const exit=progress(f,171,184),width=620-160*morph,height=180;
 const x=1076-116*morph,scale=(1+.48*morph)*(1-.065*press);
 const textFade=1-progress(f,90,103),label=progress(f,102,113);
 const pointerX=track(f,[[110,1590],[121,1180],[137,1180],[144,1315],[147,1407],[154,1514],[161,1810],[170,1810],[178,2000]],true);
 const pointerY=track(f,[[110,1120],[121,570],[137,570],[144,740],[147,97],[154,113],[161,550],[170,550],[178,940]],true);
 return <div style={{position:'absolute',inset:0,opacity:appear*(1-exit)}}>
  <div style={{position:'absolute',left:210,top:476,fontSize:96,lineHeight:1.3,letterSpacing:-3,color:'#222625',opacity:textFade,transform:`translateX(${-60*morph}px)`}}>Create your</div>
  <div style={{position:'absolute',left:1422,top:476,fontSize:96,lineHeight:1.3,letterSpacing:-3,color:'#222625',opacity:textFade,transform:`translateX(${60*morph}px)`}}>video</div>
  <div style={{position:'absolute',left:x,top:540+(1-appear)*30+track(f,[[140,0],[144,-150],[147,-1280],[161,-1740]],true),transform:`translate(-50%,-50%) scale(${scale})`,width,height,perspective:1500}}>
   {f<90 ? <div style={{position:'absolute',inset:0,transformStyle:'preserve-3d',transform:`translateZ(-90px) rotateX(${-turn}deg)`}}>
    {['Motion','Explainer','Launch'].map((word,i)=>Math.cos((i*90-turn)*Math.PI/180)>0.0001&&<div key={word} style={{position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center',backfaceVisibility:'hidden',transform:`rotateX(${i*90}deg) translateZ(90px)`,background:['#e5ebf3','#e8edf5','#e4ebf3'][i],borderRadius:54,fontSize:96,letterSpacing:-3}}><span style={gradientText}>{word}</span><EdgeLight f={f} width={width} id={`cube-edge-${i}`}/></div>)}
   </div> : <div style={{position:'absolute',inset:0,borderRadius:54,background:'#e4ebf3',boxShadow:'-4px 7px 10px #6c8b9f13'}}>
    {f<102&&<div style={{position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center',fontSize:96,letterSpacing:-3,opacity:1-progress(f,94,101)}}><span style={gradientText}>Launch</span></div>}
    {f>=102&&<div style={{position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center',fontSize:88,letterSpacing:-3,opacity:label,transform:`translateY(${(1-label)*15}px)`}}><span style={gradientText}>Tapvid</span></div>}
    <EdgeLight f={f} width={width} id="button-edge"/>
   </div>}

  </div>
  {f>=130&&<CreationMenu frame={f}/>}
  {f>=110&&<div style={{position:'absolute',left:pointerX,top:pointerY,width:180,height:180,opacity:progress(f,110,119)*(1-progress(f,169,180)),transformOrigin:'32% 32%',transform:`translate(-32%,-32%) rotate(${-10+10*progress(f,135,149)}deg) scale(${1-.16*press})`,filter:'drop-shadow(0 7px 5px #00000018)'}}><AssetImage asset="finger" style={{width:'100%',height:'100%'}}/></div>}
  {f>=162&&f<170&&<div style={{position:'absolute',left:1810,top:550,width:24+100*progress(f,165,173),height:24+100*progress(f,165,173),border:'2px solid #78b945',borderRadius:'50%',opacity:.4*(1-progress(f,165,173)),transform:'translate(-50%,-50%)',pointerEvents:'none'}}/>}
 </div>;
}

function CreationMenu({frame:f}:{frame:number}){
 const cameraY=track(f,[[130,0],[132,-45],[138,10],[141,-20],[144,-150],[147,-1280],[161,-1740]],true);
 const menuScale=track(f,[[171,1],[174,.72],[180,.50]],true);
 const items=[['Your ideas',0],['Your scripts',220],['Your documents',440],['Your images',760],['Your reference',980],['Product Launch Video',1300],['Motion graphics',1520],['Explainer videos',1740],['Product stories',1960]] as const;
 const selected=f<146?0:f<151?2:f<155?3:f<160?4:5;
 return <div style={{position:'absolute',left:590-280*progress(f,171,174),top:760+cameraY+track(f,[[130,49],[144,89],[147,85],[161,95]])-39*progress(f,171,174),width:1800,height:2250,background:'#fdfdfd',boxShadow:'-22px 4px 55px #6c8ca824',opacity:progress(f,130,132),transformOrigin:'750px 1500px',transform:`scale(${menuScale})`,filter:`blur(${track(f,[[171,0],[174,9],[181,16]])}px)`}}>
 {items.map(([text,y],i)=><div key={text} style={{position:'absolute',left:0,top:y+40,width:'100%',height:220,display:'flex',alignItems:'center',background:f>=143&&selected===i?'#ebebeb':'transparent'}}><div style={{position:'absolute',left:110,top:65,color:i===5?brandGreen:'#8a9b82'}}><CreatePlane size={75}/></div><div style={{marginLeft:350,fontSize:i===5?78:100,letterSpacing:-1.8,color:'#222625',whiteSpace:'nowrap'}}>{text}</div></div>)}
 {[740,1280].map(y=><div key={y} style={{position:'absolute',left:0,right:0,top:y,height:5,background:'#c8cac9'}}/>)}</div>;
}
