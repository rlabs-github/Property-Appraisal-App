// src/server.ts
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

import app from './app'; // Import your Express app
import { createLogger } from './utils/logger'; // Adjusted to relative path
import { db } from './config/database'; // Ensure this exports an object with connectDatabase()

const logger = createLogger('server');
const PORT = process.env.PORT || 3000;

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
