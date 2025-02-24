// src/services/form.service.ts
import { api } from './api';

interface FormTemplate {
  id: string;
  name: string;
  sections: FormSection[];
  calculations: FormCalculation[];
  validations: FormValidation[];
}

interface FormSection {
  id: string;
  title: string;
  fields: FormField[];
}

interface FormField {
  id: string;
  type: 'text' | 'number' | 'select' | 'date' | 'currency' | 'calculation';
  label: string;
  required: boolean;
  options?: string[];
  placeholder?: string;
  formula?: string;
}

interface FormCalculation {
  targetField: string;
  formula: string;
  dependencies: string[];
}

interface FormValidation {
  field: string;
  type: 'required' | 'min' | 'max' | 'pattern';
  value: any;
  message: string;
}

export const formService = {
  async getTemplates(): Promise<FormTemplate[]> {
    return api.get<FormTemplate[]>('/forms/templates');
  },

  async getTemplateById(id: string): Promise<FormTemplate> {
    return api.get<FormTemplate>(`/forms/templates/${id}`);
  },

  async createTemplate(data: Omit<FormTemplate, 'id'>): Promise<FormTemplate> {
    return api.post<FormTemplate>('/forms/templates', data);
  },

  async updateTemplate(id: string, data: Partial<FormTemplate>): Promise<FormTemplate> {
    return api.put<FormTemplate>(`/forms/templates/${id}`, data);
  },

  async deleteTemplate(id: string): Promise<void> {
    return api.delete(`/forms/templates/${id}`);
  },

  async submitForm(templateId: string, data: Record<string, any>): Promise<void> {
    return api.post(`/forms/submissions/${templateId}`, data);
  }
};