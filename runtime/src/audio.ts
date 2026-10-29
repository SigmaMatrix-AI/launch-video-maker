import {resolveAnchor,secondsAt,interpolate,type Film} from './core.js';
export const sampleRate=48000;
export function mixPCM(film:Film,sources:Map<string,Float32Array>){
 const samples=new Float32Array(Math.round(secondsAt(film,film.durationInFrames)*sampleRate)*2);
 for(const e of film.audio){
  const source=sources.get(e.asset);if(!source)throw Error(`Missing audio ${e.asset}`);
  const start=resolveAnchor(film,e.start),end=resolveAnchor(film,e.end),speed=e.speed??1,gain=e.gain??1;
  if(!Number.isInteger(start)||!Number.isInteger(end)||start<0||end<=start||end>film.durationInFrames||!Number.isFinite(speed)||speed<=0||!Number.isFinite(gain)||gain<0)throw Error(`Invalid audio event ${e.id}`);
  const length=end-start,fi=e.fadeIn??0,fo=e.fadeOut??0;
  if(!Number.isFinite(fi)||!Number.isFinite(fo)||fi<0||fo<0||fi+fo>length)throw Error(`Invalid fades ${e.id}`);
  const env=e.envelope??[[0,1],[length,1]];
  if(env.length<2||env.some(([f,g],i)=>!Number.isFinite(f)||!Number.isFinite(g)||f<0||f>length||g<0||(i>0&&f<=env[i-1][0])))throw Error(`Invalid envelope ${e.id}`);
  const lo=Math.round((e.sourceStart??0)*sampleRate),hi=Math.round((e.sourceEnd??source.length/2/sampleRate)*sampleRate);
  if(!Number.isSafeInteger(lo)||!Number.isSafeInteger(hi)||lo<0||hi<=lo||hi>source.length/2)throw Error(`Invalid source trim ${e.id}`);
  const a=Math.round(secondsAt(film,start)*sampleRate),b=Math.round(secondsAt(film,end)*sampleRate);
  if((b-a)*speed>hi-lo+1&&!e.loop&&e.shortage!=='silence')throw Error(`Audio too short: ${e.id}; choose loop or shortage: silence`);
  for(let i=a;i<b;i++){
   let pos=(i-a)*speed;if(e.loop)pos%=hi-lo;else if(pos>=hi-lo)continue;
   const j=Math.floor(pos)+lo,k=j+1<hi?j+1:e.loop?lo:j,t=pos-Math.floor(pos);
   const frame=(i-a)/sampleRate*film.fps.num/film.fps.den;
   const level=gain*interpolate(frame,env.map(x=>x[0]),env.map(x=>x[1]))*(fi?Math.min(1,frame/fi):1)*(fo?Math.min(1,(length-frame)/fo):1);
   for(let c=0;c<2;c++)samples[i*2+c]+=((1-t)*source[j*2+c]+t*source[k*2+c])*level;
  }
 }
 let peak=0;for(const x of samples){if(!Number.isFinite(x))throw Error('Nonfinite audio');peak=Math.max(peak,Math.abs(x));}
 if(peak>1)throw Error(`Audio clipping: peak ${peak}; reduce explicit event gain`);
 return {samples,peak,sampleRate,channels:2};
}
export function wavPCM(samples:Float32Array){
 const data=Buffer.alloc(44+samples.length*4);
 data.write('RIFF');data.writeUInt32LE(data.length-8,4);data.write('WAVEfmt ',8);data.writeUInt32LE(16,16);data.writeUInt16LE(3,20);data.writeUInt16LE(2,22);data.writeUInt32LE(sampleRate,24);data.writeUInt32LE(sampleRate*8,28);data.writeUInt16LE(8,32);data.writeUInt16LE(32,34);data.write('data',36);data.writeUInt32LE(samples.length*4,40);
 for(let i=0;i<samples.length;i++)data.writeFloatLE(samples[i],44+i*4);return data;
}
