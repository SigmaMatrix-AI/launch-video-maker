// One analytic silhouette throughout the aperture and brand resolve.
export const star='M 0 -1 C .13 -.24 .24 -.13 1 0 C .24 .13 .13 .24 0 1 C -.13 .24 -.24 .13 -1 0 C -.24 -.13 -.13 -.24 0 -1 Z';
// Original timing anchors; rotation is unwrapped so crossing a star arm never reverses spin.
const poses=[
 [25.8,480,270,2800,-40],[26,480,270,1800,-30],
 [26.3,480,270,680,0],[26.5,480,270,540,22],
 [26.7,478,270,300,42],[26.9,475,270,225,56],
 [27.1,465,270,161,79],[27.3,445,270,131,106],
 [27.5,404,270,103,162],[27.7,361,270,91,221],
 [27.9,339,270,84,247],[28.1,328,270,81,263],
 [28.3,323,270,79,269],[28.5,321,270,78,270],
 [29,320.5,270,78,270]
];
// Monotone cubic Hermite interpolation: C1 velocity without overshooting size or angle.
const times=poses.map(p=>p[0]);
const curves=[1,2,3,4].map(column=>{
 const values=poses.map(p=>p[column]);
 const deltas=values.slice(1).map((v,i)=>(v-values[i])/(times[i+1]-times[i]));
 const slopes=values.map((_,i)=>{
  if(i===0||i===values.length-1)return 0;
  const a=deltas[i-1],b=deltas[i];if(a*b<=0)return 0;
  const h0=times[i]-times[i-1],h1=times[i+1]-times[i];
  const w0=2*h1+h0,w1=h1+2*h0;return (w0+w1)/(w0/a+w1/b);
 });return {values,slopes};
});
export function transitionShape(t:number){
 let i=times.findIndex(x=>x>=t);if(i<0)i=times.length-1;
 const v=curves.map(({values,slopes})=>{
  if(t<=times[0])return values[0];if(t>=times.at(-1)!)return values.at(-1)!;
  const h=times[i]-times[i-1],u=(t-times[i-1])/h;
  return (2*u**3-3*u*u+1)*values[i-1]+(u**3-2*u*u+u)*h*slopes[i-1]+(-2*u**3+3*u*u)*values[i]+(u**3-u*u)*h*slopes[i];
 });return {x:v[0],y:v[1],size:v[2],rotation:v[3]};
}
export function starTransform(t:number){const p=transitionShape(t);return `translate(${p.x} ${p.y}) rotate(${p.rotation}) scale(${p.size/2})`;}
