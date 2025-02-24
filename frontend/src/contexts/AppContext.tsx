// src/contexts/AppContext.tsx
import { createContext, useContext, useState, ReactNode } from 'react';

interface AppContextType {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
  clearError: () => void;
  notification: {
    type: 'success' | 'error' | 'info' | null;
    message: string | null;
  };
  showNotification: (type: 'success' | 'error' | 'info', message: string) => void;
  clearNotification: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notification, setNotification] = useState<{
    type: 'success' | 'error' | 'info' | null;
    message: string | null;
  }>({
    type: null,
    message: null,
  });

  const clearError = () => setError(null);

  const showNotification = (
    type: 'success' | 'error' | 'info',
    message: string
  ) => {
    setNotification({ type, message });
    // Auto clear notification after 5 seconds
    setTimeout(clearNotification, 5000);
  };

  const clearNotification = () => {
    setNotification({ type: null, message: null });
  };

  return (
    <AppContext.Provider
      value={{
        isLoading,
        setIsLoading,
        error,
        setError,
        clearError,
        notification,
        showNotification,
        clearNotification,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
