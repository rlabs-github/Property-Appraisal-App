// src/config/index.ts
import { PoolConfig } from 'pg';

interface DatabaseConfig extends PoolConfig {
  max?: number;
  idleTimeoutMillis?: number;
  connectionTimeoutMillis?: number;
}

interface Config {
  nodeEnv: string;
  port: number;
  db: DatabaseConfig;
  jwt: {
    secret: string;
    expiresIn: string;
  };
  gcp: {
    bucketName: string;
  };
}

const config: Config = {
  // Server Configuration
  nodeEnv: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '3000', 10),
  
  // Database Configuration
  db: {
    host: process.env.POSTGRES_HOST || 'localhost',
    port: parseInt(process.env.POSTGRES_PORT || '5432', 10),
    database: process.env.POSTGRES_DB || 'appraisal_db',
    user: process.env.POSTGRES_USER || 'postgres',
    password: String(process.env.POSTGRES_PASSWORD || 'postgres'),
    // Pool Configuration
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  },

  // JWT Configuration
  jwt: {
    secret: process.env.JWT_SECRET || 'your-secret-key-here',
    expiresIn: '1d'
  },

  // GCP Configuration
  gcp: {
    bucketName: process.env.GCP_BUCKET_NAME || 'default-bucket',
  }
};

// Validate required environment variables in production
if (config.nodeEnv === 'production') {
  const requiredEnvVars = [
    'POSTGRES_HOST',
    'POSTGRES_DB',
    'POSTGRES_USER',
    'POSTGRES_PASSWORD',
    'JWT_SECRET'
  ];

  const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

  if (missingEnvVars.length > 0) {
    throw new Error(
      `Missing required environment variables in production: ${missingEnvVars.join(', ')}`
    );
  }

  // Validate JWT secret in production
  if (config.jwt.secret === 'your-secret-key-here') {
    throw new Error('Default JWT secret cannot be used in production');
  }
}

export default config;