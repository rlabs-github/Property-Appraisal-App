import { type NextPage } from 'next';
import ProtectedPage from '@/components/auth/ProtectedPage';
import { TemplateBuilder } from '@/components/appraisal-tools/templates/TemplateBuilder';
import { useApp } from '@/contexts/AppContext';

const TemplateBuilderPage: NextPage = () => {
  const { showNotification } = useApp();

  const handleSaveTemplate = async (templateData: any) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/templates`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(templateData),
    });

    if (response.ok) {
      showNotification('success', 'Template saved successfully');
    }
  } catch (error) {
    showNotification('error', 'Failed to save template');
  }
};

  return (
    <ProtectedPage>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Document Template Builder</h1>
        </div>
        <TemplateBuilder onSave={handleSaveTemplate} />
      </div>
    </ProtectedPage>
  );
};

export default TemplateBuilderPage;