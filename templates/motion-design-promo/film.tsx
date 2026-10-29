import React, {useRef} from 'react';
import {defineFilm, scenesAt, secondsAt} from '@launch-video-maker/runtime';
import {AssetImage, useFrameTask} from '@launch-video-maker/runtime/react';
import {Intro01} from './src/boards/Intro01.jsx';
import {Portfolio02} from './src/boards/Portfolio02.jsx';
import {Showcase03} from './src/boards/Showcase03.jsx';
import {Audience04} from './src/boards/Audience04.jsx';
import {Conversion05} from './src/boards/Conversion05.jsx';
import {Brand06} from './src/boards/Brand06.jsx';
import {Design as originalDesign} from './src/design.js';
import content from './src/content.json';
import fonts from './src/fonts.json';

// Runtime 0.1.0 FontFace assets do not have weight descriptors. Give each
// physical weight its own family; never let the browser synthesize 800 from 400.
const fontsByWeight=Object.fromEntries([400,800].map(weight=>[weight,
 ['Inter','Noto Sans SC I18n A','Noto Sans SC I18n B','Noto Sans SC I18n C'].map(f=>`"${f} ${weight}"`).join(',')+',sans-serif']));
const Design={...originalDesign,fontsByWeight,font:fontsByWeight[800]};
const boards: Record<string,React.ComponentType<any>>={Intro01,Portfolio02,Showcase03,Audience04,Conversion05,Brand06};
export const film=defineFilm({
 width:1280,height:720,fps:{num:60,den:1},durationInFrames:1200,seed:1,
 scenes:content.scenes.map(({id,start,end})=>({id,start,end})),
 assets:[...fonts.map(f=>({...f,kind:'font' as const})),
  ...Object.entries(content.images).map(([id,src])=>({id,src,kind:'image' as const})),
  {id:'music',kind:'audio',src:'assets/audio/music-master.wav'}],
 audio:[{id:'approved-master',asset:'music',start:0,end:1200,sourceStart:0,sourceEnd:20,gain:1}],
 markers:{Idea01:0,Transform02:45,Outcome03:120,Bridge04:180,Portfolio05:225,Value06:360,Showcase07:420,Explain08:555,Audience09:675,Invite10:795,Action11:825,Search12:855,Book13:1005,Brand14:1080}
});
export default function Frame({frame}:{frame:number}) {
 const root=useRef<HTMLDivElement>(null);
 // Mesh builds immutable inline SVG backgrounds. Decode them explicitly so the
 // capture handshake includes CSS images as well as the runtime's normal img assets.
 useFrameTask(async signal=>{
  const urls=new Set<string>();
  for(const el of root.current!.querySelectorAll<HTMLElement>('[style]')){
   const bg=el.style.backgroundImage;
   if(bg.startsWith('url('))urls.add(bg.slice(4,-1).replace(/^["']|["']$/g,''));
  }
  await Promise.all([...urls].map(async src=>{const image=new Image();image.src=src;await image.decode();}));
  signal.throwIfAborted();
 });
 const scene=scenesAt(film,frame)[0];
 const config=content.scenes.find(s=>s.id===scene.id)!;
 const Board=boards[scene.id];
 const media=Object.fromEntries(Object.entries(config.media).map(([key,asset])=>[key,<AssetImage key={key} asset={asset as string}/>]));
 // The approved renderer samples the center of each frame. This is an explicit
 // +0.5-frame visual source offset; runtime frame/audio time still starts at 0.
 const t=secondsAt(film,scene.localFrame+.5),duration=secondsAt(film,scene.end-scene.start);
 // Preserve original CSS layout at 1920x1080, presented at the approved 720p size.
 return <div ref={root} style={{position:'absolute',width:1920,height:1080,transform:'scale(0.6666666666666666)',transformOrigin:'0 0',overflow:'hidden'}}>
  <Board {...config.data} {...media} t={t} duration={duration} Design={Design}/>
 </div>;
}
