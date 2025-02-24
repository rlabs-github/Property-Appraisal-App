import React, { useState } from 'react';
import { Plus, Trash2, MoveVertical, Calculator, Save, FileDown } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Field {
  id: string;
  type: string;
  label: string;
  required: boolean;
  placeholder: string;
  documentMapping: string;
  calculationFormula?: string;
  options?: string[];
}

interface Section {
  id: string;
  type: string;
  title: string;
  fields: Field[];
}

const FormTemplateBuilder = () => {
  const [templateName, setTemplateName] = useState('');
  const [sections, setSections] = useState<Section[]>([]);
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
  const [isDirty, setIsDirty] = useState(false);

  const addSection = (type: string) => {
    const newSection: Section = {
      id: `section-${Date.now()}`,
      type,
      title: `New ${type} Section`,
      fields: [],
    };
    setSections([...sections, newSection]);
    setIsDirty(true);
  };

  const addField = (sectionId: string, type: string) => {
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

    setSections(sections.map((section) => {
      if (section.id === sectionId) {
        return {
          ...section,
          fields: [...section.fields, newField],
        };
      }
      return section;
    }));
    setIsDirty(true);
  };

  const updateField = (sectionId: string, fieldId: string, updates: Partial<Field>) => {
    setSections(sections.map((section) => {
      if (section.id === sectionId) {
        return {
          ...section,
          fields: section.fields.map((field) =>
            field.id === fieldId ? { ...field, ...updates } : field
          ),
        };
      }
      return section;
    }));
    setIsDirty(true);
  };

  const renderFieldEditor = (field: Field, sectionId: string) => (
    <div key={field.id} className="border rounded-lg p-4 bg-gray-50 space-y-4">
      <div className="flex justify-between items-center">
        <Input
          type="text"
          value={field.label}
          onChange={(e) => updateField(sectionId, field.id, { label: e.target.value })}
          placeholder="Field label"
          className="text-sm font-medium bg-transparent border-none focus:ring-0"
        />
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            setSections(sections.map((section) => ({
              ...section,
              fields: section.fields.filter((f) => f.id !== field.id),
            })));
            setIsDirty(true);
          }}
        >
          <Trash2 className="w-4 h-4 text-red-500" />
        </Button>
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <label className="text-sm">Field Type:</label>
          <Select
            value={field.type}
            onValueChange={(value) => updateField(sectionId, field.id, { type: value })}
          >
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="text">Text</SelectItem>
              <SelectItem value="number">Number</SelectItem>
              <SelectItem value="select">Select</SelectItem>
              <SelectItem value="calculation">Calculation</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={field.required}
            onChange={(e) => updateField(sectionId, field.id, { required: e.target.checked })}
            className="rounded border-gray-300"
          />
          <label className="text-sm">Required</label>
        </div>

        <Input
          type="text"
          value={field.documentMapping}
          onChange={(e) => updateField(sectionId, field.id, { documentMapping: e.target.value })}
          placeholder="Document mapping (e.g., {property_address})"
          className="w-full text-sm"
        />

        {field.type === 'calculation' && (
          <Input
            type="text"
            value={field.calculationFormula || ''}
            onChange={(e) => updateField(sectionId, field.id, { calculationFormula: e.target.value })}
            placeholder="Calculation formula (e.g., field1 * field2)"
            className="w-full text-sm"
          />
        )}
      </div>
    </div>
  );

  const renderPreview = () => (
    <div className="bg-white rounded-lg border p-6">
      <h3 className="text-lg font-semibold mb-4">{templateName || 'Untitled Template'}</h3>
      {sections.map((section) => (
        <div key={section.id} className="mb-6">
          <h4 className="text-md font-medium mb-3">{section.title}</h4>
          <div className="space-y-4">
            {section.fields.map((field) => (
              <div key={field.id} className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  {field.label}
                  {field.required && <span className="text-red-500 ml-1">*</span>}
                </label>
                {field.type === 'text' && (
                  <Input
                    type="text"
                    placeholder={field.placeholder}
                    disabled
                    className="mt-1"
                  />
                )}
                {field.type === 'number' && (
                  <Input
                    type="number"
                    placeholder={field.placeholder}
                    disabled
                    className="mt-1"
                  />
                )}
                {field.type === 'select' && (
                  <Select disabled>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                  </Select>
                )}
                {field.type === 'calculation' && (
                  <div className="text-sm text-gray-500 italic">
                    Calculated: {field.calculationFormula}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="h-full flex flex-col">
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex justify-between items-center">
          <div className="flex-1">
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
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" onClick={() => {}}>
              <FileDown className="w-4 h-4 mr-2" />
              Export Template
            </Button>
            <Button
              disabled={!isDirty}
              onClick={() => {
                // Handle save
                setIsDirty(false);
              }}
            >
              <Save className="w-4 h-4 mr-2" />
              Save Template
            </Button>
          </div>
        </div>
      </div>

      <div className="flex border-b border-gray-200">
        <button
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === 'edit'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('edit')}
        >
          Edit Template
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === 'preview'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('preview')}
        >
          Preview
        </button>
      </div>

      <div className="flex-1 overflow-auto p-6">
        {activeTab === 'edit' ? (
          <div className="space-y-6">
            {sections.map((section) => (
              <Card key={section.id}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <Input
                    type="text"
                    value={section.title}
                    onChange={(e) => {
                      setSections(
                        sections.map((s) =>
                          s.id === section.id ? { ...s, title: e.target.value } : s
                        )
                      );
                      setIsDirty(true);
                    }}
                    className="text-lg font-semibold bg-transparent border-none focus:ring-0"
                  />
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm">
                      <MoveVertical className="w-4 h-4 text-gray-500" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSections(sections.filter((s) => s.id !== section.id));
                        setIsDirty(true);
                      }}
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
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
                  </div>
                </CardContent>
              </Card>
            ))}
            <div className="flex space-x-3">
              <Button variant="outline" onClick={() => addSection('standard')}>
                <Plus className="w-4 h-4 mr-2" />
                Add Section
              </Button>
              <Button variant="outline" onClick={() => addSection('calculation')}>
                <Calculator className="w-4 h-4 mr-2" />
                Add Calculation Section
              </Button>
            </div>
          </div>
        ) : (
          renderPreview()
        )}
      </div>
    </div>
  );
};

export default FormTemplateBuilder;
