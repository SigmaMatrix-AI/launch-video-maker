import {access,mkdir,readFile,writeFile,rename,rm} from 'node:fs/promises';
import {dirname,join,resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {run} from './process.js';
import {createRequire} from 'node:module';
import {chromium} from 'playwright';
export const packageRoot=resolve(dirname(fileURLToPath(import.meta.url)),'../..');
export async function doctor(){
 const result:Record<string,string>={node:process.version,platform:`${process.platform}/${process.arch}`};
 for(const command of ['ffmpeg','ffprobe']){try{result[command]=(await run(command,['-version'])).toString().split('\n')[0];}catch(e){result[command]=`MISSING: ${String(e)}`;}}
 const pkg=JSON.parse(await readFile(join(packageRoot,'package.json'),'utf8'));result.runtime=pkg.version;result.playwright=pkg.dependencies.playwright;
 const require=createRequire(import.meta.url);const browserMetadata=JSON.parse(await readFile(join(dirname(require.resolve('playwright-core/package.json')),'browsers.json'),'utf8')).browsers.find((b:{name:string})=>b.name==='chromium');result.chromiumRevision=browserMetadata.revision;result.chromiumVersion=browserMetadata.browserVersion;result.chromiumExecutable=chromium.executablePath();try{await access(result.chromiumExecutable);result.browserInstalled='yes';}catch{result.browserInstalled='no';}
 return result;
}
export async function initProject(target:string){
 const dest=resolve(target);try{await access(dest);throw Error(`Project exists: ${dest}`);}catch(e){if((e as NodeJS.ErrnoException).code!=='ENOENT')throw e;}
 await mkdir(dirname(dest),{recursive:true});const staging=dest+`.init-${process.pid}`;await mkdir(staging);
 try{
  for(const dir of ['vendor','assets','brand-kit','records'])await mkdir(join(staging,dir));
  const packed=JSON.parse((await run('npm',['pack','--json','--ignore-scripts','--pack-destination',join(staging,'vendor')],{cwd:packageRoot})).toString())[0].filename;
  const dependencies=JSON.parse(await readFile(join(packageRoot,'package.json'),'utf8')).dependencies;
  await writeFile(join(staging,'package.json'),JSON.stringify({name:'launch-film',version:'1.0.0',private:true,type:'module',scripts:{setup:'lvm setup',prepare:'lvm prepare',preview:'lvm preview',render:'lvm render',still:'lvm still',inspect:'lvm inspect'},dependencies:{'@launch-video-maker/runtime':`file:vendor/${packed}`,react:dependencies.react,'react-dom':dependencies['react-dom']}},null,2)+'\n');
  await writeFile(join(staging,'film.tsx'),`import React from 'react';\nimport {defineFilm} from '@launch-video-maker/runtime';\nexport const film=defineFilm({width:1920,height:1080,fps:{num:30,den:1},durationInFrames:90,seed:1,scenes:[{id:'opening',start:0,end:90}],assets:[],audio:[],markers:{}});\nexport default function Frame({frame}:{frame:number}){return <div style={{width:'100%',height:'100%',background:'#111',color:'white',display:'grid',placeItems:'center',fontFamily:'sans-serif',fontSize:64}}>Replace with your product scene · {frame}</div>;}\n`);
  await writeFile(join(staging,'brand-kit','sources.json'),JSON.stringify({assets:[],explicitRules:[],inferences:[]},null,2)+'\n');
  for(const name of ['brief','direction','storyboard'])await writeFile(join(staging,'records',name+'.md'),`# ${name}\n\nPending product evidence and production decisions.\n`);
  await writeFile(join(staging,'.gitignore'),'node_modules/\n.lvm/\nexports/\n');
  await writeFile(join(staging,'README.md'),'# Film project\n\nRun `npm install`, then `npm run setup`. Use `npm run preview -- --open` only when preview is requested. Explicit `npm run render -- output.mp4` exports. `film.tsx` exports `film` and a React Frame component. Keep assets and brand-kit local. Runtime snapshot is in vendor/.\n');
  await run('npm',['install','--package-lock-only','--ignore-scripts','--no-audit','--no-fund'],{cwd:staging});
  await rename(staging,dest);return dest;
 }catch(e){await rm(staging,{recursive:true,force:true});throw e;}
}
export async function setup(project:string){
 let tools=await doctor();if(['ffmpeg','ffprobe'].some(k=>tools[k].startsWith('MISSING')))throw Error('Install FFmpeg + ffprobe before setup');
 await run('npm',['ci','--no-audit','--no-fund'],{cwd:project});
 await run(process.execPath,[browserInstaller(),'install','chromium'],{cwd:project});
 tools=await doctor();await mkdir(join(project,'.lvm'),{recursive:true});await writeFile(join(project,'.lvm','tools.json'),JSON.stringify(tools,null,2));return tools;
}

export function browserInstaller(){const require=createRequire(import.meta.url);return join(dirname(require.resolve('playwright/package.json')),'cli.js');}
