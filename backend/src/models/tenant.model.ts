export interface Tenant {
  id: string;
  name: string;
  domain: string;
  plan: 'basic' | 'professional' | 'enterprise';
  status: 'active' | 'inactive';
  createdAt: Date;
  updatedAt: Date;
}