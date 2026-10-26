import {test} from 'node:test';import assert from 'node:assert/strict';import {mkdtemp,rename,rm,readFile,writeFile} from 'node:fs/promises';import {tmpdir} from 'node:os';import {join} from 'node:path';import {initProject} from '../src/project.js';import {run} from '../src/process.js';
test('moved project installs its vendored runtime and captures without source checkout',async()=>{
 const parent=await mkdtemp(join(tmpdir(),'lvm-move-'));const original=join(parent,'original'),moved=join(parent,'moved');
 try{
 await initProject(original);await rename(original,moved);await run('npm',['ci','--no-audit','--no-fund'],{cwd:moved});
 const src=await readFile(join(moved,'film.tsx'),'utf8');await writeFile(join(moved,'film.tsx'),src.replace('width:1920,height:1080','width:320,height:180'));
 await run('npm',['run','still','--','0',join(parent,'frame.png')],{cwd:moved});assert.ok((await readFile(join(parent,'frame.png'))).length>100);
 const pkg=JSON.parse(await readFile(join(moved,'package-lock.json'),'utf8'));assert.ok(pkg.packages['node_modules/@launch-video-maker/runtime'].resolved.startsWith('file:vendor/'));
 }finally{await rm(parent,{recursive:true,force:true});}
});
