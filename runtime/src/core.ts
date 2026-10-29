export type Rate = {num:number; den:number};
export type Anchor = number | {scene?:string; marker?:string; offset?:number};
export type Asset = {id:string; src:string; kind:'image'|'font'|'video'|'audio'; family?:string; outOfRange?:'hold'|'loop'|'error'};
export type Scene = {id:string; start:number; end:number};
export type AudioEvent = {id:string; asset:string; start:Anchor; end:Anchor; sourceStart?:number; sourceEnd?:number; speed?:number; gain?:number; fadeIn?:number; fadeOut?:number; envelope?:[number,number][]; loop?:boolean; shortage?:'silence'|'error'};
export type Film = {width:number;height:number;fps:Rate;durationInFrames:number;seed:number;scenes:Scene[];assets:Asset[];audio:AudioEvent[];markers:Record<string,number>};
export const secondsAt=(film:Pick<Film,'fps'>,frame:number)=>frame*film.fps.den/film.fps.num;
export function assertFrame(film:Film,frame:number){if(!Number.isSafeInteger(frame)||frame<0||frame>=film.durationInFrames)throw Error(`Invalid frame ${frame}`);}
export function defineFilm(film:Film):Film{
 for(const k of ['width','height','durationInFrames'] as const)if(!Number.isSafeInteger(film[k])||film[k]<=0)throw Error(`Invalid ${k}`);
 if(!Number.isSafeInteger(film.fps.num)||!Number.isSafeInteger(film.fps.den)||film.fps.num<=0||film.fps.den<=0)throw Error('Invalid fps');
 if(!Number.isSafeInteger(film.seed))throw Error('Invalid seed');
 for(const list of [film.scenes,film.assets,film.audio])if(new Set(list.map(x=>x.id)).size!==list.length)throw Error('Duplicate id');
 for(const s of film.scenes)if(!Number.isInteger(s.start)||!Number.isInteger(s.end)||s.start<0||s.end<=s.start||s.end>film.durationInFrames)throw Error(`Invalid scene ${s.id}`);
 for(const [id,f] of Object.entries(film.markers)){assertFrame(film,f);if(!id)throw Error('Empty marker');}
 return film;
}
export function scenesAt(film:Film,frame:number){assertFrame(film,frame);return film.scenes.filter(s=>frame>=s.start&&frame<s.end).map(s=>({...s,localFrame:frame-s.start}));}
export function resolveAnchor(film:Pick<Film,'scenes'|'markers'>,anchor:Anchor):number{
 if(typeof anchor==='number')return anchor;
 if(Boolean(anchor.scene)===Boolean(anchor.marker))throw Error('Anchor requires one scene or marker');
 const value=anchor.scene?film.scenes.find(s=>s.id===anchor.scene)?.start:film.markers[anchor.marker!];
 if(value===undefined)throw Error(`Unknown anchor scene/marker ${anchor.scene??anchor.marker}`);
 return value+(anchor.offset??0);
}
export function interpolate(value:number,input:number[],output:number[]){
 if(input.length!==output.length||input.length<2||input.some((v,i)=>!Number.isFinite(v)||(i>0&&v<=input[i-1]))||output.some(v=>!Number.isFinite(v)))throw Error('Invalid interpolation');
 if(value<=input[0])return output[0];
 for(let i=1;i<input.length;i++)if(value<=input[i])return output[i-1]+(output[i]-output[i-1])*(value-input[i-1])/(input[i]-input[i-1]);
 return output.at(-1)!;
}
export const ease=(t:number)=>{const x=Math.max(0,Math.min(1,t));return x*x*(3-2*x);};
export function random(seed:number,key:string){let h=seed>>>0;for(const c of key){h=Math.imul(h^c.charCodeAt(0),16777619)>>>0;}h^=h>>>16;h=Math.imul(h,2246822507);h^=h>>>13;return (h>>>0)/4294967296;}
