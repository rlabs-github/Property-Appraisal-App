// types/form.ts
export interface Form {
    id: string;
    name: string;
    sections: FormSection[];
    status: 'draft' | 'published';
  }
  
  export interface FormSection {
    id: string;
    title: string;
    fields: FormField[];
  }
  
  export interface FormField {
    id: string;
    type: 'text' | 'number' | 'select' | 'calculation';
    label: string;
    required: boolean;
  }