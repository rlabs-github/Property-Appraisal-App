// src/components/appraisal-tools/forms/FormFiller.tsx
import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';

interface Field {
  id: string;
  type: 'text' | 'number' | 'select' | 'calculation' | 'currency';
  label: string;
  required: boolean;
  placeholder: string;
  options?: string[];
  calculationFormula?: string;
}

interface Section {
  id: string;
  type: 'standard' | 'calculation';
  title: string;
  fields: Field[];
}

interface Template {
  id: string;
  name: string;
  sections: Section[];
}

interface FormFillerProps {
  templates: Template[];
  onSubmit?: (formData: {
    templateId: string;
    data: Record<string, any>;
  }) => Promise<void>;
}

const FormFiller: React.FC<FormFillerProps> = ({ templates, onSubmit }) => {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentTemplate = templates.find(t => t.id === selectedTemplate);

  const handleFieldChange = (fieldId: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [fieldId]: value
    }));

    // Recalculate any dependent fields
    if (currentTemplate) {
      const updatedData = { ...formData, [fieldId]: value };
      const calculatedValues = calculateDependentFields(currentTemplate.sections, updatedData);
      setFormData(prev => ({
        ...prev,
        ...calculatedValues
      }));
    }
  };

  const calculateDependentFields = (sections: Section[], currentData: Record<string, any>) => {
    const calculations: Record<string, any> = {};
    
    sections.forEach(section => {
      section.fields.forEach(field => {
        if (field.type === 'calculation' && field.calculationFormula) {
          try {
            // Simple calculation implementation - replace with more robust solution
            let formula = field.calculationFormula;
            Object.entries(currentData).forEach(([key, value]) => {
              formula = formula.replace(`{${key}}`, value);
            });
            calculations[field.id] = eval(formula);
          } catch (error) {
            calculations[field.id] = 'Error';
          }
        }
      });
    });

    return calculations;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!onSubmit || !selectedTemplate) return;

    try {
      setIsSubmitting(true);
      await onSubmit({
        templateId: selectedTemplate,
        data: formData
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      // Handle error appropriately
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderField = (field: Field) => {
    switch (field.type) {
      case 'text':
        return (
          <Input
            type="text"
            value={formData[field.id] || ''}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
            placeholder={field.placeholder}
            required={field.required}
          />
        );

      case 'number':
        return (
          <Input
            type="number"
            value={formData[field.id] || ''}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
            placeholder={field.placeholder}
            required={field.required}
          />
        );

      case 'select':
        return (
          <Select
            value={formData[field.id] || ''}
            onValueChange={(value) => handleFieldChange(field.id, value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case 'calculation':
        return (
          <Input
            type="text"
            value={formData[field.id] || ''}
            readOnly
            className="bg-gray-50"
          />
        );

      case 'currency':
        return (
          <div className="relative">
            <span className="absolute left-3 top-2 text-gray-500">$</span>
            <Input
              type="number"
              value={formData[field.id] || ''}
              onChange={(e) => handleFieldChange(field.id, e.target.value)}
              className="pl-7"
              placeholder="0.00"
              required={field.required}
              min="0"
              step="0.01"
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto p-6">
      <Card>
        <CardHeader>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Template
            </label>
            <Select
              value={selectedTemplate || ''}
              onValueChange={(value) => {
                setSelectedTemplate(value);
                setFormData({});
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Choose a template..." />
              </SelectTrigger>
              <SelectContent>
                {templates.map((template) => (
                  <SelectItem key={template.id} value={template.id}>
                    {template.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
      </Card>

      {currentTemplate && (
        <form onSubmit={handleSubmit}>
          {currentTemplate.sections.map((section) => (
            <Card key={section.id} className="mb-6">
              <CardHeader>
                <h3 className="text-lg font-semibold">{section.title}</h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {section.fields.map((field) => (
                    <div key={field.id} className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        {field.label}
                        {field.required && <span className="text-red-500 ml-1">*</span>}
                      </label>
                      {renderField(field)}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}

          <div className="flex justify-end mt-6">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-600 text-white hover:bg-blue-700"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Form'}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default FormFiller;