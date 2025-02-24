// backend/tests/utils/test-helpers.ts
import { Express } from 'express';
import request from 'supertest';
import jwt from 'jsonwebtoken';

export function createTestToken(userId: string, role: string) {
  return jwt.sign(
    { userId, role },
    process.env.JWT_SECRET || 'test-secret',
    { expiresIn: '1h' }
  );
}

export function createAuthenticatedRequest(app: Express, token: string) {
  return request(app).set('Authorization', `Bearer ${token}`);
}