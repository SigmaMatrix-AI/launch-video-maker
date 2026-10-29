import {test} from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,readFile,access,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {initProject,doctor} from '../src/project.js';
test('init vendors runtime and refuses to overwrite existing project',async()=>{
 const parent=await mkdtemp(join(tmpdir(),'lvm-init-'));const dir=join(parent,'film');
 try{
  await initProject(dir);
  const pkg=JSON.parse(await readFile(join(dir,'package.json'),'utf8'));
  assert.match(pkg.dependencies['@launch-video-maker/runtime'],/^file:vendor\//);
  await access(join(dir,'brand-kit','sources.json'));await access(join(dir,'film.tsx'));
  await assert.rejects(initProject(dir),/exists/);
  const report=await doctor();assert.ok(report.node);assert.ok(report.ffmpeg);assert.ok(report.ffprobe);
 }finally{await rm(parent,{recursive:true,force:true});}
});
