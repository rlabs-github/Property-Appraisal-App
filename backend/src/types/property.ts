// types/property.ts
export interface Property {
    id: string;
    address: string;
    type: 'commercial' | 'residential';
    status: 'active' | 'pending' | 'completed';
    createdAt: Date;
    updatedAt: Date;
    ownerId: string;
    metadata?: Record<string, any>;
  }