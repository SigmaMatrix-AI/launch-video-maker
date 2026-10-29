import React from 'react';
import {Hand} from './Icons';
import {abs,Glow,Panel,Photo,PlaybackControls,TypedTitle,BrandMark,Glyph,sec,p,tr} from './ui';
function SlotPlay(){return <div style={{display:'flex',alignItems:'center',flexDirection:'column',gap:38}}><div style={{border:'4px solid white',borderRadius:'50%',width:74,height:74,display:'grid',placeItems:'center'}}><Glyph name="play" size={34}/></div><div style={{display:'flex',alignItems:'center',justifyContent:'space-around',width:125,height:40,borderRadius:30,background:'#ffffffb8',color:'#80928b'}}><span style={{width:9,height:9,borderRadius:'50%',background:'currentColor'}}/><span style={{width:9,height:9,borderRadius:'50%',background:'currentColor'}}/><Glyph name="mic" size={23}/></div></div>}
export function StyleCard({kind}:{kind:number}){return <Photo id={`case-${[0,1,9][kind]}`} style={{objectFit:'contain',background:'#fff'}}/>}
export function StyleScene({frame}:{frame:number}){const t=sec(frame);
 if(t<21.8)return <><TypedTitle t={t} start={17.85} end={19.6} prefix="Let’s explore a " word="style" font={tr(t,[[17.8,205],[18.6,101],[20,101]])} fadeStart={20.15} fadeEnd={20.9}/>{t>20.3&&<Hand x={tr(t,[[20.3,1500],[21,1035],[21.4,1035]])} y={tr(t,[[20.3,850],[21.1,590],[21.5,540]])} size={95} press={p(t,21.2,21.5)}/>}</>;

 return <><Glow/><div style={{...abs,inset:0,opacity:1-p(t,24.05,24.25)}}><>
 <Panel style={{left:214,top:120,width:1490,height:840,transform:`perspective(1800px) rotateY(${tr(t,[[21.8,-15],[22.8,0]])}deg)`,opacity:p(t,21.8,22.2)}}><div style={{...abs,left:75,top:56,fontSize:29}}>← &nbsp; Made with TapVid — official examples</div><div style={{...abs,right:55,top:56,fontSize:35}}>×</div></Panel>
 {Array.from({length:12},(_,i)=>{const a=p(t,21.65+i*.035,22.65+i*.045);return <div key={i} style={{...abs,left:337+(i%4)*318+(1-a)*[240,-720,180,480,-1100,310,-430,760,-180,340,-500,650][i],top:254+Math.floor(i/4)*230+(1-a)*[-200,140,-150,-300,-80,60,-130,70,240,-150,300,160][i],width:298,height:169,opacity:p(t,21.65+i*.035,21.85+i*.035),transform:`rotate(${(1-a)*(i%2?9:-9)}deg) scale(${1+(1-a)*(i===4?2.5:.5)})`,borderRadius:7,overflow:'hidden',boxShadow:'0 0 0 1px #8b979b30'}}><Photo id={`case-${i}`}/></div>})}
 </>

 </div></>;
}
