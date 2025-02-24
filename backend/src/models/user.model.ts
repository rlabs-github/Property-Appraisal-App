// models/user.model.ts
export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: 'admin' | 'appraiser' | 'viewer';
    tenantId: string;
    status: 'active' | 'inactive' | 'pending';
    lastLogin: Date;
    createdAt: Date;
    updatedAt: Date;
  }