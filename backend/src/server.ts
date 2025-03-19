// src/server.ts
import dotenv from 'dotenv';
import app from './app';  // ✅ Import the Express app, NOT "./config/server"
import { createLogger } from './utils/logger';
import { connectDatabase } from './config/database';

dotenv.config();

const logger = createLogger('server');
const PORT = process.env.PORT || 3000;

// ✅ Connect to the database before starting the server
const startServer = async () => {
  try {
    await connectDatabase();
    const server = app.listen(PORT, () => {
      logger.info(`Server is running on port ${PORT}`);
    });

    // Graceful Shutdown Handlers
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

startServer(); // ✅ Start the server

export default app;
