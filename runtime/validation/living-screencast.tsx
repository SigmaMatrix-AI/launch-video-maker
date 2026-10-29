import React,{useRef} from 'react';
import {defineFilm,ease,interpolate} from '@launch-video-maker/runtime';
import {useFrameTask} from '@launch-video-maker/runtime/react';
export const film=defineFilm({width:1920,height:1080,fps:{num:30,den:1},durationInFrames:360,seed:9,scenes:[{id:'approach',start:0,end:120},{id:'step',start:120,end:240},{id:'hold',start:240,end:360}],assets:[{id:'inter',kind:'font',family:'Inter',src:'brand-kit/Inter.ttf'},{id:'mono',kind:'font',family:'Mono',src:'brand-kit/JetBrainsMono-var.ttf'},{id:'score',kind:'audio',src:'assets/score.wav'}],audio:[{id:'score',asset:'score',start:0,end:360,fadeOut:30}],markers:{step:150,look:240}});
const sprite=['..XXXXX..','.XXXXXXX.','XXXXXXXXX','XX..X..XX','XX..X..XX','XXXXXXXXX','.XXXXXXX.','..XX.XX..'];
export default function Frame({frame:f}:{frame:number}){
 const container=useRef<HTMLDivElement>(null),button=useRef<HTMLDivElement>(null),actor=useRef<HTMLDivElement>(null),cursor=useRef<HTMLDivElement>(null);
 const push=ease((f-60)/80)*.18-ease((f-260)/60)*.18;
 useFrameTask(async(signal)=>{
  if(signal.aborted)return;const box=container.current!,b=button.current!.getBoundingClientRect(),base=box.getBoundingClientRect();
  const scale=base.width/1600,x=(b.left-base.left)/scale+5,y=(b.top-base.top)/scale;
  const progress=ease((f-40)/100),hop=f>=120&&f<150?Math.sin((f-120)/30*Math.PI)*80:0;
  actor.current!.style.transform=`translate(${Math.round((x-150+150*progress)*2)/2}px,${Math.round((y-64-hop)*2)/2}px) scaleY(${f>=112&&f<120?1-(f-112)/8*.25:f>=120&&f<126?1.25-(f-120)/6*.25:f>=150&&f<160?.7+(f-150)/10*.3:1})`;
  cursor.current!.style.transform=`translate(${100+(x+20-100)*ease((f-20)/90)}px,${80+(y+25-80)*ease((f-20)/90)}px) scale(${f>=148&&f<154?.85:1})`;
 });
 return <div style={{width:'100%',height:'100%',overflow:'hidden',background:'radial-gradient(ellipse at 70% 10%,#d5e4f5,#adb7c7 65%,#8d9bad)',fontFamily:'Inter',position:'relative'}}>
  <div style={{position:'absolute',left:160,top:100,width:1600,height:780,transform:`scale(${1+push})`,transformOrigin:'center center',borderRadius:16,overflow:'hidden',boxShadow:'0 40px 100px #263c5266'}} ref={container}>
   <div style={{height:48,paddingLeft:24,background:'#e9edf3',display:'flex',alignItems:'center',fontSize:18,color:'#4b5566'}}>Launch Video Maker / Frame preview</div>
   <div style={{position:'relative',height:640,background:'#111',color:'white',display:'grid',placeItems:'center'}}><div style={{fontSize:62,fontFamily:'Mono'}}>frame {f<150?'0':'1'}</div><div style={{position:'absolute',top:40,left:40,fontSize:16,color:'#697586',letterSpacing:3}}>RUNTIME VALIDATION</div></div>
   <div style={{height:92,display:'flex',alignItems:'center',gap:14,padding:'0 20px',background:'#171719',color:'#eee',fontSize:21}}><div style={{padding:14,background:'#343438',border:'1px solid #666',borderRadius:3}}>Play</div><div style={{padding:14,background:'#343438',border:'1px solid #666',borderRadius:3}}>−1</div><div ref={button} style={{padding:14,background:f>=150&&f<158?'#697688':'#343438',border:'1px solid #666',borderRadius:3}}>+1</div><div style={{height:6,background:'#707176',flex:1,position:'relative'}}><div style={{position:'absolute',top:-5,left:f<150?0:12,borderRadius:12,width:16,height:16,background:'#0b90ff'}}/></div><div style={{width:230,fontSize:18}}>{f<150?'0 / 89 · 0.000s':'1 / 89 · 0.033s'}</div></div>
   <div ref={actor} style={{position:'absolute',left:0,top:0,width:72,height:64,transformOrigin:'bottom',pointerEvents:'none'}}>{sprite.flatMap((row,y)=>[...row].map((v,x)=>v==='X'?<div key={`${x}-${y}`} style={{position:'absolute',left:x*8,top:y*8,width:8,height:8,background:'#ffb45c'}}/>:null))}</div>
   <div ref={cursor} style={{position:'absolute',left:0,top:0,pointerEvents:'none'}}><svg width="38" height="46" viewBox="0 0 38 46"><path d="M2 2 L32 27 L20 29 L27 42 L19 46 L12 32 L3 40 Z" fill="white" stroke="#14191f" strokeWidth="2"/></svg></div>
  </div>
  <div style={{position:'absolute',bottom:42,left:'50%',transform:'translateX(-50%)',padding:'18px 30px',borderRadius:16,background:'#ffffffc9',border:'1px solid #ffffffbb',fontSize:25,color:'#283342'}}>{f<150?'Move to the next frame.':'One step. Exactly one frame.'}</div>
 </div>;
}
