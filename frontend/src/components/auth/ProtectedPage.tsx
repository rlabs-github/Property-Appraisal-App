// src/components/auth/ProtectedPage.tsx
import { useRouter } from 'next/router';
import { useAuth } from '@/hooks/useAuth';

interface ProtectedPageProps {
  children: React.ReactNode;
}

export const ProtectedPage = ({ children }: ProtectedPageProps) => {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    // This shouldn't normally happen due to middleware
    // but adds an extra layer of protection
    router.push(`/login?from=${router.asPath}`);
    return null;
  }

  return <>{children}</>;
};