// src/components/tools/documents/DataMapper.tsx
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Placeholder {
 key: string;
 description: string;
 type?: 'text' | 'number' | 'date' | 'currency';
 required?: boolean;
}

interface Template {
 placeholders: Placeholder[];
 id?: string;
 name?: string;
}

interface DataMapperProps {
 template: Template | null;
 mappings: Record<string, string>;
 onChange: (mappings: Record<string, string>) => void;
}

export const DataMapper: React.FC<DataMapperProps> = ({
 template,
 mappings,
 onChange,
}) => {
 const handleMappingChange = (key: string, value: string) => {
   onChange({ ...mappings, [key]: value });
 };

 const dataSources = [
   { value: 'form', label: 'Form Data' },
   { value: 'database', label: 'Database' },
   { value: 'manual', label: 'Manual Entry' }
 ];

 return (
   <div className="space-y-6">
     {template?.placeholders?.map((placeholder) => (
       <div key={placeholder.key} className="space-y-2">
         <Label htmlFor={placeholder.key} className="text-sm font-medium">
           {placeholder.description}
           {placeholder.required && <span className="text-red-500 ml-1">*</span>}
         </Label>
         <div className="flex gap-3">
           <div className="flex-1">
             <Input
               id={placeholder.key}
               value={mappings[placeholder.key] || ''}
               onChange={(e) => handleMappingChange(placeholder.key, e.target.value)}
               placeholder={`Enter value for ${placeholder.description}`}
               type={placeholder.type === 'number' ? 'number' : 'text'}
               className="w-full"
             />
           </div>
           <Select
             value={mappings[`${placeholder.key}_source`] || ''}
             onValueChange={(value) => 
               handleMappingChange(`${placeholder.key}_source`, value)
             }
           >
             <SelectTrigger className="w-[180px]">
               <SelectValue placeholder="Select source" />
             </SelectTrigger>
             <SelectContent>
               {dataSources.map((source) => (
                 <SelectItem key={source.value} value={source.value}>
                   {source.label}
                 </SelectItem>
               ))}
             </SelectContent>
           </Select>
         </div>
       </div>
     ))}
   </div>
 );
};