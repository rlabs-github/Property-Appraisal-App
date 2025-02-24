import React from 'react';
import { FileText, Plus, Edit2, Trash2, Download } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

const TemplatesList = () => {
  const templates = [
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
  ];

  return (
    <div>
      <div className="flex justify-between mb-6">
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center">
          <Plus className="h-5 w-5 mr-2" />
          New Template
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map(template => (
          <Card key={template.id} className="hover:border-blue-500 transition-colors">
            <CardHeader>
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
                <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md">
                  <Edit2 className="h-5 w-5" />
                </button>
                <button className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-md">
                  <Download className="h-5 w-5" />
                </button>
                <button className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-md">
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TemplatesList;