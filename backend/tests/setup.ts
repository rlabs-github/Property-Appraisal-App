import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.TEST_DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/property_appraisal_test'
});

beforeAll(async () => {
  // Setup test database if needed
});

afterAll(async () => {
  await pool.end();
});