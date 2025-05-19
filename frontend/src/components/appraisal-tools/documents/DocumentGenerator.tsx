// src/components/tools/documents/DocumentGenerator.tsx
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileDown, Settings } from 'lucide-react';
import { DataMapper } from './DataMapper';
import { ExportSettings } from './ExportSettings';
import { api } from '@/lib/api/api';
import type { DocumentTemplate } from '@/types/template';

interface GeneratorData {
  templateId: string;
  mappings: Record<string, string>;
  exportSettings: ExportSettings;
}

interface ExportSettings {
  format: 'pdf' | 'docx';
  includeMetadata: boolean;
  compression: boolean;
}

interface DocumentGeneratorProps {
  onGenerate: (generationData: GeneratorData) => Promise<void>;
}

export const DocumentGenerator: React.FC<DocumentGeneratorProps> = ({ onGenerate }) => {
  const [templates, setTemplates] = useState<DocumentTemplate[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<DocumentTemplate | null>(null);
  const [generatorData, setGeneratorData] = useState<GeneratorData>({
    templateId: '',
    mappings: {},
    exportSettings: {
      format: 'pdf',
      includeMetadata: true,
      compression: false,
    },
  });

  useEffect(() => {
    // Fetch available templates
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
  try {
    const data = await api.get<DocumentTemplate[]>('/templates');
    setTemplates(data);
  } catch (error) {
    console.error('Failed to fetch templates', error);
  }
};

  const handleGenerate = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/documents/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(generatorData),
      });

    if (!response.ok) throw new Error('Failed to generate document');

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `generated-document.${generatorData.exportSettings.format}`;
    a.click();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Failed to generate document', error);
  }
};

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Document Generator</h2>
        <Button onClick={handleGenerate}>
          <FileDown className="w-4 h-4 mr-2" />
          Generate Document
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <Card>
            <CardHeader>
              <h3 className="font-medium">Data Mapping</h3>
            </CardHeader>
            <CardContent>
              <DataMapper
                template={selectedTemplate}
                mappings={generatorData.mappings}
                onChange={(mappings) =>
                  setGeneratorData((prev) => ({ ...prev, mappings }))
                }
              />
            </CardContent>
          </Card>
        </div>

        <div className="col-span-1">
          <ExportSettings
            settings={generatorData.exportSettings}
            onChange={(exportSettings) =>
              setGeneratorData((prev) => ({ ...prev, exportSettings }))
            }
          />
        </div>
      </div>
    </div>
  );
};