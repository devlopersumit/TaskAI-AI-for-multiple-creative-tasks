import 'dotenv/config';

import app from './app.js';
import { initializeDatabase } from './config/db.js';

const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    await initializeDatabase();
    app.listen(PORT, () => {
      console.log('Server is running on port', PORT);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

start();