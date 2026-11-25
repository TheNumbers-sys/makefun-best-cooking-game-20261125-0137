import { createReadStream, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, normalize, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
const root=resolve(fileURLToPath(new URL('./game',import.meta.url)));
createServer((req,res)=>{let path;try{path=decodeURIComponent(new URL(req.url??'/', 'http://localhost').pathname)}catch{res.writeHead(400).end();return}if(path.endsWith('/'))path+='index.html';const file=resolve(join(root,normalize(path)));if(file!==root&&!file.startsWith(root+sep)){res.writeHead(403).end();return}let size;try{const st=statSync(file);if(!st.isFile())throw 0;size=st.size}catch{res.writeHead(404).end();return}const ext=extname(file).toLowerCase(),types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8'};res.writeHead(200,{'content-type':types[ext]??'application/octet-stream','content-length':size,'cache-control':'no-store'});createReadStream(file).pipe(res)}).listen(8080,'127.0.0.1',()=>console.log('Sizzle & Serve on http://localhost:8080'));
