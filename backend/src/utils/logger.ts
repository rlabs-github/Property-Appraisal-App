// src/utils/logger.ts
import winston from 'winston';

const logger = winston.createLogger({
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

export const createLogger = (service: string) => {
  return {
    info: (message: string, meta?: any) => logger.info({ service, message, ...meta }),
    error: (message: string, meta?: any) => logger.error({ service, message, ...meta }),
    warn: (message: string, meta?: any) => logger.warn({ service, message, ...meta }),
    debug: (message: string, meta?: any) => logger.debug({ service, message, ...meta })
  };
};

export const logger = {
  info: (message: string, meta?: Record<string, unknown>) => {
    console.log(`[INFO] ${message}`, meta || '');
  },
  error: (message: string, meta?: Record<string, unknown>) => {
    console.error(`[ERROR] ${message}`, meta || '');
  },
  warn: (message: string, meta?: Record<string, unknown>) => {
    console.warn(`[WARN] ${message}`, meta || '');
  }
};
