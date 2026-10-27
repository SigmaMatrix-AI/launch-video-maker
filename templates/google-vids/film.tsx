import React from 'react';
import {defineFilm} from '@launch-video-maker/runtime';
import {Opening} from './src/Opening';
import {PlayRibbon,Prompt} from './src/Prompt';
import {Generate} from './src/Generate';
import {StyleScene} from './src/StyleScene';
import {ScriptVoice} from './src/ScriptVoice';
import {Collaborate} from './src/Collaborate';
import {MediaScene} from './src/MediaScene';
import {RecordScene} from './src/RecordScene';
import {Finale} from './src/Finale';
import {imageIds} from './src/media';
import {sec} from './src/ui';
const F=(s:number)=>Math.ceil(s*30000/1001);
const chapters:[string,number,number][]=[['opening',0,9.4],['generate-outline',9.4,17.8],['choose-style',17.8,26.95],['script-and-voice',26.95,46.2],['collaboration',46.2,53.35],['stock-media-editor',53.35,64.3],['record-presenter',64.3,75.8],['launch-finale',75.8,86.7199666667]];
export const film=defineFilm({
 width:1920,height:1080,fps:{num:30000,den:1001},durationInFrames:2599,seed:4,
 scenes:chapters.map(([id,start,end])=>({id,start:F(start),end:Math.min(2599,F(end))})),
 assets:[{id:'google-sans',kind:'font',family:'Google Sans',src:'brand-kit/GoogleSans-Regular.ttf'},{id:'reference-audio',kind:'audio',src:'assets/reference-full.wav'},...imageIds.map(id=>({id,kind:'image' as const,src:`assets/media/${id}.jpg`})),{id:'presenter-wide',kind:'video',src:'assets/media/presenter-wide.mp4',outOfRange:'hold'},{id:'presenter-editor',kind:'video',src:'assets/media/presenter-editor.mp4',outOfRange:'hold'},{id:'presenter-slide',kind:'video',src:'assets/media/presenter-slide.mp4',outOfRange:'hold'}],
 audio:[{id:'original-reference-mix',asset:'reference-audio',start:0,end:2599,sourceStart:0,sourceEnd:86.7199666667,gain:.92,shortage:'silence'}],
 markers:{designer:23,writer:47,producer:59,editor:71,storyteller:79,clickNew:125,clickVids:165,prompt:194,attachment:F(12.25),creating:F(13.2),outline:F(16.2),style:F(23.5),script:F(32),voice:F(42.95),comments:F(51.2),stock:F(57.8),record:F(65.3),presenter:F(70),play:F(76.65),googleVids:F(82.5),workspace:F(85.5)}
});
export default function Frame({frame}:{frame:number}){const t=sec(frame);return <div style={{width:'100%',height:'100%',position:'relative',overflow:'hidden',background:frame===0?'#000':'#fdfdfd',fontFamily:'Google Sans',fontWeight:400,color:'#3f4548'}}>{frame>0&&(t<9.4?<>{frame<184&&<Opening frame={frame}/>}<PlayRibbon frame={frame}/><Prompt frame={frame}/></>:t<17.8?<Generate frame={frame}/>:t<26.95?<StyleScene frame={frame}/>:t<46.2?<ScriptVoice frame={frame}/>:t<53.35?<Collaborate frame={frame}/>:t<64.3?<MediaScene frame={frame}/>:t<75.8?<RecordScene frame={frame}/>:<Finale frame={frame}/>)}</div>}
