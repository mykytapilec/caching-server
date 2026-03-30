const port = Number(process.env.PORT) || 3000;
const origin = process.env.ORIGIN || '';

if (!origin) {
  console.error('Error: ORIGIN environment variable is required');
  process.exit(1);
}

export { port, origin };