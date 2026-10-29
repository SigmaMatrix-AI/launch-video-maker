import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {stripTypeScriptTypes} from 'node:module';
const file=new URL('../src/ShowcaseMotion.ts',import.meta.url);
const source=(await readFile(file,'utf8')).replace("'./motion'",JSON.stringify(new URL('../src/motion.ts',import.meta.url).href));
const {analyticsPose,dashboardPose,orbitPose,galleryPose}=await import('data:text/javascript;base64,'+Buffer.from(stripTypeScriptTypes(source)).toString('base64'));
for(const [fn,keys] of [[analyticsPose,[6.15,7.1,8.15,10.8,11.85,14,14.8]],[dashboardPose,[14.8,16.05,17.25,17.85,18.9]],[galleryPose,[18.9,19.7,20.35,21.4]]]){
 for(const t of keys){const h=1e-5,a=fn(t-h),b=fn(t),c=fn(t+h);for(const k of ['x','y','w','rx','rz']){assert.ok(Number.isFinite(b[k]));assert.ok(Math.abs((b[k]-a[k])/h-(c[k]-b[k])/h)<1,`Velocity jump at ${t} ${k}`);}}
}
assert.deepEqual(dashboardPose(17.25),orbitPose(17.25,0));
assert.deepEqual(galleryPose(18.9),orbitPose(18.9,1));
let previous=dashboardPose(16.05).w;for(let f=482;f<=517;f++){const w=dashboardPose(f/30).w;assert.ok(w<=previous+.0001);previous=w;}
console.log('Continuous pose/velocity joins and shrinking orbit handoff passed');
