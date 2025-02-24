// src/components/appraisal-tools/forms/types.ts
export interface Field {
    id: string;
    type: 'text' | 'number' | 'select' | 'calculation';
    label: string;
    required: boolean;
    placeholder: string;
    documentMapping: string;
    calculationFormula?: string;
    options?: string[];
  }
  
  export interface Section {
    id: string;
    type: 'standard' | 'calculation';
    title: string;
    fields: Field[];
  }
  
  export interface FormTemplate {
    id: string;
    name: string;
    sections: Section[];
  }
  
  export interface FormData {
    templateName: string;
    sections: Section[];
  }
  
  // Props interfaces
  export interface FormBuilderProps {
    onSave: (formData: FormData) => Promise<void>;
  }
  
  export interface FormFillerProps {
    templates: FormTemplate[];
    onSubmit: (formData: any) => void; // TODO: Define specific type for form submission data
  }
  
  export interface FormTemplateBuilderProps {
    onSave?: (template: FormTemplate) => Promise<void>;
    initialTemplate?: FormTemplate;
  }