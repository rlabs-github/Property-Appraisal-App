// src/components/auth/AuthLayout.tsx
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;