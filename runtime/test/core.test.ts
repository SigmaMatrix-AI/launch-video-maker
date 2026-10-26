import {test} from 'node:test';
import assert from 'node:assert/strict';
import * as core from '../src/core.js';
const base = {width:1920,height:1080,fps:{num:30000,den:1001},durationInFrames:60,seed:42,scenes:[{id:'one',start:0,end:30},{id:'two',start:30,end:60}],assets:[],audio:[],markers:{}};
test('frame intervals exclude end and preserve rational timing',()=>{
 const film=core.defineFilm(base);
 assert.deepEqual(core.scenesAt(film,30).map(s=>[s.id,s.localFrame]),[['two',0]]);
 assert.equal(core.secondsAt(film,30),1.001);
 assert.throws(()=>core.scenesAt(film,60),/frame/);
 assert.throws(()=>core.defineFilm({...base,fps:{num:0,den:1}}),/fps/);
});
test('motion and seeded random are independent of request order',()=>{
 assert.equal(core.interpolate(5,[0,10],[10,30]),20);
 assert.equal(core.interpolate(-5,[0,10],[10,30]),10);
 const a=core.random(42,'particle-1'); core.random(4,'other');
 assert.equal(core.random(42,'particle-1'),a);
 assert.notEqual(core.random(43,'particle-1'),a);
});
test('anchors track scene reflow and reject ambiguous references',()=>{
 assert.equal(core.resolveAnchor(base,{scene:'two',offset:2}),32);
 assert.equal(core.resolveAnchor({...base,markers:{hit:17}},{marker:'hit',offset:-1}),16);
 assert.throws(()=>core.resolveAnchor(base,{marker:'missing'}),/marker/);
});
