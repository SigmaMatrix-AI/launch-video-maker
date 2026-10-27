export const clamp=(x:number)=>Math.min(1,Math.max(0,x));
export const smooth=(x:number)=>{const p=clamp(x);return p*p*(3-2*p);};
export const progress=(f:number,a:number,b:number)=>smooth((f-a)/(b-a));
// Source-video frame coordinates, at 30000/1001 fps.
export function track(f:number,points:readonly (readonly [number,number])[],curved=false){
 if(f<=points[0][0])return points[0][1];
 for(let i=1;i<points.length;i++)if(f<=points[i][0]){const [a,x]=points[i-1],[b,y]=points[i];const p=(f-a)/(b-a);return x+(y-x)*(curved?smooth(p):p);}
 return points[points.length-1][1];
}
