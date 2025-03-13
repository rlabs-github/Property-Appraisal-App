// tests/setup.ts
// Jest global setup file

import { db } from '../src/config/database'; // Remove if not using a database

beforeAll(async () => {
  console.log('Setting up Jest test environment...');
});

afterAll(async () => {
  console.log('Cleaning up Jest test environment...');
});
