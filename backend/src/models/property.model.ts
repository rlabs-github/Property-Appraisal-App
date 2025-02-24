/ models/property.model.ts
export interface Property {
  id: string;
  address: string;
  propertyType: 'commercial' | 'residential' | 'industrial';
  squareFootage: number;
  yearBuilt: number;
  tenantId: string;
  createdById: string;
  status: 'draft' | 'inProgress' | 'completed';
  createdAt: Date;
  updatedAt: Date;
}