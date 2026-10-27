import {toOutputFrame,toSourceFrame,durationInFrames} from './src/timeline';
import React from 'react';
import {defineFilm} from '@launch-video-maker/runtime';
import {Opening} from './src/Opening';
import {PlayRibbon,Prompt} from './src/Prompt';
import {Generate} from './src/Generate';
import {StyleScene} from './src/StyleScene';
import {ScriptVoice} from './src/ScriptVoice';
import {EditScene,ShowcaseScene,ResultScene} from './src/Workflow';
import {Finale} from './src/Finale';
import {sec} from './src/ui';
const F=(s:number)=>Math.ceil(s*30000/1001);
const chapters:[string,number,number][]=[['opening',0,9.4],['input-outline',9.4,17.8],['official-examples',17.8,26.95],['script-brand',26.95,46.2],['prompt-editing',46.2,53.35],['inspiration-refinement',53.35,64.3],['results-playback',64.3,75.8],['brand-finale',75.8,86.7199666667]];
const images=['input-source','demo-outline','demo-script','demo-edit','brand','fix'];
export const film=defineFilm({width:1920,height:1080,fps:{num:30000,den:1001},durationInFrames,seed:4,
scenes:chapters.map(([id,s,e])=>({id,start:toOutputFrame(F(s)),end:toOutputFrame(Math.min(2599,F(e)))})),
assets:[{id:'google-sans',kind:'font',family:'Google Sans',src:'brand-kit/GoogleSans-Regular.ttf'},{id:'logo',kind:'image',src:'brand-kit/logo.svg'},{id:'finger',kind:'image',src:'brand-kit/finger.svg'},{id:'bgm',kind:'audio',src:'assets/audio/capsule-flow-bgm-edit.wav'},...images.map(id=>({id,kind:'image' as const,src:`assets/media/${id}.png`})),...Array.from({length:12},(_,i)=>({id:`case-${i}`,kind:'image' as const,src:`assets/media/case-${i}.jpg`})),{id:'showcase',kind:'video',src:'assets/media/showcase.mp4',outOfRange:'hold'}],
audio:[{id:'reference-bgm-no-narration',asset:'bgm',start:0,end:durationInFrames,sourceStart:0,sourceEnd:durationInFrames*1001/30000,gain:.86,fadeIn:3,fadeOut:15,shortage:'silence'}],
markers:Object.fromEntries(Object.entries({typeFlipOne:43,typeFlipTwo:77,clickTapVid:125,clickProductLaunch:165,prompt:194,attachment:F(12.25),creating:F(13.2),outline:F(16.2),gallery:F(23.5),script:F(32),brand:F(42.95),edits:F(51.2),wall:F(57.8),planeTransition:F(65.9),result:F(69.4),play:F(76.65),logo:F(82.5),cta:F(84.6)}).map(([id,frame])=>[id,toOutputFrame(frame)]))
});
export default function Frame({frame:outputFrame}:{frame:number}){const frame=toSourceFrame(outputFrame),t=sec(frame);return <div style={{width:'100%',height:'100%',position:'relative',overflow:'hidden',background:frame===0?'#000':'#fdfdfd',fontFamily:'Google Sans',fontWeight:400,color:'#3f4548'}}>{frame>0&&(t<9.4?<>{frame<184&&<Opening frame={frame}/>}<PlayRibbon frame={frame}/><Prompt frame={frame}/></>:t<17.8?<Generate frame={frame}/>:t<26.95?<StyleScene frame={frame}/>:t<46.2?<ScriptVoice frame={frame}/>:t<53.35?<EditScene frame={frame}/>:t<64.3?<ShowcaseScene frame={frame}/>:t<75.8?<ResultScene frame={frame}/>:<Finale frame={frame}/>)}</div>}
