import path from 'path';
import dotenv from 'dotenv';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { apiRoutes } from './routes/api.routes';
import config from './config';
import { createLogger } from './utils/logger';
import { db, shutdown } from './config/database';

// Initialize logger
const logger = createLogger('Server');

// Load environment variables
const result = dotenv.config({ path: path.resolve(__dirname, '../.env') });

if (result.error) {
  logger.error('Error loading .env file:', { error: result.error });
  process.exit(1);
}

console.log('Loaded PORT:', process.env.PORT);

// Create Express app
const app = express();

// Database connection
db.connectDatabase()
  .then(() => logger.info('Database connected successfully', {
    host: config.db.host,
    database: config.db.database
  }))
  .catch((err: Error) => {
    logger.error('Database connection error:', { error: err.message });
    process.exit(1);
  });

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging
app.use((req: Request, _res: Response, next: NextFunction) => {
  logger.debug(`Incoming request`, {
    method: req.method,
    path: req.path,
    ip: req.ip
  });
  next();
});

// Health Check
app.get('/health', async (_req: Request, res: Response) => {
  try {
    await db.query('SELECT 1');
    res.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      environment: config.nodeEnv,
      database: {
        connected: true,
        host: config.db.host,
        database: config.db.database
      }
    });
  } catch (error) {
    logger.error('Health check failed', { error });
    res.status(500).json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      error: 'Database connection failed'
    });
  }
});

// Mount API Routes
app.use('/api', apiRoutes);

// Global Error Handler
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  logger.error('Unhandled error:', { error: err });
  res.status(500).json({
    error: 'Internal Server Error',
    message: config.nodeEnv === 'development' ? err.message : 'Something went wrong'
  });
});

// 404 Handler
app.use((_req: Request, res: Response) => {
  res.status(404).json({ error: 'Not Found' });
});

// Start server
const server = app.listen(config.port, () => {
  logger.info(`Server started`, {
    environment: config.nodeEnv,
    port: config.port
  });
});

// Graceful Shutdown
const gracefulShutdown = async (signal: string): Promise<void> => {
  logger.info('Starting graceful shutdown...', { signal });

  server.close(() => {
    logger.info('Express server closed');
  });

  try {
    await shutdown();
    logger.info('Database connections closed');
    logger.info('Graceful shutdown completed');
    process.exit(0);
  } catch (err) {
    logger.error('Error during shutdown:', { error: err });
    process.exit(1);
  }
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
process.on('uncaughtException', (err: Error) => {
  logger.error('Uncaught Exception:', { error: err });
  gracefulShutdown('Uncaught Exception');
});
process.on('unhandledRejection', (reason: unknown, promise: Promise<unknown>) => {
  logger.error('Unhandled Rejection:', { reason, promise });
  gracefulShutdown('Unhandled Rejection');
});

export default app;
