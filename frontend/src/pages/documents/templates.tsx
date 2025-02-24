// src/pages/documents/templates.tsx
import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import DocumentTemplates from '@/components/appraisal-tools/documents/DocumentTemplates';
import { FileText, Plus, Edit2, Trash2, Download, Upload } from 'lucide-react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useApp } from '@/contexts/AppContext';
import { ProtectedPage } from '@/components/auth/ProtectedPage';

interface Template {
  id: string;
  name: string;
  description: string;
  lastModified: string;
  format: string;
}

const TemplatesPage: NextPage = () => {
  const [templates, setTemplates] = useState<Template[]>([
    {
      id: '1',
      name: 'Commercial Appraisal Report',
      description: 'Standard commercial property appraisal template',
      lastModified: '2024-03-15',
      format: 'docx'
    },
    {
      id: '2',
      name: 'Residential Appraisal Form',
      description: 'Comprehensive residential property assessment',
      lastModified: '2024-03-14',
      format: 'docx'
    }
  ]);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [editMode, setEditMode] = useState(false);
  const { showNotification, setIsLoading } = useApp();

  const handleTemplateUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsLoading(true);
      // Simulated upload delay
      setTimeout(() => {
        setIsLoading(false);
        showNotification('Template uploaded successfully', 'success');
      }, 1000);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-4">
          <label className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50">
            <Upload className="h-5 w-5 mr-2" />
            Import Template
            <input
              type="file"
              accept=".docx"
              className="hidden"
              onChange={handleTemplateUpload}
            />
          </label>
          <Button className="flex items-center">
            <Plus className="h-5 w-5 mr-2" />
            New Template
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map(template => (
          <Card key={template.id} className="hover:border-blue-500 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="flex items-center space-x-3">
                <FileText className="h-6 w-6 text-blue-500" />
                <h2 className="text-lg font-semibold">{template.name}</h2>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">{template.description}</p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>Last modified: {new Date(template.lastModified).toLocaleDateString()}</span>
                <span className="uppercase">{template.format}</span>
              </div>
              <div className="mt-4 flex justify-end space-x-2">
                <Button variant="ghost" size="icon" onClick={() => {
                  setSelectedTemplate(template);
                  setEditMode(true);
                }}>
                  <Edit2 className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Download className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Trash2 className="h-5 w-5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedTemplate && editMode && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-3/4 max-h-[80vh] overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4">Edit Template</h2>
            {/* Template editor content */}
          </div>
        </div>
      )}
    </div>
  );
};

// Wrap the page with ProtectedPage component
export default function Templates() {
  return (
    <ProtectedPage>
      <TemplatesPage />
    </ProtectedPage>
  );
}