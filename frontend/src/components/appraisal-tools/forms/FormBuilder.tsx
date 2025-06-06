/// src/components/appraisal-tools/forms/FormBuilder.tsx
import React, { useState } from 'react';
import { Plus, Trash2, Calculator, Save, FileDown } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { FormField, FormSection } from '@/types/form';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  horizontalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

type Field = FormField;
type Section = FormSection;

interface FormBuilderProps {
  onSave?: (formData: { name: string; sections: Section[] }) => Promise<void>;
  initialData?: {
    name: string;
    sections: Section[];
  };
}

// Sortable Row component
function SortableRow({ row, sectionId, children }: { row: any; sectionId: string; children: React.ReactNode }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: row.id,
  });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    background: isDragging ? '#f0f0f0' : undefined,
  };
  return (
    <div ref={setNodeRef} style={style} {...attributes} className="relative">
      <div {...listeners} className="absolute left-0 top-1/2 -translate-y-1/2 cursor-grab z-10 p-1">
        <span title="Drag row">☰</span>
      </div>
      <div className="pl-6">{children}</div>
    </div>
  );
}

// Sortable Field component
function SortableField({ field, sectionId, rowId, children }: { field: any; sectionId: string; rowId: string; children: React.ReactNode }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: field.id,
  });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    background: isDragging ? '#f9fafb' : undefined,
  };
  return (
    <div ref={setNodeRef} style={style} className="relative col-span-12">
      <div {...listeners} className="absolute left-0 top-1/2 -translate-y-1/2 cursor-grab z-10 p-1">
        <span title="Drag field">⋮</span>
      </div>
      <div className="pl-6">{children}</div>
    </div>
  );
}

const FormBuilder: React.FC<FormBuilderProps> = ({ onSave, initialData }) => {
  const [templateName, setTemplateName] = useState(initialData?.name ?? '');
  const [sections, setSections] = useState<Section[]>(initialData?.sections ?? []);
  const [isDirty, setIsDirty] = useState(false);
  const sensors = useSensors(useSensor(PointerSensor));

  const addSection = (type: Section['type']) => {
    const newSection: Section = {
      id: `section-${Date.now()}`,
      type,
      title: `New ${type} Section`,
      order: sections.length,
      rows: [],
    };
    setSections([...sections, newSection]);
    setIsDirty(true);
  };

  const addRow = (sectionId: string) => {
    setSections((prevSections) =>
      prevSections.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              rows: [
                ...section.rows,
                { id: `row-${Date.now()}`, fields: [] },
              ],
            }
          : section
      )
    );
    setIsDirty(true);
  };

  const addField = (sectionId: string, rowId: string, type: Field['type']) => {
    const timestamp = Date.now().toString();
    const newField: Field = {
      id: `field-${timestamp}`,
      key: `field_${timestamp}`,
      type,
      label: `New ${type} Field`,
      required: false,
      order: 0,
      placeholder: '',
      documentMapping: '',
      calculationFormula: type === 'calculation' ? '' : undefined,
      options: type === 'select' ? [] : undefined,
    };
    setSections((prevSections) =>
      prevSections.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              rows: section.rows.map((row) =>
                row.id === rowId
                  ? { ...row, fields: [...row.fields, newField] }
                  : row
              ),
            }
          : section
      )
    );
    setIsDirty(true);
  };

  const removeRow = (sectionId: string, rowId: string) => {
    setSections((prevSections) =>
      prevSections.map((section) =>
        section.id === sectionId
          ? { ...section, rows: section.rows.filter((row) => row.id !== rowId) }
          : section
      )
    );
    setIsDirty(true);
  };

  const removeField = (sectionId: string, rowId: string, fieldId: string) => {
    setSections((prevSections) =>
      prevSections.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              rows: section.rows.map((row) =>
                row.id === rowId
                  ? { ...row, fields: row.fields.filter((f) => f.id !== fieldId) }
                  : row
              ),
            }
          : section
      )
    );
    setIsDirty(true);
  };

  const updateField = (sectionId: string, rowId: string, fieldId: string, updates: Partial<Field>) => {
    setSections((prevSections) =>
      prevSections.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              rows: section.rows.map((row) =>
                row.id === rowId
                  ? {
                      ...row,
                      fields: row.fields.map((field) =>
                        field.id === fieldId ? { ...field, ...updates } : field
                      ),
                    }
                  : row
              ),
            }
          : section
      )
    );
    setIsDirty(true);
  };

  // Handle row drag end
  const handleRowDragEnd = (sectionId: string, event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    setSections((prevSections) =>
      prevSections.map((section) => {
        if (section.id !== sectionId) return section;
        const oldIndex = section.rows.findIndex((row) => row.id === active.id);
        const newIndex = section.rows.findIndex((row) => row.id === over.id);
        if (oldIndex === -1 || newIndex === -1) return section;
        return {
          ...section,
          rows: arrayMove(section.rows, oldIndex, newIndex),
        };
      })
    );
    setIsDirty(true);
  };

  // Handle field drag end
  const handleFieldDragEnd = (sectionId: string, rowId: string, event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    setSections((prevSections) =>
      prevSections.map((section) => {
        if (section.id !== sectionId) return section;
        return {
          ...section,
          rows: section.rows.map((row) => {
            if (row.id !== rowId) return row;
            const oldIndex = row.fields.findIndex((field) => field.id === active.id);
            const newIndex = row.fields.findIndex((field) => field.id === over.id);
            if (oldIndex === -1 || newIndex === -1) return row;
            return {
              ...row,
              fields: arrayMove(row.fields, oldIndex, newIndex),
            };
          }),
        };
      })
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

  const renderFieldEditor = (field: Field, sectionId: string, rowId: string) => (
    <div key={field.id} className="border rounded-lg p-4 bg-gray-50 space-y-4">
      <div className="flex justify-between items-center gap-4">
        <div className="flex-1 space-y-1">
          <label htmlFor={`field-label-${field.id}`} className="text-sm">
            Field Label
          </label>
          <Input
            id={`field-label-${field.id}`}
            type="text"
            value={field.label}
            onChange={(e) => updateField(sectionId, rowId, field.id, { label: e.target.value })}
            placeholder="Field Label"
            className="text-sm font-medium"
          />
        </div>

        <div className="space-y-1">
          <label htmlFor={`col-span-${field.id}`} className="text-sm">
            Width (colSpan 1–12)
          </label>
          <Input
            id={`col-span-${field.id}`}
            type="number"
            min={1}
            max={12}
            value={field.colSpan ?? 12}
            onChange={(e) =>
              updateField(sectionId, rowId, field.id, {
                colSpan: Math.min(Math.max(Number(e.target.value), 1), 12),
              })
            }
            className="w-24 text-sm"
          />
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            removeField(sectionId, rowId, field.id);
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
              updateField(sectionId, rowId, field.id, { type: value })
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
            onChange={(e) => updateField(sectionId, rowId, field.id, { required: e.target.checked })}
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
          onChange={(e) =>
            updateField(sectionId, rowId, field.id, { documentMapping: e.target.value })
          }
          placeholder="e.g., {property_address}"
          className="w-full text-sm"
        />

        {field.type === 'calculation' && (
          <Input
            type="text"
            value={field.calculationFormula}
            onChange={(e) =>
              updateField(sectionId, rowId, field.id, { calculationFormula: e.target.value })
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
            <Button variant="outline" className="w-full" onClick={() => addSection('standard')}>
              <Plus className="w-4 h-4 mr-2" />
              Standard Section
            </Button>
            <Button variant="outline" className="w-full" onClick={() => addSection('calculation')}>
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
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={(event: DragEndEvent) => handleRowDragEnd(section.id, event)}
                >
                  <SortableContext
                    items={section.rows.map((row) => row.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    {section.rows.map((row) => (
                      <SortableRow key={row.id} row={row} sectionId={section.id}>
                        <DndContext
                          sensors={sensors}
                          collisionDetection={closestCenter}
                          onDragEnd={(event: DragEndEvent) => handleFieldDragEnd(section.id, row.id, event)}
                        >
                          <SortableContext
                            items={row.fields.map((field) => field.id)}
                            strategy={horizontalListSortingStrategy}
                          >
                            <div className="grid grid-cols-12 gap-4 mb-4">
                              {row.fields.map((field) => (
                                <div key={field.id} className={`col-span-${field.colSpan || 12}`}>
                                  <SortableField
                                    field={field}
                                    sectionId={section.id}
                                    rowId={row.id}
                                  >
                                    {renderFieldEditor(field, section.id, row.id)}
                                  </SortableField>
                                </div>
                              ))}
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => addField(section.id, row.id, 'text')}
                                className="text-blue-600"
                              >
                                <Plus className="w-4 h-4 mr-1" />
                                Add Field
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeRow(section.id, row.id)}
                                className="text-red-500 ml-2"
                              >
                                Remove Row
                              </Button>
                            </div>
                          </SortableContext>
                        </DndContext>
                      </SortableRow>
                    ))}
                  </SortableContext>
                </DndContext>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => addRow(section.id)}
                  className="text-green-600 mt-2"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Row
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
