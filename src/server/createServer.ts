import http from 'http';

export const createServer = (port: number) => {
  const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Proxy server is running');
  });

  server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};