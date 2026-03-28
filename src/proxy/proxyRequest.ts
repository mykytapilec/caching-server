import http from 'http';
import https from 'https';
import { URL } from 'url';
import { getCache, setCache } from '../cache/cacheStore';

export const proxyRequest = (
  req: http.IncomingMessage,
  res: http.ServerResponse,
  origin: string
) => {
  const cacheKey = `${req.method}:${req.url}`;

  const cached = getCache(cacheKey);
  if (cached) {
    res.writeHead(cached.statusCode, {
      ...cached.headers,
      'X-Cache': 'HIT',
    });
    res.end(cached.body);
    return;
  }

  try {
    const targetUrl = new URL(req.url || '', origin);
    const lib = targetUrl.protocol === 'https:' ? https : http;

    const options: http.RequestOptions = {
      method: req.method,
      headers: {
        ...req.headers,
        host: targetUrl.host,
      },
    };

    const proxyReq = lib.request(targetUrl, options, (proxyRes) => {
      const chunks: Buffer[] = [];

      proxyRes.on('data', (chunk) => {
        chunks.push(chunk);
      });

      proxyRes.on('end', () => {
        const body = Buffer.concat(chunks);

        if (req.method === 'GET') {
          setCache(cacheKey, {
            statusCode: proxyRes.statusCode || 200,
            headers: proxyRes.headers,
            body,
          });
        }

        res.writeHead(proxyRes.statusCode || 500, {
          ...proxyRes.headers,
          'X-Cache': 'MISS',
        });

        res.end(body);
      });
    });

    proxyReq.on('error', (err) => {
      console.error('Proxy error:', err.message);
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