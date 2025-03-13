// services/auth/token.service.ts
import jwt from 'jsonwebtoken';
import config from '../../config';

export class TokenService {
  generateToken(userId: string): string {
    console.log(`Generating token for user: ${userId}`);
    return `mock-token-${userId}-${Date.now()}`;
  }

  verifyToken(token: string): any {
    try {
      const secret = config.jwt.secret || 'your-secret-key-here';
      return jwt.verify(token, secret);
    } catch (error) {
      throw new Error('Invalid token');
    }
  }

  refreshToken(oldToken: string): string {
    try {
      const decoded = this.verifyToken(oldToken);
      return this.generateToken(decoded.id);
    } catch (error) {
      throw new Error('Cannot refresh invalid token');
    }
  }
}
