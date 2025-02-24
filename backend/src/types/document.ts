// types/document.ts
export interface Document {
    id: string;
    propertyId: string;
    type: 'appraisal' | 'inspection' | 'report';
    status: 'draft' | 'final';
    url: string;
    createdAt: Date;
    updatedAt: Date;
    createdBy: string;
  }
  
  export interface Template {
    id: string;
    name: string;
    content: string;
    fields: TemplateField[];
  }