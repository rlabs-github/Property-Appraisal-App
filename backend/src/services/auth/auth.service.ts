// src/services/auth.service.ts
import { UnauthorizedError } from '../../utils/errors';
import { User } from '../../types';
import { firebase } from '../firebase';
import { LoginCredentials, AuthResponse } from '../../types';
import { db } from '@config/database';

export class AuthService {
  private allowedEmails = ['client@example.com', 'admin@example.com'];

  // Verifies Firebase ID token and returns user info
  async authenticateByToken(idToken: string): Promise<AuthResponse> {
    try {
      const decodedToken = await firebase.verifyIdToken(idToken);

      if (!this.allowedEmails.includes(decodedToken.email || '')) {
        throw new UnauthorizedError('Access denied');
      }

      const user = await this.getUserById(decodedToken.uid);
      return {
        token: idToken,
        user
      };
    } catch (error) {
      throw new UnauthorizedError('Invalid or expired token');
    }
  }

  // Admin-only method to get user info from Firebase Auth (not usually used in login flow)
  async getFirebaseUser(uid: string) {
    return await firebase.getUser(uid);
  }

  // Helper: fetch user info from DB
  private async getUserById(id: string): Promise<User> {
    const result = await db.query('SELECT * FROM users WHERE id = $1', [id]);
    if (!result.rows[0]) {
      throw new UnauthorizedError('User not found');
    }
    return result.rows[0];
  }
}
