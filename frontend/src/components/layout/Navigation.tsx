// src/components/layout/Navigation.tsx
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  Building2,
  FileText,
  BarChart3,
  Calculator,
  Home,
  Settings,
  ShieldCheck
} from 'lucide-react';

interface NavigationItem {
  text: string;
  icon: JSX.Element;
  path?: string;
  id: string;
  submenu?: {
    text: string;
    path: string;
  }[];
}

export const Navigation = () => {
  const router = useRouter();
  const [activeNav, setActiveNav] = useState('dashboard');

  const navigationItems: NavigationItem[] = [
    {
      text: 'Dashboard',
      icon: <Home className="w-5 h-5" />,
      path: '/dashboard',
      id: 'dashboard'
    },
    {
      text: 'Properties',
      icon: <Building2 className="w-5 h-5" />,
      id: 'properties',
      submenu: [
        { text: 'Active Appraisals', path: 'pages/properties/active' },
        { text: 'Completed Reports', path: 'pages/properties/completed' },
        { text: 'Property Database', path: 'pages/properties/database' }
      ]
    },
    {
      text: 'Appraisal Tools',
      icon: <Calculator className="w-5 h-5" />,
      id: 'tools',
      submenu: [
        { text: 'Form Builder', path: 'pages/tools/form-builder' },
        { text: 'Value Calculator', path: 'pages/tools/calculator' }
      ]
    },
    {
      text: 'Documents',
      icon: <FileText className="w-5 h-5" />,
      id: 'documents',
      submenu: [
        { text: 'Templates', path: 'pages/documents/templates' },
        { text: 'Generated Reports', path: 'pages/documents/reports' }
      ]
    },
    {
      text: 'Market Analysis',
      icon: <BarChart3 className="w-5 h-5" />,
      id: 'analysis',
      submenu: [
        { text: 'Market Trends', path: 'pages/analysis/trends' },
        { text: 'Comparables', path: '/analysis/comparables' }
      ]
    },
    {
      text: 'Administration',
      icon: <ShieldCheck className="w-5 h-5" />,
      id: 'admin',
      submenu: [
        { text: 'User Management', path: '/admin/users' },
        { text: 'Settings', path: '/admin/settings' }
      ]
    }
  ];

  const isActive = (path: string) => router.pathname === path;
  const isActiveSection = (id: string) => activeNav === id;

  return (
    <nav className="w-64 min-h-screen bg-white border-r border-gray-200">
      <div className="p-4">
        <ul className="space-y-2">
          {navigationItems.map((item) => (
            <li key={item.id}>
              {item.path ? (
                <Link 
                  href={item.path}
                  className={`w-full flex items-center p-2 rounded-lg text-sm ${
                    isActive(item.path)
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    {item.icon}
                    <span>{item.text}</span>
                  </div>
                </Link>
              ) : (
                <div>
                  <button
                    onClick={() => setActiveNav(isActiveSection(item.id) ? '' : item.id)}
                    className={`w-full flex items-center justify-between p-2 rounded-lg text-sm ${
                      isActiveSection(item.id)
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      {item.icon}
                      <span>{item.text}</span>
                    </div>
                    <span className="text-gray-400">▼</span>
                  </button>
                  {item.submenu && isActiveSection(item.id) && (
                    <ul className="ml-6 mt-2 space-y-1">
                      {item.submenu.map((subItem) => (
                        <li key={subItem.path}>
                          <Link
                            href={subItem.path}
                            className={`block p-2 text-sm ${
                              isActive(subItem.path)
                                ? 'text-blue-600'
                                : 'text-gray-500 hover:text-gray-900'
                            }`}
                          >
                            {subItem.text}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;