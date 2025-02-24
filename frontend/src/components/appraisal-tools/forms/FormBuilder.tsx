/// src/components/appraisal-tools/forms/FormBuilder.tsx
import React, { useState } from 'react';
import { Plus, Trash2, MoveVertical, Calculator, Save, FileDown } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Field {
  id: string;
  type: 'text' | 'number' | 'select' | 'calculation' | 'currency';
  label: string;
  required: boolean;
  placeholder: string;
  documentMapping?: string;
  calculationFormula?: string;
  options?: string[];
}

interface Section {
  id: string;
  type: 'standard' | 'calculation';
  title: string;
  fields: Field[];
}

interface FormBuilderProps {
  onSave?: (formData: { name: string; sections: Section[] }) => Promise<void>;
  initialData?: {
    name: string;
    sections: Section[];
  };
}

const FormBuilder: React.FC<FormBuilderProps> = ({ onSave, initialData }) => {
  const [templateName, setTemplateName] = useState(initialData?.name ?? '');
  const [sections, setSections] = useState<Section[]>(initialData?.sections ?? []);
  const [isDirty, setIsDirty] = useState(false);

  const addSection = (type: Section['type']) => {
    const newSection = {
      id: `section-${Date.now()}`,
      type,
      title: `New ${type} Section`,
      fields: [],
    };
    setSections([...sections, newSection]);
    setIsDirty(true);
  };

  const addField = (sectionId: string, type: Field['type']) => {
    const newField: Field = {
      id: `field-${Date.now()}`,
      type,
      label: `New ${type} Field`,
      required: false,
      placeholder: '',
      documentMapping: '',
      calculationFormula: type === 'calculation' ? '' : undefined,
      options: type === 'select' ? [] : undefined,
    };

    setSections((prevSections) =>
      prevSections.map((section) =>
        section.id === sectionId
          ? { ...section, fields: [...section.fields, newField] }
          : section
      )
    );
    setIsDirty(true);
  };

  const updateField = (sectionId: string, fieldId: string, updates: Partial<Field>) => {
    setSections((prevSections) =>
      prevSections.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              fields: section.fields.map((field) =>
                field.id === fieldId ? { ...field, ...updates } : field
              ),
            }
          : section
      )
    );
    setIsDirty(true);
  };

  const handleSave = async () => {
    if (onSave) {
      try {
        await onSave({ name: templateName, sections });
        setIsDirty(false);
      } catch (error) {
        console.error('Error saving form:', error);
      }
    }
  };

  const renderFieldEditor = (field: Field, sectionId: string) => (
    <div key={field.id} className="border rounded-lg p-4 bg-gray-50 space-y-4">
      <div className="flex justify-between items-center">
        <label htmlFor={`field-label-${field.id}`} className="text-sm">
          Field Label
        </label>
        <Input
          id={`field-label-${field.id}`}
          type="text"
          value={field.label}
          onChange={(e) => updateField(sectionId, field.id, { label: e.target.value })}
          placeholder="Field Label"
          className="text-sm font-medium"
        />
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            setSections((prevSections) =>
              prevSections.map((section) => ({
                ...section,
                fields: section.fields.filter((f) => f.id !== field.id),
              }))
            );
            setIsDirty(true);
          }}
        >
          <Trash2 className="w-4 h-4 text-red-500" />
        </Button>
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <label htmlFor={`field-type-${field.id}`} className="text-sm">
            Field Type:
          </label>
          <Select
            value={field.type}
            onValueChange={(value: Field['type']) =>
              updateField(sectionId, field.id, { type: value })
            }
          >
            <SelectTrigger id={`field-type-${field.id}`} className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="text">Text</SelectItem>
              <SelectItem value="number">Number</SelectItem>
              <SelectItem value="select">Select</SelectItem>
              <SelectItem value="calculation">Calculation</SelectItem>
              <SelectItem value="currency">Currency</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center space-x-2">
          <Input
            id={`required-${field.id}`}
            type="checkbox"
            checked={field.required}
            onChange={(e) => updateField(sectionId, field.id, { required: e.target.checked })}
            className="rounded border-gray-300"
          />
          <label htmlFor={`required-${field.id}`} className="text-sm">
            Required
          </label>
        </div>

        <label htmlFor={`document-mapping-${field.id}`} className="text-sm">
          Document Mapping
        </label>
        <Input
          id={`document-mapping-${field.id}`}
          type="text"
          value={field.documentMapping}
          onChange={(e) => updateField(sectionId, field.id, { documentMapping: e.target.value })}
          placeholder="Document placeholder (e.g., {property_address})"
          className="w-full text-sm"
        />

        {field.type === 'calculation' && (
          <Input
            type="text"
            value={field.calculationFormula}
            onChange={(e) =>
              updateField(sectionId, field.id, { calculationFormula: e.target.value })
            }
            placeholder="Calculation formula (e.g., field1 * field2)"
            className="w-full text-sm"
          />
        )}
      </div>
    </div>
  );

  return (
    <div className="h-full flex flex-col">
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex justify-between items-center">
          <Input
            type="text"
            value={templateName}
            onChange={(e) => {
              setTemplateName(e.target.value);
              setIsDirty(true);
            }}
            placeholder="Enter template name..."
            className="w-full"
          />
          <div className="flex space-x-3">
            <Button variant="outline">
              <FileDown className="w-4 h-4 mr-2" />
              Export Template
            </Button>
            <Button disabled={!isDirty} onClick={handleSave}>
              <Save className="w-4 h-4 mr-2" />
              Save Template
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-1">
        <div className="w-64 border-r border-gray-200 p-4 bg-white">
          <h3 className="font-semibold mb-4">Add Section</h3>
          <div className="space-y-2">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => addSection('standard')}
            >
              <Plus className="w-4 h-4 mr-2" />
              Standard Section
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => addSection('calculation')}
            >
              <Calculator className="w-4 h-4 mr-2" />
              Calculation Section
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-auto p-6">
          {sections.map((section) => (
            <Card key={section.id}>
              <CardHeader className="flex justify-between">
                <Input
                  type="text"
                  value={section.title}
                  onChange={(e) => {
                    setSections((prevSections) =>
                      prevSections.map((s) =>
                        s.id === section.id ? { ...s, title: e.target.value } : s
                      )
                    );
                    setIsDirty(true);
                  }}
                  className="text-lg font-semibold bg-transparent border-none"
                />
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSections((prevSections) =>
                        prevSections.filter((s) => s.id !== section.id)
                      );
                      setIsDirty(true);
                    }}
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {section.fields.map((field) => renderFieldEditor(field, section.id))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => addField(section.id, 'text')}
                  className="text-blue-600"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Field
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FormBuilder;