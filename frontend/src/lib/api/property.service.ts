// src/services/property.service.ts
import { api } from './api';

interface Property {
  id: string;
  name: string;
  address: string;
  type: string;
  status: string;
  lastUpdated: string;
  metadata: Record<string, any>;
}

export const propertyService = {
  async getAll(): Promise<Property[]> {
    return api.get<Property[]>('/properties');
  },

  async getById(id: string): Promise<Property> {
    return api.get<Property>(`/properties/${id}`);
  },

  async create(data: Omit<Property, 'id' | 'lastUpdated'>): Promise<Property> {
    return api.post<Property>('/properties', data);
  },

  async update(id: string, data: Partial<Property>): Promise<Property> {
    return api.put<Property>(`/properties/${id}`, data);
  },

  async delete(id: string): Promise<void> {
    return api.delete(`/properties/${id}`);
  }
};