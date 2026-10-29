export function selectVideoFrame(pts:number[],time:number,duration:number,policy:'hold'|'loop'|'error'){
 if(!pts.length||!Number.isFinite(time)||!Number.isFinite(duration)||duration<=0)throw Error('Invalid video timeline');
 if(time<0||time>=duration){if(policy==='error')throw Error(`Video out of range: ${time}`);time=policy==='loop'?((time%duration)+duration)%duration:Math.max(0,Math.min(duration-Number.EPSILON,time));}
 const origin=pts[0];let lo=0,hi=pts.length;
 while(lo<hi){const m=(lo+hi)>>>1;if(pts[m]-origin<=time+1e-9)lo=m+1;else hi=m;}
 return Math.max(0,lo-1);
}
