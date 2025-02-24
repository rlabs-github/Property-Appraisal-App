// src/types/auth.ts
import { User } from './user';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  name: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
}

export interface ResetPasswordCredentials {
  email: string;
}

export interface ChangePasswordCredentials {
  currentPassword: string;
  newPassword: string;
}

export interface RefreshTokenResponse {
  token: string;
  refreshToken: string;
}

// Types for Firebase auth state
export interface FirebaseAuthState {
  user: User | null;
  firebaseUser: any | null;  // You can replace 'any' with Firebase.User if you import Firebase types
  isLoading: boolean;
  error: string | null;
}

// Context type for auth provider
export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  changePassword: (credentials: ChangePasswordCredentials) => Promise<void>;
  clearError: () => void;
}