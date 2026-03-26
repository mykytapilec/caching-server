const args = process.argv.slice(2);

let port = 3000;
let origin = '';

for (let i = 0; i < args.length; i++) {
  if (args[i] === '--port') {
    port = Number(args[i + 1]);
  }

  if (args[i] === '--origin') {
    origin = args[i + 1];
  }
}

if (!origin) {
  console.error('Error: --origin is required');
  process.exit(1);
}

export { port, origin };