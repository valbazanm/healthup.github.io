const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;

const mime = {
  '.html': 'text/html; charset=utf-8',
  '.css':  'text/css; charset=utf-8',
  '.js':   'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.svg':  'image/svg+xml',
  '.ico':  'image/x-icon',
  '.txt':  'text/plain; charset=utf-8'
};

http.createServer((req, res) => {
  const safePath = path.normalize(decodeURI(req.url)).replace(/^(\.\.[\/\\])+/, '');
  let filePath = path.join(__dirname, safePath);
  if (req.url === '/' || req.url === '') filePath = path.join(__dirname, 'index.html');

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('404 - Not found');
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    const type = mime[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': type });
    fs.createReadStream(filePath).pipe(res);
  });
}).listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));
