// backend/tests/utils/db-helpers.ts
import { Pool } from 'pg';

export async function cleanDb(pool: Pool) {
  await pool.query('TRUNCATE users, properties, appraisals CASCADE');
}

export async function seedTestData(pool: Pool) {
  await pool.query(`
    INSERT INTO users (id, email, name, role, status)
    VALUES 
      ('test-user-1', 'test1@example.com', 'Test User 1', 'appraiser', 'active'),
      ('test-user-2', 'test2@example.com', 'Test User 2', 'admin', 'active')
  `);
}