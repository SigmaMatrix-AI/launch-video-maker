#!/usr/bin/env node
import {resolve,join} from 'node:path';
import {mkdir,writeFile,readFile,rm,readdir} from 'node:fs/promises';
import {pathToFileURL} from 'node:url';
import {doctor,initProject,setup,cleanProjectCache} from './project.js';
import {startServer} from './server.js';
import {openCapture,render,inspect} from './renderer.js';
import {capturePage,analyzeAudio} from './tools.js';
import {buildReviewPack} from './review/pack.js';
import {checkReview} from './review/check.js';
import {runtimeFingerprint} from './review/files.js';
import {contentVersion} from './prepare.js';
import type {PackOptions} from './review/types.js';
import {run} from './process.js';
async function main(){
 const [command,...args]=process.argv.slice(2),project=process.cwd();
 if(!command||command==='help'){console.log('lvm doctor | init <directory> | setup | prepare | preview [--open] | still <frame> <png> | render <mp4> | inspect <mp4> | capture <url> <directory> [selectors...] | analyze-audio <file> | review-pack <directory> [--scope visual|audiovisual] [--mp4 existing.mp4] [--previous review.json] | review-check <report.json> | clean');return;}
 if(command==='doctor'){console.log(JSON.stringify(await doctor(),null,2));return;}
 if(command==='init'){if(!args[0])throw Error('init requires directory');console.log(await initProject(args[0]));return;}
 if(command==='setup'){console.log(JSON.stringify(await setup(project),null,2));return;}
 if(command==='inspect'){if(!args[0])throw Error('inspect requires MP4');console.log(JSON.stringify(await inspect(args[0]),null,2));return;}
 if(command==='capture'){if(!args[0]||!args[1])throw Error('capture requires URL and destination');console.log(JSON.stringify(await capturePage(args[0],resolve(args[1]),args.slice(2)),null,2));return;}
 if(command==='analyze-audio'){if(!args[0])throw Error('analyze-audio requires source');console.log(JSON.stringify(await analyzeAudio(args[0]),null,2));return;}
 if(command==='review-check'){
  if(args.length!==1||args[0].startsWith('--'))throw Error('review-check requires exactly one report path');
  const result=await checkReview(resolve(args[0]),{version:await contentVersion(project),runtimeHash:await runtimeFingerprint()});console.log(JSON.stringify(result,null,2));process.exitCode=result.scopeStatus==='passed'?0:result.scopeStatus==='failed'?1:2;return;
 }
 let reviewOptions:PackOptions={};
 if(command==='review-pack'){
  if(!args[0]||args[0].startsWith('--'))throw Error('review-pack requires destination');const seen=new Set<string>();
  for(let i=1;i<args.length;i+=2){const key=args[i],value=args[i+1];if(!['--scope','--mp4','--previous'].includes(key)||seen.has(key)||!value||value.startsWith('--'))throw Error('Invalid review-pack option: '+key);seen.add(key);if(key==='--scope'){if(value!=='visual'&&value!=='audiovisual')throw Error('Invalid review scope');reviewOptions.scope=value;}else if(key==='--mp4')reviewOptions.mp4=resolve(value);else reviewOptions.previous=resolve(value);}
 }
 if(command==='clean'){await cleanProjectCache(project);return;}
 if(!['prepare','preview','still','render','review-pack'].includes(command))throw Error(`Unknown command: ${command}`);
 const server=await startServer(project);let stay=false;
 try{
 if(command==='preview'){
  stay=true;const stop=()=>{server.close().finally(()=>process.exit());};process.once('SIGINT',stop);process.once('SIGTERM',stop);
  console.log(server.url);
  if(args.includes('--open')){await run(process.platform==='darwin'?'open':'xdg-open',[server.url]);}
  else console.log('Preview running in background. No browser opened. Stop with Ctrl-C.');
 }else if(command==='prepare')console.log(JSON.stringify({version:server.prepared.version,film:server.prepared.film,peak:server.prepared.peak},null,2));
 else if(command==='still'){if(!args[0]||!args[1])throw Error('still requires frame and destination');const c=await openCapture(server);try{await writeFile(resolve(args[1]),await c.frame(Number(args[0])),{flag:'wx'});}finally{await c.close();}}
 else if(command==='render'){if(!args[0])throw Error('render requires output path');const controller=new AbortController();const abort=()=>controller.abort();process.once('SIGINT',abort);process.once('SIGTERM',abort);try{console.log(JSON.stringify(await render(server,args[0],controller.signal),null,2));}finally{process.removeListener('SIGINT',abort);process.removeListener('SIGTERM',abort);}}
 else if(command==='review-pack'){const controller=new AbortController();const abort=()=>controller.abort();process.once('SIGINT',abort);process.once('SIGTERM',abort);try{console.log(JSON.stringify(await buildReviewPack(server,resolve(args[0]),{...reviewOptions,signal:controller.signal}),null,2));}finally{process.removeListener('SIGINT',abort);process.removeListener('SIGTERM',abort);}}
 }finally{if(!stay)await server.close();}
}
main().catch(e=>{console.error(String(e));process.exitCode=1;});
