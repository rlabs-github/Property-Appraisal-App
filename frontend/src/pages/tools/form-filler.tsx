// pages/tools/form-filler.tsx
// pages/tools/form-filler.tsx
import { type NextPage } from 'next';
import { useState, useEffect } from 'react';
import ProtectedPage from '@/components/auth/ProtectedPage';
import FormFiller from '@/components/appraisal-tools/forms/FormFiller';
import { useApp } from '@/contexts/AppContext';
import { api } from '@/lib/api/api';
import type { FormTemplate } from '@/types/form'; // ✅ Updated import

const FormFillerPage: NextPage = () => {
  const [templates, setTemplates] = useState<FormTemplate[]>([]); // ✅ Updated type
  const { showNotification, setIsLoading } = useApp();

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    setIsLoading(true);
    try {
      const data = await api.get<FormTemplate[]>('/form-templates'); // ✅ Updated type
      setTemplates(data);
    } catch (error) {
      console.error('Template fetch error:', error);
      showNotification('error', 'Failed to load templates');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (formData: any) => {
    try {
      await api.post('/form-submissions', formData);
      showNotification('success', 'Form submitted successfully');
    } catch (error) {
      console.error('Form submission error:', error);
      showNotification('error', 'Failed to submit form');
    }
  };

  return (
    <ProtectedPage>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold">Form Filler</h1>
        <FormFiller 
          templates={templates as FormTemplate[]} 
          onSubmit={handleSubmit} 
        />
      </div>
    </ProtectedPage>
  );
};

export default FormFillerPage;
