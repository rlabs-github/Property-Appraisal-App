// src/index.ts
import path from 'path';
import dotenv from 'dotenv';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { Pool } from 'pg';
import { db as database } from '@config/database';  // Rename import
import { createLogger } from '@utils/logger';
import config from '@/config';

// Initialize logger
const logger = createLogger('Server');

// Load environment variables from .env file
const result = dotenv.config({ path: path.resolve(__dirname, '../.env') });

if (result.error) {
  logger.error('Error loading .env file:', { error: result.error });
  process.exit(1);
}

// Create Express app
const app = express();

// Initialize database
const pool = new Pool(config.db);
export const db = new DatabaseUtils(pool);

// Test database connection
pool.connect()
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

// Request logging middleware
app.use((req: Request, _res: Response, next: NextFunction) => {
  logger.debug(`Incoming request`, {
    method: req.method,
    path: req.path,
    ip: req.ip
  });
  next();
});

// Health check route
app.get('/health', async (_req: Request, res: Response) => {
  try {
    await db.executeQuery('SELECT 1');
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

// Global error handling middleware
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  logger.error('Unhandled error:', { error: err });
  res.status(500).json({
    error: 'Internal Server Error',
    message: config.nodeEnv === 'development' ? err.message : 'Something went wrong'
  });
});

// Handle 404 routes
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

// Graceful shutdown handling
const gracefulShutdown = async (signal: string): Promise<void> => {
  logger.info('Starting graceful shutdown...', { signal });
  
  server.close(() => {
    logger.info('Express server closed');
  });

  try {
    await pool.end();
    logger.info('Database connections closed');
    
    logger.info('Graceful shutdown completed');
    process.exit(0);
  } catch (err) {
    logger.error('Error during shutdown:', { error: err });
    process.exit(1);
  }
};

// Handle shutdown signals
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// Handle uncaught exceptions
process.on('uncaughtException', (err: Error) => {
  logger.error('Uncaught Exception:', { error: err });
  gracefulShutdown('Uncaught Exception');
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason: unknown, promise: Promise<unknown>) => {
  logger.error('Unhandled Rejection:', { reason, promise });
  gracefulShutdown('Unhandled Rejection');
});

export default app;