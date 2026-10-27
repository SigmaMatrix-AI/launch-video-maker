import React from "react";
// Pure normalized-time motion; quintic easing joins each hold with zero velocity/acceleration.
const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v));
const smooth=v=>{const x=clamp(v);return x*x*x*(10+x*(-15+6*x));};
const phase=(q,a,b)=>smooth((q-a)/(b-a));
const mix=(a,b,p)=>a+(b-a)*p;
function measure(value,Design,weight=800){
 const M=Design.metrics[weight],chars=Array.from(value||'');let x=0,x0=Infinity,y0=0,x1=0,y1=0;
 const advances=[];for(const ch of chars){const v=M.chars[ch]||[M.up,0,-M.up*.12,M.up,M.up*.88];advances.push(x);x0=Math.min(x0,x+v[1]);x1=Math.max(x1,x+v[3]);y0=Math.min(y0,v[2]);y1=Math.max(y1,v[4]);x+=v[0];}
 return {x:Number.isFinite(x0)?x0:0,y:-y1,w:Math.max(1,x1-(Number.isFinite(x0)?x0:0)),h:Math.max(1,y1-y0),advances,chars,up:M.up};
}
function Type({value,Design,id='headline',center=[480,270],height=60,maxWidth=850,weight=800,white=false,opacity=1,scale=1,dx=0,dy=0,reveal=1,clip=1}){
 if(!value)return null;
 // The complete string defines one immutable viewBox, even during its reveal.
 const m=measure(value,Design,weight),w=Math.min(maxWidth,height*m.w/m.h),h=w*m.h/m.w;
 return <div data-motion={id} data-layout={[center[0],center[1],w,h].join(',')} data-scale={scale} style={{position:'absolute',left:`${(center[0]+dx)/9.6}cqw`,top:`${(center[1]+dy)/5.4}cqh`,width:`${w/9.6}cqw`,height:`${h/5.4}cqh`,opacity,transform:`translate(-50%,-50%) scale(${scale})`,transformOrigin:'50% 50%',clipPath:clip<1?`inset(-35% ${(1-clip)*100}% -35% -1%)`:undefined}}>
 <svg viewBox={`${m.x} ${m.y} ${m.w} ${m.h}`} preserveAspectRatio="xMidYMid meet" style={{width:'100%',height:'100%',overflow:'visible'}}>
 <defs><linearGradient id={id+'fill'} gradientUnits="userSpaceOnUse" x1={m.x} x2={m.x+m.w} y1="0" y2="0"><stop stopColor={Design.palette.pink}/><stop offset="1" stopColor={Design.palette.purple}/></linearGradient></defs>
 <text fill={white?Design.palette.white:`url(#${id}fill)`} style={{fontFamily:Design.fontsByWeight[weight],fontWeight:400,fontSynthesis:"none",fontSize:m.up,fontKerning:'none',fontVariantLigatures:'none',whiteSpace:'pre'}}>{m.chars.map((ch,i)=>{const p=phase(reveal,i/Math.max(1,m.chars.length)*.7,i/Math.max(1,m.chars.length)*.7+.3);return <tspan key={i} x={m.advances[i]} y={(1-p)*m.up*.12} opacity={p}>{ch}</tspan>;})}</text>
 </svg></div>;
}
function Mesh({q,Design,id}){
 const P=Design.palette,fs=P.fields[id];
 // Stable spatial fields, continuously crossfaded; no noisy frame-to-frame refitting.
 const fields=React.useMemo(()=>{if(!fs?.length)return [];const picks=[fs[0],fs[Math.floor((fs.length-1)/2)],fs[fs.length-1]];return picks.map((f,i)=>{
 const rows=f.colors.length,cols=f.colors[0].length;
 const defs=f.colors.map((row,y)=>`<linearGradient id="g${y}">${row.map((c,x)=>`<stop offset="${x/(cols-1)}" stop-color="rgb(${c.join(',')})"/>`).join('')}</linearGradient>`).join('');
 const rects=f.colors.map((_,y)=>`<rect x="-3" y="${y*100/(rows-1)-3}" width="106" height="${100/(rows-1)+1}" fill="url(#g${y})"/>`).join('');
 return 'url("data:image/svg+xml,'+encodeURIComponent(`<svg xmlns="http:${String.fromCharCode(47,47)}www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none"><defs><filter id="blur" x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation="1.8"/></filter>${defs}</defs><g filter="url(#blur)">${rects}</g></svg>`)+'")';
 });},[fs]);
 if(!fields.length)return null;const a=phase(q,0,.6),b=phase(q,.4,1);
 return <><div style={{position:'absolute',inset:0,backgroundImage:fields[0],backgroundSize:'100% 100%'}}/>{fields.slice(1).map((f,i)=><div key={i} style={{position:'absolute',inset:0,backgroundImage:f,backgroundSize:'100% 100%',opacity:i===0?a:b}}/>)}<div style={{position:'absolute',inset:0,opacity:.06,backgroundImage:`linear-gradient(${P.grid} 0.08cqh, transparent 0.08cqh),linear-gradient(90deg,${P.grid} 0.05cqw, transparent 0.05cqw)`,backgroundSize:'7.2cqw 13.5cqh'}}/></>;
}
function Card({element,box,Design,id,radius=1.5,opacity=1,rotate=0,tilt=0,glow=0}){
 if(!element)return null;const [x,y,w,h]=box;
 return <div data-motion={id} style={{position:'absolute',left:`${x/9.6}cqw`,top:`${y/5.4}cqh`,width:`${w/9.6}cqw`,height:`${h/5.4}cqh`,borderRadius:`${radius}cqh`,overflow:'hidden',opacity,transform:`perspective(120cqw) rotateZ(${rotate}deg) rotateX(${tilt}deg)`,transformOrigin:'50% 50%',backfaceVisibility:'hidden',boxShadow:glow?`0 0 ${glow*2.6}cqw ${Design.palette.shadow}`:undefined}}>{React.cloneElement(element,{style:{...element.props?.style,width:'100%',height:'100%',objectFit:'cover'}})}</div>;
}
function Gallery({q,Design,id,pics}){return Design.cards[id].map(c=>{const p=phase(q,c.start,c.start+.3),[x,y,w,h]=c.rest,s=mix(2.35,1,p),cx=x+w/2,cy=y+h/2,xx=cx+(cx-480)*1.8*(1-p),yy=cy+(cy-270)*1.8*(1-p);return <Card key={c.key} id={c.key} element={pics[c.key]} Design={Design} box={[xx-w*s/2,yy-h*s/2,w*s,h*s]} opacity={phase(p,0,.25)}/>;});}
function Root({Design,q,children}){return <div data-scene-q={q} style={{position:'absolute',inset:0,containerType:'size',background:Design.palette.bg,overflow:'hidden',fontFamily:Design.font}}>{children}</div>;}

// All beat motion remains a pure function of the enclosing scene's normalized time.
// Preload media without mounting inactive SVGs (their gradient ids must stay unique).
function Sequence({t,duration,Design,name,parts,content}){
 const q=clamp(t/duration),total=parts.reduce((sum,p)=>sum+p.weight,0),cursor=q*total;
 let offset=0,index=parts.length-1;
 for(let i=0;i<parts.length;i++){if(cursor<offset+parts[i].weight||i===parts.length-1){index=i;break;}offset+=parts[i].weight;}
 const part=parts[index],localDuration=duration*part.weight/total,localTime=clamp(t-duration*offset/total,0,localDuration),Beat=part.Board;
 const preload=Object.values(content).filter(React.isValidElement);
 return <div data-scene-q={q} data-group-scene={name} data-phase={part.id} style={{position:'absolute',inset:0}}><div style={{display:'none'}}>{preload.map((el,i)=>React.cloneElement(el,{key:'preload'+i,'data-field':undefined}))}</div><Beat key={part.id} {...content} t={localTime} duration={localDuration} Design={Design}/></div>;
}
function Value06({t,duration,Design,value}){
 const q=clamp(t/duration);return <Root {...{Design,q}}><Type value={value} Design={Design} height={60} maxWidth={760} reveal={phase(q,0,.6)} dy={-87*phase(q,.78,1)}/></Root>;
}

function Showcase07({t,duration,Design,project1,project2,project3,project4,project5}){
 const q=clamp(t/duration),pics=[project1,project2,project3,project4,project5].map((element,i)=>({element,id:'project'+(i+1)})).filter(p=>p.element),starts=pics.length===5?[.02,.14,.26,.38,.5]:pics.map((_,i)=>.02+(pics.length>1?.48*i/(pics.length-1):0));
 return <Root {...{Design,q}}><Mesh {...{q,Design}} id="Showcase07"/>{pics.map(({element,id},i)=>{const p=phase(q,starts[i],starts[i]+.23),hero=i===pics.length-1;let covered=0;for(let j=i+1;j<pics.length;j++)covered+=phase(q,starts[j],starts[j]+.23);const s=1-covered*.026,w=612*s,h=382*s,x=480-w/2+(i%2?1:-1)*85*(1-p),y=270-h/2+510*(1-p)-covered*12;return <Card key={id} {...{id,element,Design}} box={[x,y,w,h]} rotate={(i%2?9:-9)*(1-p)} tilt={48*(1-p)} opacity={phase(p,0,.18)*(hero?1:1-phase(q,.72,.89))} glow={hero?phase(q,.69,.84):0}/>;})}</Root>;
}

export function Showcase03({t,duration,Design,...content}){return <Sequence {...{t,duration,Design,content}} name="Showcase03" parts={[{id:"Value06",weight:1000,Board:Value06},{id:"Showcase07",weight:2250,Board:Showcase07}]}/>;}
