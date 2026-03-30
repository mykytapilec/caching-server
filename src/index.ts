import { program } from 'commander';
import { createServer } from './server/createServer';
import { cache } from './cache/cacheStore';

program
  .option('-p, --port <number>', 'Port to run the proxy', '3000')
  .option('--origin <url>', 'Origin server URL', 'https://dummyjson.com')
  .option('--clear-cache', 'Clear the cache and exit');

program.parse(process.argv);

const options = program.opts();
const port = Number(options.port);
const origin = options.origin;

if (options.clearCache) {
  console.log('🧹 Clearing cache...');
  cache.clear();
  console.log('✅ Cache cleared!');
  process.exit(0);
}

console.log(`Starting proxy server...`);
console.log(`Origin: ${origin}`);

createServer(port, origin);