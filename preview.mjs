import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const port = 8080;
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.png': 'image/png' };

http.createServer((request, response) => {
  const pathname = decodeURIComponent(new URL(request.url, `http://${request.headers.host}`).pathname);
  const file = path.resolve(root, `.${pathname === '/' ? '/index.html' : pathname}`);
  if (!file.startsWith(root)) return response.writeHead(403).end('Forbidden');
  fs.stat(file, (error, stats) => {
    if (error || !stats.isFile()) return response.writeHead(404).end('Not found');
    response.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream' });
    fs.createReadStream(file).pipe(response);
  });
}).listen(port, '127.0.0.1', () => {
  console.log(`A Little Book for Masha is ready at http://127.0.0.1:${port}`);
  console.log('Keep this window open while reading. Press Ctrl+C to stop.');
});
