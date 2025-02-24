// src/pages/tools/form-builder.tsx
import { type NextPageWithLayout } from '@/types/next';
import { ProtectedPage } from '@/components/auth/ProtectedPage';
import FormBuilder from '@/components/appraisal-tools/forms/FormBuilder';
import { useApp } from '@/contexts/AppContext';

const FormBuilderPage: NextPageWithLayout = () => {
  const { isLoading, setIsLoading, showNotification } = useApp();

  const handleFormSave = async (formData: { name: string; sections: any[] }) => {
    try {
      setIsLoading(true);
      // TODO: Implement API call to save form
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      showNotification('success', 'Form template saved successfully');
    } catch (error) {
      showNotification('error', 'Failed to save form template');
      console.error('Error saving form:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
      </div>
    );
  }

  return (
    <ProtectedPage>
      <FormBuilder 
        onSave={handleFormSave}
        // You can add initialData here if needed
        // initialData={{
        //   name: '',
        //   sections: []
        // }}
      />
    </ProtectedPage>
  );
};

export default FormBuilderPage;