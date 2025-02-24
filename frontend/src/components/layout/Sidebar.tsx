// src/layouts/components/Sidebar.tsx
import { NavLink } from 'react-router-dom';
import { 
  Home,
  Building2,
  FileText,
  BarChart3,
  Settings,
  Calculator
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', path: '/dashboard', icon: Home },
  { name: 'Properties', path: '/properties', icon: Building2 },
  { name: 'Documents', path: '/documents', icon: FileText },
  { name: 'Analysis', path: '/analysis', icon: BarChart3 },
  { name: 'Tools', path: '/tools', icon: Calculator },
  { name: 'Settings', path: '/settings', icon: Settings },
];

const Sidebar = () => {
  return (
    <aside className="w-64 bg-white border-r border-gray-200">
      <nav className="p-4 space-y-1">
        {navigation.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }: { isActive: boolean }) =>
              `flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                isActive
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-700 hover:bg-gray-50'
              }`
            }
          >
            <item.icon className="w-5 h-5 mr-3" />
            {item.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;