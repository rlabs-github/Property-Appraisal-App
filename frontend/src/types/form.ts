// src/types/form.ts
export interface FormTemplate {
    id: string;
    tenantId: string;
    name: string;
    description: string;
    sections: FormSection[];
    calculations: FormCalculation[];
    validations: FormValidation[];
    metadata: Record<string, any>;
    version: number;
    status: FormStatus;
    createdBy: string;
    updatedBy: string;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface FormRow {
    id: string;
    fields: FormField[];
  }
  
  export interface FormSection {
    id: string;
    title: string;
    description?: string;
    order: number;
    rows: FormRow[];
    type: 'standard' | 'calculation';
  }
  
  export interface FormField {
    id: string;
    type: FieldType;
    label: string;
    key: string;
    required: boolean;
    order: number;
    placeholder?: string;
    helpText?: string;
    defaultValue?: any;
    options?: FieldOption[];
    validations?: FieldValidation[];
    dependsOn?: FieldDependency[];
    formula?: string;
    row?: number;
    colSpan?: number; // e.g., spans 1-12 columns in a grid system
    documentMapping?: string;
    calculationFormula?: string;
  }
  
  export type FieldType = 'text' | 'number' | 'select' | 'multiselect' | 'date' | 
                         'currency' | 'calculation' | 'checkbox' | 'radio';
  
  export interface FieldOption {
    label: string;
    value: string | number;
    metadata?: Record<string, any>;
  }
  
  export interface FieldValidation {
    type: ValidationType;
    value: any;
    message: string;
  }
  
  export type ValidationType = 'required' | 'min' | 'max' | 'pattern' | 'custom';
  
  export interface FieldDependency {
    field: string;
    value: any;
    condition: 'equals' | 'notEquals' | 'contains' | 'greaterThan' | 'lessThan';
  }
  
  export interface FormCalculation {
    id: string;
    targetField: string;
    formula: string;
    dependencies: string[];
    description?: string;
  }
  
  export interface FormValidation {
    field: string;
    type: ValidationType;
    value: any;
    message: string;
  }
  
  export type FormStatus = 'draft' | 'active' | 'archived';