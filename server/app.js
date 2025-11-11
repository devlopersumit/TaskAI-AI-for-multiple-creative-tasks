import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import 'dotenv/config';

import articleRoutes from './routes/articleRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import imageRoutes from './routes/imageRoutes.js';
import resumeRoutes from './routes/resumeRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import communityRoutes from './routes/communityRoutes.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';

const app = express();

const allowedOrigins = (process.env.CLIENT_URLS || process.env.CLIENT_URL || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(cors({
  origin: allowedOrigins.length ? allowedOrigins : true,
  credentials: true,
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('tiny'));
}

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/articles', articleRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/images', imageRoutes);
app.use('/api/resume', resumeRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/community', communityRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;

