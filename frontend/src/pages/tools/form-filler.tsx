// pages/tools/form-filler.tsx
import { type NextPage } from 'next';
import { useState, useEffect } from 'react';
import { ProtectedPage } from '@/components/auth/ProtectedPage';
import { FormFiller } from '@/components/appraisal-tools/forms/FormFiller';
import { useApp } from '@/contexts/AppContext';

const FormFillerPage: NextPage = () => {
  const [templates, setTemplates] = useState([]);
  const { showNotification, setIsLoading } = useApp();

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/form-templates');
      const data = await response.json();
      setTemplates(data);
    } catch (error) {
      showNotification('error', 'Failed to load templates');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (formData: any) => {
    try {
      const response = await fetch('/api/form-submissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        showNotification('success', 'Form submitted successfully');
      }
    } catch (error) {
      showNotification('error', 'Failed to submit form');
    }
  };

  return (
    <ProtectedPage>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold">Form Filler</h1>
        <FormFiller 
          templates={templates} 
          onSubmit={handleSubmit} 
        />
      </div>
    </ProtectedPage>
  );
};

export default FormFillerPage;