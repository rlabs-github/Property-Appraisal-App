// src/pages/tools/DocumentGenerationPage.tsx
import { type NextPage } from 'next';
import ProtectedPage from '@/components/auth/ProtectedPage';
import { DocumentGenerator } from '@/components/appraisal-tools/documents/DocumentGenerator';
import { useApp } from '@/contexts/AppContext';
import { templateService } from '@/lib/api/template.service';

const DocumentGeneratorPage: NextPage = () => {
  const { showNotification } = useApp();

  const handleGenerate = async (generationData: any) => {
    try {
      const blob = await templateService.generateDocument(generationData.templateId, generationData);

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = generationData.filename || 'generated-document.pdf';
      a.click();
      window.URL.revokeObjectURL(url);

      showNotification('success', 'Document generated successfully');
    } catch (error) {
      console.error('Document generation error:', error);
      showNotification('error', 'Failed to generate document');
    }
  };

  return (
    <ProtectedPage>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold">Document Generator</h1>
        <DocumentGenerator onGenerate={handleGenerate} />
      </div>
    </ProtectedPage>
  );
};

export default DocumentGeneratorPage;
