// src/pages/admin/settings.tsx
import { type NextPage } from 'next';
import ProtectedPage from '@/components/auth/ProtectedPage';
import AdminSettings from '@/components/admin/AdminSettings';

const SettingsPage: NextPage = () => {
  return (
    <ProtectedPage>
      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-4">System Settings</h1>
        <AdminSettings />
      </div>
    </ProtectedPage>
  );
};

export default SettingsPage;