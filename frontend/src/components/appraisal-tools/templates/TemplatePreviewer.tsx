
// src/components/tools/templates/TemplatePreviewer.tsx
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface TemplatePreviewerProps {
  template: any;
  onClose: () => void;
}

export const TemplatePreviewer: React.FC<TemplatePreviewerProps> = ({
  template,
  onClose,
}) => {
  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Template Preview</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          {/* Add preview rendering logic here */}
          <div className="border rounded p-4">
            {template?.content}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};