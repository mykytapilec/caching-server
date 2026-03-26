import { port, origin } from './cli';
import { createServer } from './server/createServer';

console.log(`Starting proxy server...`);
console.log(`Origin: ${origin}`);

createServer(port);