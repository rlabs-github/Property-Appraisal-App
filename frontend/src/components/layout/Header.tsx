// src/layouts/components/Header.tsx
import { Bell, Settings, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Header = () => {
  const { user } = useAuth();

  return (
    <header className="h-16 bg-white border-b border-gray-200">
      <div className="h-full px-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <span className="text-xl font-bold text-blue-600">PropertyAppraise Pro</span>
        </div>
        <div className="flex items-center space-x-4">
          <button 
            title="Bell Button"
            className="p-2 hover:bg-gray-100 rounded-full">
            <Bell className="w-5 h-5 text-gray-600" />
          </button>
          <button 
            title="Settings Button"
            className="p-2 hover:bg-gray-100 rounded-full">
            <Settings className="w-5 h-5 text-gray-600" />
          </button>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-700">{user?.email}</span>
            <User className="w-5 h-5 text-gray-600" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;