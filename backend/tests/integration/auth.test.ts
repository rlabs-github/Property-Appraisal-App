// Example test file: backend/tests/integration/auth.test.ts
import request from 'supertest';
import { app } from '../../src/app';
import { createTestToken } from '../utils/test-helpers';

describe('Auth endpoints', () => {
  it('should return user profile for authenticated user', async () => {
    const token = createTestToken('test-user-1', 'appraiser');
    
    const response = await request(app)
      .get('/api/auth/profile')
      .set('Authorization', `Bearer ${token}`);
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('email', 'test1@example.com');
  });

  it('should reject unauthorized requests', async () => {
    const response = await request(app).get('/api/auth/profile');
    
    expect(response.status).toBe(401);
  });
});