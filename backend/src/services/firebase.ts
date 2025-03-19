// backend/src/services/firebase.ts
import { initializeApp, cert, type App } from 'firebase-admin/app';
import { getAuth, type Auth } from 'firebase-admin/auth';
import { createLogger } from '@utils/logger';

const logger = createLogger('firebase');

class FirebaseService {
  private static instance: FirebaseService;
  private app: App;
  private auth: Auth;

  private constructor() {
    try {
      // Initialize Firebase Admin
      this.app = initializeApp({
        credential: cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')
        })
      });

      this.auth = getAuth(this.app);
      logger.info('Firebase Admin initialized successfully');
    } catch (error) {
      logger.error('Error initializing Firebase Admin:', error);
      throw error;
    }
  }

  public static getInstance(): FirebaseService {
    if (!FirebaseService.instance) {
      FirebaseService.instance = new FirebaseService();
    }
    return FirebaseService.instance;
  }

  /**
   * Verify Firebase ID token
   */
  public async verifyIdToken(token: string) {
    try {
      const decodedToken = await this.auth.verifyIdToken(token);
      return decodedToken;
    } catch (error) {
      logger.error('Error verifying Firebase token:', error);
      throw error;
    }
  }

  /**
   * Get user by UID
   */
  public async getUser(uid: string) {
    try {
      const userRecord = await this.auth.getUser(uid);
      return userRecord;
    } catch (error) {
      logger.error('Error getting Firebase user:', error);
      throw error;
    }
  }

  /**
   * Create custom token
   */
  public async createCustomToken(uid: string, claims?: object) {
    try {
      const token = await this.auth.createCustomToken(uid, claims);
      return token;
    } catch (error) {
      logger.error('Error creating custom token:', error);
      throw error;
    }
  }

  /**
   * Get auth instance
   */
  public getAuth(): Auth {
    return this.auth;
  }
}

// Export singleton instance
export const firebase = FirebaseService.getInstance();
export const auth = firebase.getAuth();

// Export types
export type { Auth };