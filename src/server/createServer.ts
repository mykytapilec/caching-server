import http from 'http';
import { proxyRequest } from '../proxy/proxyRequest';

export const createServer = (port: number, origin: string) => {
  const server = http.createServer((req, res) => {
    proxyRequest(req, res, origin);
  });

  server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};