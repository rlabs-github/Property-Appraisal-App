// types/auth.ts
export interface User {
    id: string;
    email: string;
    role: 'admin' | 'appraiser' | 'viewer';
    status: 'active' | 'inactive';
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface LoginCredentials {
    email: string;
    password: string;
  }

  export interface AuthResponse {
    token: string;
    user: User;
  }