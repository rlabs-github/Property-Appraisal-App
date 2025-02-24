// src/services/auth.service.ts
import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut as firebaseSignOut,
    User as FirebaseUser
  } from 'firebase/auth';
  import { api } from './api';
  
  interface LoginCredentials {
    email: string;
    password: string;
  }
  
  interface RegisterCredentials extends LoginCredentials {
    name: string;
  }
  
  interface UserData {
    id: string;
    email: string;
    name: string;
    role: string;
    tenantId: string;
  }
  
  export const authService = {
    async login({ email, password }: LoginCredentials): Promise<UserData> {
      const auth = getAuth();
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      const userData = await this.getUserData(user);
      return userData;
    },
  
    async register({ email, password, name }: RegisterCredentials): Promise<UserData> {
      const auth = getAuth();
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      
      // Create user profile in your backend
      const userData = await api.post<UserData>('/users', {
        email,
        name,
        firebaseUid: user.uid,
      });
      
      return userData;
    },
  
    async getUserData(user: FirebaseUser): Promise<UserData> {
      const token = await user.getIdToken();
      return api.get<UserData>('/users/me', {
        headers: {
          Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
        },
      });
    },

    async signOut(): Promise<void> {
      const auth = getAuth();
      await firebaseSignOut(auth);
    }
  };