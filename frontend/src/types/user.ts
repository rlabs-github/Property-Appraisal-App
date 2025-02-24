// src/types/user.ts
export interface User {
    id: string;
    email: string;
    name: string;
    role: UserRole;
    tenantId: string;
    status: UserStatus;
    preferences: UserPreferences;
    permissions: UserPermissions;
    lastLoginAt?: string;
    createdAt: string;
    updatedAt: string;
  }
  
  export type UserRole = 'admin' | 'appraiser' | 'viewer';
  
  export type UserStatus = 'active' | 'inactive' | 'pending' | 'suspended';
  
  export interface UserPreferences {
    theme?: 'light' | 'dark' | 'system';
    notifications: {
      email: boolean;
      push: boolean;
      desktop: boolean;
    };
    defaultDashboard?: string;
    language?: string;
  }
  
  export interface UserPermissions {
    canCreateTemplates: boolean;
    canEditTemplates: boolean;
    canDeleteTemplates: boolean;
    canManageUsers: boolean;
    canGenerateReports: boolean;
    canViewAnalytics: boolean;
    [key: string]: boolean;
  }
  
  export interface UserProfile extends Pick<User, 'name' | 'email' | 'preferences'> {
    avatar?: string;
    phone?: string;
    title?: string;
    department?: string;
    location?: string;
  }
  
  export interface CreateUserDto {
    email: string;
    name: string;
    role: UserRole;
    password: string;
  }
  
  export interface UpdateUserDto {
    name?: string;
    role?: UserRole;
    status?: UserStatus;
    preferences?: Partial<UserPreferences>;
    permissions?: Partial<UserPermissions>;
  }
  
  // Extended user types for specific features
  export interface UserActivity {
    id: string;
    userId: string;
    action: 'login' | 'logout' | 'create' | 'update' | 'delete';
    resourceType: 'property' | 'template' | 'form' | 'document';
    resourceId: string;
    details: Record<string, any>;
    timestamp: string;
  }