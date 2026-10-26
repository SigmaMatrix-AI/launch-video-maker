#!/usr/bin/env node
import {resolve,join} from 'node:path';
import {mkdir,writeFile,readFile,rm,readdir} from 'node:fs/promises';
import {pathToFileURL} from 'node:url';
import {doctor,initProject,setup} from './project.js';
import {startServer} from './server.js';
import {openCapture,render,inspect} from './renderer.js';
import {capturePage,analyzeAudio,reviewPack,validateReview} from './tools.js';
import {run} from './process.js';
async function main(){
 const [command,...args]=process.argv.slice(2),project=process.cwd();
 if(!command||command==='help'){console.log('lvm doctor | init <directory> | setup | prepare | preview [--open] | still <frame> <png> | render <mp4> | inspect <mp4> | capture <url> <directory> [selectors...] | analyze-audio <file> | review-pack <directory> | review-check <report.json> | clean');return;}
 if(command==='doctor'){console.log(JSON.stringify(await doctor(),null,2));return;}
 if(command==='init'){if(!args[0])throw Error('init requires directory');console.log(await initProject(args[0]));return;}
 if(command==='setup'){console.log(JSON.stringify(await setup(project),null,2));return;}
 if(command==='inspect'){if(!args[0])throw Error('inspect requires MP4');console.log(JSON.stringify(await inspect(args[0]),null,2));return;}
 if(command==='capture'){if(!args[0]||!args[1])throw Error('capture requires URL and destination');console.log(JSON.stringify(await capturePage(args[0],resolve(args[1]),args.slice(2)),null,2));return;}
 if(command==='analyze-audio'){if(!args[0])throw Error('analyze-audio requires source');console.log(JSON.stringify(await analyzeAudio(args[0]),null,2));return;}
 if(command==='clean'){await rm(join(project,'.lvm'),{recursive:true,force:true});return;}
 if(!['prepare','preview','still','render','review-pack','review-check'].includes(command))throw Error(`Unknown command: ${command}`);
 const server=await startServer(project);let stay=false;
 try{
 if(command==='preview'){
  stay=true;const stop=()=>{server.close().finally(()=>process.exit());};process.once('SIGINT',stop);process.once('SIGTERM',stop);
  if(args.includes('--open')){console.log(server.url);await run(process.platform==='darwin'?'open':'xdg-open',[server.url]);}
  else console.log('Preview running in background. No browser opened. Stop with Ctrl-C.');
 }else if(command==='prepare')console.log(JSON.stringify({version:server.prepared.version,film:server.prepared.film,peak:server.prepared.peak},null,2));
 else if(command==='still'){if(!args[0]||!args[1])throw Error('still requires frame and destination');const c=await openCapture(server);try{await writeFile(resolve(args[1]),await c.frame(Number(args[0])),{flag:'wx'});}finally{await c.close();}}
 else if(command==='render'){if(!args[0])throw Error('render requires output path');const controller=new AbortController();const abort=()=>controller.abort();process.once('SIGINT',abort);process.once('SIGTERM',abort);try{console.log(JSON.stringify(await render(server,args[0],controller.signal),null,2));}finally{process.removeListener('SIGINT',abort);process.removeListener('SIGTERM',abort);}}
 else if(command==='review-pack'){if(!args[0])throw Error('review-pack requires destination outside project sources (use .lvm/review)');console.log(JSON.stringify(await reviewPack(server,resolve(args[0])),null,2));}
 else if(command==='review-check'){if(!args[0])throw Error('review-check requires report');const result=validateReview(JSON.parse(await readFile(args[0],'utf8')),server.prepared.version);console.log(JSON.stringify(result,null,2));if(result.status!=='passed')process.exitCode=1;}
 }finally{if(!stay)await server.close();}
}
main().catch(e=>{console.error(String(e));process.exitCode=1;});
