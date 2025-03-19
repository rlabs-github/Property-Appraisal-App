// src/services/auth.service.ts
import { AuthService } from '../../services/auth/auth.service';
import { UnauthorizedError } from '../../utils/errors';
import { User } from '../../types';
import { auth } from '../firebase';
import { LoginCredentials, AuthResponse } from '../../types/auth';  // Add these imports
import { db } from '../../config/database';

export class AuthService {
  private allowedEmails = ['client@example.com', 'admin@example.com'];

  // Login method for existing users
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    if (!this.allowedEmails.includes(credentials.email)) {
      throw new UnauthorizedError('Access denied');
    }

    try {
      const userCredential = await auth.signInWithEmailAndPassword(
        credentials.email, 
        credentials.password
      );
      const user = await this.getUserById(userCredential.user?.uid);
      const token = await userCredential.user?.getIdToken();
      return { token, user };
    } catch (error) {
      throw new UnauthorizedError('Invalid credentials');
    }
  }

  // Registration method for new users
  async register(userData: Partial<User>): Promise<AuthResponse> {
    if (!this.allowedEmails.includes(userData.email)) {
      throw new UnauthorizedError('Registration restricted');
    }

    try {
      const userCredential = await auth.createUserWithEmailAndPassword(
        userData.email,
        userData.password
      );
      
      const user = await this.createUserInDB({
        id: userCredential.user.uid,
        email: userData.email,
        role: userData.role || 'viewer',
        status: 'active'
      });

      const token = await userCredential.user.getIdToken();
      return { token, user };
    } catch (error) {
      throw new UnauthorizedError('Registration failed');
    }
  }

  // Helper method to get user from database
  async getUserById(id: string): Promise<User> {
    const result = await db.query('SELECT * FROM users WHERE id = $1', [id]);
    if (!result.rows[0]) {
      throw new UnauthorizedError('User not found');
    }
    return result.rows[0];
  }

  // Helper method to create user in database
  private async createUserInDB(userData: Omit<User, 'createdAt' | 'updatedAt'>): Promise<User> {
    // Implement DB creation logic here
    return userData as User;
  }
}