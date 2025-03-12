// src/services/template.service.ts
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
    const templates = await api.get<Template[]>('/templates');
    return templates; // The response is directly the parsed data, thanks to api.ts generics.
  },

  async getById(id: string): Promise<Template> {
    const template = await api.get<Template>(`/templates/${id}`);
    return template; // Again, the generic ensures type safety.
  },

  async create(data: Omit<Template, 'id' | 'version' | 'lastModified'>): Promise<Template> {
    const newTemplate = await api.post<Template>('/templates', data);
    return newTemplate;
  },

  async update(id: string, data: Partial<Template>): Promise<Template> {
    const updatedTemplate = await api.put<Template>(`/templates/${id}`, data);
    return updatedTemplate;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/templates/${id}`);
    // No return value for delete as it resolves a void Promise.
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

    return response.blob(); // Returns a Blob object.
  },
};
