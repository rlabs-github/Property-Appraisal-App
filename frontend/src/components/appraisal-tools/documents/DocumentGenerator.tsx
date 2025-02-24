// src/components/tools/documents/DocumentGenerator.tsx
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileDown, Settings } from 'lucide-react';
import { DataMapper } from './DataMapper';
import { ExportSettings } from './ExportSettings';

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

export const DocumentGenerator: React.FC = () => {
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
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
      const response = await fetch('/api/templates');
      const data = await response.json();
      setTemplates(data);
    } catch (error) {
      // Handle error
    }
  };

  const handleGenerate = async () => {
    try {
      const response = await fetch('/api/documents/generate', {
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
      // Handle error
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