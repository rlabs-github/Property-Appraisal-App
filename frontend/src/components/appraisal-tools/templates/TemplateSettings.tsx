
// src/components/tools/templates/TemplateSettings.tsx
import React from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface TemplateSettingsProps {
  settings?: any;
  onChange: (settings: any) => void;
}

export const TemplateSettings: React.FC<TemplateSettingsProps> = ({
  settings,
  onChange,
}) => {
  return (
    <Card>
      <CardHeader>
        <h3 className="font-medium">Template Settings</h3>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label>Format</Label>
          <select
            value={settings?.format}
            onChange={(e) => 
              onChange({ ...settings, format: e.target.value })
            }
            className="w-full mt-1 border rounded-md p-2"
          >
            <option value="docx">Word Document</option>
            <option value="pdf">PDF</option>
          </select>
        </div>

        <div>
          <Label>Margins</Label>
          <div className="grid grid-cols-2 gap-2 mt-1">
            <Input
              type="number"
              placeholder="Top"
              value={settings?.margins?.top}
              onChange={(e) =>
                onChange({
                  ...settings,
                  margins: { ...settings?.margins, top: e.target.value },
                })
              }
            />
            <Input
              type="number"
              placeholder="Bottom"
              value={settings?.margins?.bottom}
              onChange={(e) =>
                onChange({
                  ...settings,
                  margins: { ...settings?.margins, bottom: e.target.value },
                })
              }
            />
            <Input
              type="number"
              placeholder="Left"
              value={settings?.margins?.left}
              onChange={(e) =>
                onChange({
                  ...settings,
                  margins: { ...settings?.margins, left: e.target.value },
                })
              }
            />
            <Input
              type="number"
              placeholder="Right"
              value={settings?.margins?.right}
              onChange={(e) =>
                onChange({
                  ...settings,
                  margins: { ...settings?.margins, right: e.target.value },
                })
              }
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};