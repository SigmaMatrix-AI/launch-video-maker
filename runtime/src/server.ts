import {createServer} from 'vite';
import {join,resolve,dirname,extname} from 'node:path';
import {createReadStream} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {contentVersion,prepare,type Prepared} from './prepare.js';
import {packageRoot} from './project.js';
export async function startServer(project:string){
 project=resolve(project);let prepared:Prepared|undefined;let changed=false;
 const server=await createServer({configFile:false,root:join(packageRoot,'runtime/web'),publicDir:false,logLevel:'error',cacheDir:join(project,'.lvm/vite'),
  resolve:{alias:{'@launch-video-maker/runtime/react':join(packageRoot,'runtime/dist/react.js'),'@launch-video-maker/runtime':join(packageRoot,'runtime/dist/core.js'),'@film':join(project,'film.tsx'),'@lvm-core':join(packageRoot,'runtime/dist/core.js'),'@lvm-react':join(packageRoot,'runtime/dist/react.js')},dedupe:['react','react-dom']},
  server:{host:'127.0.0.1',port:0,hmr:false,fs:{allow:[project,packageRoot]},watch:{ignored:['**/.lvm/**','**/node_modules/**']}},
  plugins:[{name:'lvm',configureServer(s){s.middlewares.use(async(req,res,next)=>{
   const url=new URL(req.url??'/', 'http://localhost');if(!url.pathname.startsWith('/__lvm/'))return next();
   try{
    if(!prepared)throw Error('Project preparing');
    if(url.pathname==='/__lvm/version'){res.setHeader('Content-Type','application/json');res.end(JSON.stringify({version:changed?'changed':await contentVersion(project)}));return;}
    if(url.pathname==='/__lvm/manifest'){
     const manifest={...prepared,cache:undefined,assets:Object.fromEntries(Object.keys(prepared.assets).map(id=>[id,`/__lvm/asset/${id}`])),videos:Object.fromEntries(Object.entries(prepared.videos).map(([id,v])=>[id,{...v,files:v.files.map((_,i)=>`/__lvm/video/${id}/${i}?v=${prepared!.version}`)}]))};
     res.setHeader('Content-Type','application/json');res.end(JSON.stringify(manifest));return;
    }
    let file:string|undefined;const parts=url.pathname.split('/');
    if(parts[2]==='asset')file=prepared.assets[parts[3]];
    if(parts[2]==='video')file=prepared.videos[parts[3]]?.files[Number(parts[4])];
    if(parts[2]==='mix'){file=join(prepared.cache,'mix.wav');res.setHeader('Content-Type','audio/wav');}
    if(!file){res.statusCode=404;res.end('Unknown asset');return;}
    const mime:Record<string,string>={'.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.gif':'image/gif','.webp':'image/webp','.avif':'image/avif','.woff2':'font/woff2','.woff':'font/woff','.ttf':'font/ttf','.wav':'audio/wav'};res.setHeader('Content-Type',mime[extname(file).toLowerCase()]??'application/octet-stream');res.setHeader('Cache-Control',parts[2]==='video'&&url.searchParams.get('v')===prepared.version?'private, max-age=31536000, immutable':'no-store');createReadStream(file).on('error',e=>{res.statusCode=500;res.end(String(e));}).pipe(res);
   }catch(e){res.statusCode=500;res.end(String(e));}
  });}}]});
 try{
  const module=await server.ssrLoadModule(join(project,'film.tsx'));prepared=await prepare(project,module.film);
  await server.listen();const address=server.httpServer!.address() as {port:number};
  server.watcher.add(project);server.watcher.on('change',p=>{if(!p.includes('/.lvm/')&&!p.includes('/records/')&&!/\.(mp4|png|wav)$/.test(p))changed=true;});
  return {url:`http://127.0.0.1:${address.port}`,prepared,project,assertVersion:async()=>{if(changed||await contentVersion(project)!==prepared!.version)throw Error('Content version changed; prepare again');},close:()=>server.close()};
 }catch(e){await server.close();throw e;}
}
export type FilmServer=Awaited<ReturnType<typeof startServer>>;
