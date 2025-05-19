// src/lib/api/template.service.ts
import { api } from './api';

interface Template {
  id: string;
  name: string;
  description: string;
  type: 'document' | 'form';
  content: any;
  version: number;
  lastModified: string;
}

export const templateService = {
  async getAll(): Promise<Template[]> {
    return await api.get<Template[]>('/templates');
  },

  async getById(id: string): Promise<Template> {
    return await api.get<Template>(`/templates/${id}`);
  },

  async create(data: Omit<Template, 'id' | 'version' | 'lastModified'>): Promise<Template> {
    return await api.post<Template>('/templates', data);
  },

  async update(id: string, data: Partial<Template>): Promise<Template> {
    return await api.put<Template>(`/templates/${id}`, data);
  },

  async delete(id: string): Promise<void> {
    return await api.delete(`/templates/${id}`);
  },

  async generateDocument(templateId: string, data: any): Promise<Blob> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/templates/${templateId}/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to generate document');
    }

    return response.blob(); // ✅ Remains custom due to Blob handling
  },
};
