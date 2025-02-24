// src/pages/login.tsx
import { type NextPage } from 'next';
import { useRouter } from 'next/router';
import { useAuth } from '@/contexts/AuthContext';

const LoginPage: NextPage = () => {
  const router = useRouter();
  const { from } = router.query;
  const { login } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-center mb-6">Login</h1>
        {/* TODO: Add login form component */}
        <div className="space-y-4">
          <p className="text-sm text-gray-600 text-center">
            Redirecting to: {from || '/dashboard'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;