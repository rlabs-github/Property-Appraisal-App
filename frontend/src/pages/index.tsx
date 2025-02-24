// src/pages/index.tsx
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import type { NextPage } from 'next';

const Home: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to dashboard on mount
    router.push('/dashboard');
  }, [router]);

  // Return null or a loading state while redirecting
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
    </div>
  );
};

export default Home;