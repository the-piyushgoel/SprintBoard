import express from 'express';

const app = express();

app.use(express.json());

app.get('/', (_req, res) => {
  res.json({ success: true, message: 'SprintBoard API v1' });
});

export default app;
