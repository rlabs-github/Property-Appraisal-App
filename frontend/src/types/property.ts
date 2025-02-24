// src/types/property.ts
export interface Property {
    id: string;
    tenantId: string;
    name: string;
    address: Address;
    type: PropertyType;
    status: PropertyStatus;
    metadata: PropertyMetadata;
    createdBy: string;
    updatedBy: string;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface Address {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  }
  
  export type PropertyType = 'commercial' | 'residential' | 'industrial' | 'mixed-use';
  export type PropertyStatus = 'active' | 'pending' | 'archived' | 'draft';
  
  export interface PropertyMetadata {
    squareFootage?: number;
    yearBuilt?: number;
    lotSize?: number;
    zoningCode?: string;
    parkingSpaces?: number;
    [key: string]: any;
  }
  