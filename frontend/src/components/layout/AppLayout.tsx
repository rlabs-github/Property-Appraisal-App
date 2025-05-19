import { FC, ReactNode, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import {
  Bell,
  Settings,
  User,
  Home,
  Building2,
  Calculator,
  FileText,
  BarChart3,
  ShieldCheck,
} from 'lucide-react';
import { api } from '@/lib/api/api';

// Types
interface NavLink {
  text: string;
  path: string;
}

interface NavItemProps {
  icon: ReactNode;
  text: string;
  path?: string;
  submenu?: NavLink[];
  requiredRole?: 'admin' | 'appraiser' | 'viewer';
}

interface LayoutConfig {
  showHeader?: boolean;
  showSidebar?: boolean;
  showStatusBar?: boolean;
  containerClassName?: string;
}

interface AppLayoutProps {
  children: ReactNode;
  config?: LayoutConfig;
}

interface AppraisalStats {
  activeReports: number;
  pendingReviews: number;
  dueToday: number;
  lastUpdated: string;
}

// Loading Overlay Component
const LoadingOverlay: FC = () => (
  <div className="absolute inset-0 bg-white/50 flex items-center justify-center z-50">
    <div className="flex flex-col items-center space-y-4">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
      <span className="text-sm text-gray-600">Loading...</span>
    </div>
  </div>
);

// Updated Status Bar Component
const StatusBar: FC = () => {
  const { data: stats, isLoading } = useQuery<AppraisalStats>({
    queryKey: ['appraisalStats'],
    queryFn: async () => {
      return await api.get<AppraisalStats>('/stats');
    },
    refetchInterval: 30000,
    staleTime: 20000,
  });

  if (isLoading) {
    return <div className="h-10 bg-gray-50" />;
  }

  return (
    <div className="bg-gray-50 px-4 py-2">
      <div className="flex items-center justify-between text-sm">
        <div className="flex space-x-4">
          <span>Active Reports: {stats?.activeReports ?? '-'}</span>
          <span>Pending Reviews: {stats?.pendingReviews ?? '-'}</span>
          <span>Due Today: {stats?.dueToday ?? '-'}</span>
        </div>
        <div>
          Last Updated:{' '}
          {stats?.lastUpdated
            ? new Date(stats.lastUpdated).toLocaleTimeString()
            : '-'}
        </div>
      </div>
    </div>
  );
};

// Nav Item Component
const NavItem: FC<NavItemProps> = ({ icon, text, path, submenu, requiredRole }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const router = useRouter();
  const isActive = path ? router.pathname === path || router.asPath.startsWith(path) : false;

  // Replace with your actual role check logic
  const hasAccess = true; // TODO: implement useHasAccess hook
  if (!hasAccess) return null;

  return (
    <li>
      <button
        onClick={() => setIsExpanded((prev) => !prev)}
        aria-expanded={submenu ? isExpanded : undefined}
        className={`w-full flex items-center justify-between p-2 rounded-lg text-sm ${
          isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
        }`}
      >
        <div className="flex items-center space-x-2">
          {icon}
          {path ? (
            <Link href={path} className="hover:underline">
              {text}
            </Link>
          ) : (
            <span>{text}</span>
          )}
        </div>
        {submenu && <span className="text-gray-400">{isExpanded ? '▲' : '▼'}</span>}
      </button>
      {submenu && isExpanded && (
        <ul className="ml-6 mt-2 space-y-1">
          {submenu.map((item) => (
            <li key={item.text}>
              <Link
                href={item.path}
                className={`block p-2 text-sm ${
                  router.pathname === item.path
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                {item.text}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

// Main Layout Component
const AppLayout: FC<AppLayoutProps> = ({ children, config = {} }) => {
  const {
    showHeader = true,
    showSidebar = true,
    showStatusBar = true,
    containerClassName = ''
  } = config;
  
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleStart = () => setIsLoading(true);
    const handleComplete = () => setIsLoading(false);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router]);

  const navigationItems: NavItemProps[] = [
    {
      text: 'Dashboard',
      icon: <Home className="w-5 h-5" />,
      path: '/dashboard',
    },
    {
      text: 'Properties',
      icon: <Building2 className="w-5 h-5" />,
      submenu: [
        { text: 'Active Appraisals', path: '/properties/active' },
        { text: 'Completed Reports', path: '/properties/completed' },
        { text: 'Property Database', path: '/properties/database' },
      ],
    },
    {
      text: 'Appraisal Tools',
      icon: <Calculator className="w-5 h-5" />,
      submenu: [
        { text: 'Form Builder', path: '/tools/form-builder' },
        { text: 'Value Calculator', path: '/tools/calculator' },
      ],
      requiredRole: 'appraiser',
    },
    {
      text: 'Documents',
      icon: <FileText className="w-5 h-5" />,
      submenu: [
        { text: 'Templates', path: '/documents/templates' },
        { text: 'Generated Reports', path: '/documents/reports' },
      ],
    },
    {
      text: 'Market Analysis',
      icon: <BarChart3 className="w-5 h-5" />,
      submenu: [
        { text: 'Market Trends', path: '/analysis/trends' },
        { text: 'Comparables', path: '/analysis/comparables' },
      ],
      requiredRole: 'appraiser',
    },
    {
      text: 'Administration',
      icon: <ShieldCheck className="w-5 h-5" />,
      submenu: [
        { text: 'User Management', path: '/admin/users' },
        { text: 'Settings', path: '/admin/settings' },
      ],
      requiredRole: 'admin',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {showHeader && (
        <header className="bg-white border-b border-gray-200">
          <div className="px-4 py-3">
            <div className="flex items-center justify-between">
              <Link href="/dashboard" className="text-xl font-bold text-blue-600">
                PropertyAppraise Pro
              </Link>
              <div className="flex items-center space-x-4">
                <button
                  title="Notifications"
                  className="p-2 text-gray-600 hover:text-gray-900 rounded-full hover:bg-gray-100"
                >
                  <Bell className="w-5 h-5" />
                </button>
                <button
                  title="Settings"
                  className="p-2 text-gray-600 hover:text-gray-900 rounded-full hover:bg-gray-100"
                >
                  <Settings className="w-5 h-5" />
                </button>
                <div className="flex items-center space-x-2 text-sm text-gray-700">
                  <User className="w-5 h-5" />
                  <span>Kyle Hebert</span>
                </div>
              </div>
            </div>
          </div>
          {showStatusBar && <StatusBar />}
        </header>
      )}

      <div className="flex">
        {showSidebar && (
          <nav className="w-64 min-h-screen bg-white border-r border-gray-200" aria-label="Main navigation">
            <div className="p-4">
              <ul className="space-y-2">
                {navigationItems.map((item) => (
                  <NavItem key={item.text} {...item} />
                ))}
              </ul>
            </div>
          </nav>
        )}

        <main className={`flex-1 p-6 relative ${containerClassName}`}>
          {isLoading && <LoadingOverlay />}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6">{children}</div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AppLayout;