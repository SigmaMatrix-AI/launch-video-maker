export const clamp=(v:number)=>Math.max(0,Math.min(1,v));
export const smooth=(v:number)=>{const t=clamp(v);return t*t*t*(10+t*(-15+6*t));};
export const ramp=(t:number,a:number,b:number)=>clamp((t-a)/(b-a));
export const ease=(t:number,a:number,b:number)=>smooth((t-a)/(b-a));
// Measured source poses, in seconds and 960x540 pixels. Do not normalize each
// chapter: the original montage continues moving across chapter boundaries.
export function sample(rows:number[][],t:number):number[]{
 const i=rows.findIndex(r=>r[0]>=t);
 if(i<0)return rows.at(-1)!.slice(1);if(i===0)return rows[0].slice(1);
 const a=rows[i-1],b=rows[i],k=(t-a[0])/(b[0]-a[0]);return a.slice(1).map((v,j)=>v+(b[j+1]-v)*k);
}
// Project a complete rectangular media surface to the measured four corners.
export function homography(q:number[]):string{
 const src=[[0,0],[960,0],[960,540],[0,540]],a:number[][]=[];
 for(let i=0;i<4;i++){const [x,y]=src[i],u=q[i*2],v=q[i*2+1];a.push([x,y,1,0,0,0,-u*x,-u*y,u],[0,0,0,x,y,1,-v*x,-v*y,v]);}
 for(let k=0;k<8;k++){
  let m=k;for(let j=k+1;j<8;j++)if(Math.abs(a[j][k])>Math.abs(a[m][k]))m=j;
  [a[k],a[m]]=[a[m],a[k]];const d=a[k][k];if(Math.abs(d)<1e-10)throw Error('Degenerate card geometry');
  for(let j=k;j<9;j++)a[k][j]/=d;
  for(let i=0;i<8;i++)if(i!==k){const z=a[i][k];for(let j=k;j<9;j++)a[i][j]-=z*a[k][j];}
 }
 const h=a.map(r=>r[8]);return `matrix3d(${[h[0],h[3],0,h[6],h[1],h[4],0,h[7],0,0,1,0,h[2],h[5],0,1].join(',')})`;
}
