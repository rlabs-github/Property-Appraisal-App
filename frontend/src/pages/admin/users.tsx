import { type NextPageWithLayout } from '@/types/next';
import { ProtectedPage } from '@/components/auth/ProtectedPage';
import UserManagement from '@/components/admin/UserManagement';

const UsersPage: NextPageWithLayout = () => {
  return (
    <ProtectedPage>
      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-4">User Management</h1>
        <UserManagement />
      </div>
    </ProtectedPage>
  );
};

export default UsersPage;