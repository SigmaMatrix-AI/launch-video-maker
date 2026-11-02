import {test} from 'node:test';import assert from 'node:assert/strict';import {mkdtemp,rename,rm,readFile,writeFile,realpath} from 'node:fs/promises';import {tmpdir} from 'node:os';import {join} from 'node:path';import {initProject} from '../src/project.js';import {run} from '../src/process.js';import {verifyEvidence} from '../src/review/files.js';
import {startServer} from '../src/server.js';import {openCapture} from '../src/renderer.js';
test('blank project installs, captures and collects review evidence after moving',async()=>{
 const parent=await mkdtemp(join(tmpdir(),'lvm-move-'));const original=join(parent,'original'),moved=join(parent,'moved');
 let server:any,capture:any;
 try{
 await initProject(original);await rename(original,moved);await run('npm',['ci','--no-audit','--no-fund'],{cwd:moved});
 const src=await readFile(join(moved,'film.tsx'),'utf8');await writeFile(join(moved,'film.tsx'),src.replace('width:1920,height:1080','width:320,height:180'));
 server=await startServer(moved);capture=await openCapture(server);
 assert.equal(await capture.page.locator('#stage').innerText(),'','A new project must not prescribe product copy or a designed scene');
 assert.deepEqual(server.prepared.film.scenes,[]);
 const first=await capture.frame(0);assert.deepEqual(await capture.frame(89),first);
 await capture.close();capture=undefined;await server.close();server=undefined;
 await run('npm',['run','still','--','0',join(parent,'frame.png')],{cwd:moved});assert.ok((await readFile(join(parent,'frame.png'))).length>100);
 const pkg=JSON.parse(await readFile(join(moved,'package-lock.json'),'utf8'));assert.ok(pkg.packages['node_modules/@launch-video-maker/runtime'].resolved.startsWith('file:vendor/'));
 const cli=join(moved,'node_modules/@launch-video-maker/runtime/runtime/dist/cli.js');const bundle=JSON.parse((await run(process.execPath,[cli,'review-pack','.lvm/review'],{cwd:moved})).toString());const manifest=JSON.parse(await readFile(bundle.manifestPath,'utf8'));assert.deepEqual(await verifyEvidence(bundle.directory,manifest.files),[]);assert.equal(manifest.target.kind,'preview');assert.ok(bundle.directory.startsWith(await realpath(moved)));assert.equal((await readFile(bundle.reportPath,'utf8')).includes('synthetic-reviewer'),false);
 }finally{await capture?.close();await server?.close();await rm(parent,{recursive:true,force:true});}
});
