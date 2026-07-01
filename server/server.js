import app from './app.js';

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  process.stdout.write(`[SprintBoard] Server running on port ${PORT}\n`);
});

process.on('unhandledRejection', (err) => {
  process.stderr.write(`Unhandled Rejection: ${err.message}\n`);
  server.close(() => process.exit(1));
});
