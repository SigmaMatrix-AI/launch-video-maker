import React from 'react';
import {progress,track} from './motion';
export function PlayRibbon({frame:f}:{frame:number}){
 if(f<171||f>=201)return null;
 const ribbon=[
  {x:[[171,730],[174,790],[177,478],[180,408],[183,65],[187,-90],[190,-650],[194,-1900]],w:[[171,50],[174,180],[177,240],[180,240],[183,250],[187,150],[190,200]],colors:['#cc69ed','#9233df']},
  {x:[[174,970],[177,718],[180,648],[183,315],[187,60],[190,-450],[194,-1750],[198,-2100]],w:[[174,0],[177,300],[180,380],[183,400],[187,600],[190,1170]],colors:['#d175ef','#7445f0']},
  {x:[[177,1018],[180,1028],[183,715],[187,660],[190,720],[194,-40],[198,-1200]],w:[[177,0],[180,340],[183,580],[187,800],[190,1160],[194,900],[198,850]],colors:['#df86ed','#396af4']},
  {x:[[180,1368],[183,1295],[187,1460],[190,1880],[194,860],[198,-350],[201,-700]],w:[[180,0],[183,430],[187,390],[190,570],[194,800],[198,550],[201,600]],colors:['#326bf4','#aeb8f5']}
 ];
 const blend=(a:string,b:string,p:number)=>{const av=parseInt(a.slice(1),16),bv=parseInt(b.slice(1),16);return '#'+[16,8,0].map(s=>Math.round(((av>>s)&255)*(1-p)+((bv>>s)&255)*p).toString(16).padStart(2,'0')).join('');};
 const p=progress(f,183,187);
 const initial=[['#c269eb','#ba52eb','#9836dd'],['#c565ed','#a447e8','#6746ee'],['#df86ed','#5964ed','#396af4'],['#326bf4','#6489f3','#aeb8f5']];
 const final=[initial[0],['#9985e9','#446cf4','#b3bef4'],['#326bf4','#5b82f5','#b4b9f3'],['#b3a5ef','#a4c4f5','#a5e6f4']];
 return <svg viewBox="0 0 1920 1080" width="1920" height="1080" style={{position:'absolute',inset:0,overflow:'visible'}}><defs>{ribbon.map((r,i)=><linearGradient key={i} id={`triangle-${i}`}><stop stopColor={blend(initial[i][0],final[i][0],p)}/><stop offset=".55" stopColor={blend(initial[i][1],final[i][1],p)}/><stop offset="1" stopColor={blend(initial[i][2],final[i][2],p)}/></linearGradient>)}</defs>{ribbon.map((r,i)=>{const width=track(f,r.w as [number,number][]),height=width*1.16,x=track(f,r.x as [number,number][]);return <path key={i} d={`M${x} ${540-height/2}L${x+width} 540L${x} ${540+height/2}Z`} fill={`url(#triangle-${i})`} opacity={f<r.x[0][0]?0:1}/>;})}</svg>;
}
// Character timings transcribed from the supplied reference.
const typing:readonly (readonly [number,string])[]=[
 [194,'H'],[196,'He'],[198,'Hel'],[201,'Help'],[204,'Help '],[206,'Help m'],[208,'Help me'],[220,'Help me c'],[225,'Help me cr'],[229,'Help me cre'],[233,'Help me creat'],[237,'Help me create'],[240,'Help me create a '],[241,'Help me create a s'],[242,'Help me create a sa'],[244,'Help me create a sal'],[245,'Help me create a sale'],[246,'Help me create a sales'],[248,'Help me create a sales '],[249,'Help me create a sales t'],[250,'Help me create a sales trai'],[252,'Help me create a sales train'],[254,'Help me create a sales trainin'],[255,'Help me create a sales training'],[256,'Help me create a sales training '],[257,'Help me create a sales training v'],[258,'Help me create a sales training vi'],[260,'Help me create a sales training vid'],[262,'Help me create a sales training vide'],[264,'Help me create a sales training video']];
export function Prompt({frame:f}:{frame:number}){
 if(f<192)return null;
 const text=typing.filter(([at])=>f>=at).at(-1)?.[1]??'',isSmall=f>=221,fontSize=isSmall?236:408;
 const left=track(f,[[192,2200],[194,886],[198,188],[202,-50],[206,-240],[218,-260],[220,-260],[221,320],[222,320],[230,20],[234,-295],[238,-655],[242,-1105],[246,-1420],[250,-1780],[254,-2105],[258,-2400],[262,-2560],[264,-2590],[281,-2590]]),boxHeight=isSmall?710:1920;
 const prefix='Help me create a ',normal=text.startsWith(prefix)?prefix:text,colored=text.startsWith(prefix)?text.slice(prefix.length):'';
 const caretRight=track(f,[[194,1843],[198,1437],[202,1356],[206,1647],[210,1822],[214,1775],[218,1728],[220,1705],[221,1631],[222,1631],[226,1636],[230,1633],[234,1651],[238,1495],[240,1468],[242,1517],[246,1323],[250,1356],[254,1446],[258,1661],[262,1844],[264,1880],[281,1880]]);
 return <>
  <div style={{position:'absolute',left,top:540-boxHeight/2,width:5600,height:boxHeight,borderRadius:boxHeight/2,background:'#edf3f5',opacity:track(f,[[192,0],[194,1]]),overflow:'hidden'}}>
   <div style={{position:'absolute',inset:0,opacity:progress(f,234,245),background:'radial-gradient(ellipse at 75% 0%,#efdfeb 0%,transparent 42%),radial-gradient(ellipse at 50% 0%,#d5e7fc 0%,transparent 65%),linear-gradient(110deg,#ecf2f4,#e9eafa)'}}/>
  </div>
  <div style={{position:'absolute',left:caretRight,top:540,transform:'translate(-100%,-55%)',fontSize,lineHeight:1.2,letterSpacing:isSmall?-9:-10,whiteSpace:'pre',width:'max-content',color:'#727a7a',display:'flex',alignItems:'center',opacity:f<194?0:1}}>
   <span>{normal}</span><span style={{background:`linear-gradient(${100+f}deg,#3ba7e3,#6262f6 52%,#369fe4)`,backgroundClip:'text',WebkitBackgroundClip:'text',color:'transparent'}}>{colored}</span>
   {f<264&&<span style={{width:isSmall?21:35,height:fontSize*1.31,display:'inline-block',background:colored?'#526bf5':'#737b7b',marginLeft:isSmall?8:14,transform:'translateY(4%)'}}/>}
  </div>
 </>;
}
