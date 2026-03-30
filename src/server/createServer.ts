import http, { IncomingMessage, ServerResponse } from 'http';
import fetch from 'node-fetch';
import { getCache, setCache } from '../cache/cacheStore';

export const createServer = (port: number, origin: string) => {
  const server = http.createServer(async (req: IncomingMessage, res: ServerResponse) => {
    if (!req.url) {
      res.statusCode = 400;
      res.end('Bad Request');
      return;
    }

    const url = `${origin}${req.url}`;
    const cacheEntry = getCache(url);

    if (cacheEntry) {
      console.log('Cache hit:', url);
      res.writeHead(cacheEntry.statusCode, cacheEntry.headers);
      res.end(cacheEntry.body);
      return;
    }

    console.log('Cache miss:', url);

    try {
      const response = await fetch(url);
      const body = Buffer.from(await response.arrayBuffer());
      const headers: Record<string, any> = {};

      response.headers.forEach((value, key) => {
        headers[key] = value;
      });

      if (response.ok) {
        setCache(url, {
          statusCode: response.status,
          headers,
          body,
        });
      }

      res.writeHead(response.status, headers);
      res.end(body);
    } catch (error) {
      console.error('Proxy error:', error);
      res.statusCode = 500;
      res.end('Internal Server Error');
    }
  });

  server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};