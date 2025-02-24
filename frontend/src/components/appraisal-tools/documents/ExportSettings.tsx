import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';

interface ExportSettings {
 format: 'pdf' | 'docx';
 includeMetadata: boolean;
 compression: boolean;
}

interface ExportSettingsProps {
 settings: ExportSettings;
 onChange: (settings: ExportSettings) => void;
}

export const ExportSettings: React.FC<ExportSettingsProps> = ({
 settings,
 onChange,
}) => {
 return (
   <Card>
     <CardHeader className="border-b">
       <CardTitle>Export Settings</CardTitle>
     </CardHeader>
     <CardContent className="space-y-4 p-6">
       <div className="space-y-2">
         <Label>Output Format</Label>
         <Select
           value={settings.format}
           onValueChange={(value) => onChange({ ...settings, format: value as 'pdf' | 'docx' })}
         >
           <SelectTrigger>
             <SelectValue placeholder="Select format" />
           </SelectTrigger>
           <SelectContent>
             <SelectItem value="pdf">PDF</SelectItem>
             <SelectItem value="docx">Word Document</SelectItem>
           </SelectContent>
         </Select>
       </div>

       <div className="flex items-center justify-between">
         <Label htmlFor="include-metadata">Include Metadata</Label>
         <Switch
           id="include-metadata"
           checked={settings.includeMetadata}
           onCheckedChange={(checked) => onChange({ ...settings, includeMetadata: checked })}
         />
       </div>

       <div className="flex items-center justify-between">
         <Label htmlFor="enable-compression">Enable Compression</Label>
         <Switch
           id="enable-compression"
           checked={settings.compression}
           onCheckedChange={(checked) => onChange({ ...settings, compression: checked })}
         />
       </div>
     </CardContent>
   </Card>
 );
};