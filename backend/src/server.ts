// src/server.ts
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

import app from './app';
import { createLogger } from './utils/logger';
import { db } from './config/database';

const logger = createLogger('server');
const PORT = process.env.PORT || 4000;

// ❌ REMOVE this block
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

const startServer = async () => {
  try {
    await db.connectDatabase();
    const server = app.listen(PORT, () => {
      logger.info(`Server is running on port ${PORT}`);
    });

    process.on('unhandledRejection', (err: Error) => {
      logger.error('Unhandled Rejection:', err);
      server.close(() => process.exit(1));
    });

    process.on('SIGTERM', () => {
      logger.info('SIGTERM received. Shutting down gracefully');
      server.close(() => logger.info('Process terminated'));
    });
  } catch (error) {
    logger.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();

export default app;
