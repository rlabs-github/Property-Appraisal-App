// src/services/firebase.ts
import { auth as firebaseAuth } from '../config/firebase'; // ✅ use relative path
import { createLogger } from '../utils/logger';
import { type DecodedIdToken, type UserRecord } from 'firebase-admin/auth';

const logger = createLogger('firebase-service');

export class FirebaseService {
  /**
   * Verify Firebase ID token
   */
  public async verifyIdToken(token: string): Promise<DecodedIdToken> {
    try {
      return await firebaseAuth.verifyIdToken(token);
    } catch (error) {
      logger.error('Error verifying Firebase token:', error);
      throw error;
    }
  }

  /**
   * Get user by UID
   */
  public async getUser(uid: string): Promise<UserRecord> {
    try {
      return await firebaseAuth.getUser(uid);
    } catch (error) {
      logger.error('Error getting Firebase user:', error);
      throw error;
    }
  }

  /**
   * Create custom token
   */
  public async createCustomToken(uid: string, claims?: object): Promise<string> {
    try {
      return await firebaseAuth.createCustomToken(uid, claims);
    } catch (error) {
      logger.error('Error creating custom token:', error);
      throw error;
    }
  }
}

export const firebaseService = new FirebaseService();
