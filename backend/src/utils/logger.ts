// src/utils/logger.ts
import winston from 'winston';

// Winston logger configuration
const winstonLogger = winston.createLogger({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    })
  ]
});

// Create a service-specific logger function
export const createLogger = (service: string) => ({
  info: (message: string, meta?: any) => winstonLogger.info({ service, message, ...meta }),
  error: (message: string, meta?: any) => winstonLogger.error({ service, message, ...meta }),
  warn: (message: string, meta?: any) => winstonLogger.warn({ service, message, ...meta }),
  debug: (message: string, meta?: any) => winstonLogger.debug({ service, message, ...meta })
});

// Use `winstonLogger` for actual logging and remove the redundant `logger` object
export { winstonLogger as logger };