const { createServer } = require('http');
const { join } = require('path');
const { parse } = require('url');
const next = require('next');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    const { pathname } = parsedUrl;
    console.warn(pathname);
    if (pathname === '/sw.js' || /^\/(workbox|worker|fallback)-\w+\.js$/.test(pathname)) {
      const filePath = join(__dirname, '.next', pathname);
      console.warn(filePath);
      app.serveStatic(req, res, filePath);
    } else {
      handle(req, res, parsedUrl);
    }
  }).listen(port, err => {
    console.warn(err);
    if (err) throw err;
    console.warn(`> Server Is Running on http://localhost:${port}`);
  });
});
