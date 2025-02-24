// src/components/tools/templates/TemplateBuilder.tsx
import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Save, Eye } from 'lucide-react';
import { TemplatePreviewer } from './TemplatePreviewer';
import { TemplateSettings } from './TemplateSettings';

interface Template {
  id: string;
  name: string;
  content: string;
  settings: TemplateSettings;
}

interface TemplateSettings {
  format: 'docx' | 'pdf';
  margins: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
  placeholders: Array<{
    key: string;
    type: 'text' | 'number' | 'date';
    description: string;
  }>;
}

export const TemplateBuilder: React.FC = () => {
  const [template, setTemplate] = useState<Template | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  const handleSave = async () => {
    if (!template) return;
    
    try {
      const response = await fetch('/api/templates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(template),
      });
      
      if (!response.ok) throw new Error('Failed to save template');
      
      // Handle successful save
    } catch (error) {
      // Handle error
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Template Builder</h2>
        <div className="space-x-2">
          <Button onClick={() => setShowPreview(true)} variant="outline">
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </Button>
          <Button onClick={handleSave}>
            <Save className="w-4 h-4 mr-2" />
            Save Template
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          {/* Template Editor */}
          <Card>
            <CardHeader>
              <h3 className="font-medium">Template Content</h3>
            </CardHeader>
            <CardContent>
              {/* Add your rich text editor or template editing interface here */}
            </CardContent>
          </Card>
        </div>

        <div className="col-span-1">
          <TemplateSettings
            settings={template?.settings}
            onChange={(settings) => 
              setTemplate(prev => prev ? { ...prev, settings } : null)
            }
          />
        </div>
      </div>

      {showPreview && (
        <TemplatePreviewer
          template={template}
          onClose={() => setShowPreview(false)}
        />
      )}
    </div>
  );
};