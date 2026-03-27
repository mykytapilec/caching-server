import http from 'http';
import https from 'https';
import { URL } from 'url';

export const proxyRequest = (
  req: http.IncomingMessage,
  res: http.ServerResponse,
  origin: string
) => {
  try {
    const targetUrl = new URL(req.url || '', origin);
    const lib = targetUrl.protocol === 'https:' ? https : http;

    const options: http.RequestOptions = {
      method: req.method,
      headers: {
        ...req.headers,
        host: targetUrl.host, // очень важно!
      },
    };

    const proxyReq = lib.request(targetUrl, options, (proxyRes) => {
      res.writeHead(proxyRes.statusCode || 500, proxyRes.headers);
      proxyRes.pipe(res, { end: true });
    });

    proxyReq.on('error', (err) => {
      console.error('Proxy request error:', err.message);
      res.writeHead(500);
      res.end('Proxy error');
    });

    if (req.method !== 'GET' && req.method !== 'HEAD') {
      req.pipe(proxyReq, { end: true });
    } else {
      proxyReq.end();
    }
  } catch (err: any) {
    console.error('Proxy error:', err.message);
    res.writeHead(500);
    res.end('Proxy error');
  }
};