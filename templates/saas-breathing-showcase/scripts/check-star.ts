import assert from 'node:assert/strict';
import {transitionShape} from '../src/star-trajectory.ts';
const keys=[25.8,26,26.3,26.5,26.7,26.9,27.1,27.3,27.5,27.7,27.9,28.1,28.3,28.5,29];
for(const t of keys){
 const h=1e-5,a=transitionShape(t-h),b=transitionShape(t),c=transitionShape(t+h);
 for(const k of ['x','y','size','rotation'] as const){
  assert.ok(Number.isFinite(b[k]));
  assert.ok(Math.abs((b[k]-a[k])/h-(c[k]-b[k])/h)<2,`velocity discontinuity: ${t} ${k}`);
 }
}
for(let i=775;i<930;i++){
 const a=transitionShape(i/30),b=transitionShape((i+1)/30);
 assert.ok(b.size<=a.size+1e-6,'shrink must not rebound');
 assert.ok(b.rotation>=a.rotation-1e-6,'rotation must not reverse');
 assert.ok(Math.abs(b.x-a.x)<10,'translation jump');
}
assert.deepEqual(transitionShape(29),transitionShape(31));
console.log('Star continuity, monotonic shrink/spin, translation and final hold passed');
