// backend/src/config/database.ts
import { Pool } from 'pg';
import { createLogger } from '../utils/logger';

const logger = createLogger('database');

const pool = new Pool({
  user: String(process.env.POSTGRES_USER || 'postgres'),
  password: String(process.env.POSTGRES_PASSWORD || 'postgres'),
  host: String(process.env.POSTGRES_HOST || 'localhost'),
  port: parseInt(process.env.POSTGRES_PORT || '5432'),
  database: String(process.env.POSTGRES_DB || 'appraisal_db'),
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

pool.on('error', (err) => {
  logger.error('Unexpected error on idle client', err);
  process.exit(-1);
});

export const db = {
  query: async (text: string, params?: any[]) => {
    const start = Date.now();
    try {
      const res = await pool.query(text, params);
      const duration = Date.now() - start;
      logger.debug('Executed query', { text, duration, rows: res.rowCount });
      return res;
    } catch (error) {
      logger.error('Query error', { text, error });
      throw error;
    }
  },
  connectDatabase: async () => {
    console.log('DB ENV Config:', {
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      host: process.env.POSTGRES_HOST,
      port: process.env.POSTGRES_PORT,
      database: process.env.POSTGRES_DB,
    });    
    await pool.connect();
    console.log('Database connected successfully');
  },
  getClient: () => pool.connect(),
};

export const shutdown = async () => {
  await pool.end();
  logger.info('Database pool has been shut down.');
};

export default db;

