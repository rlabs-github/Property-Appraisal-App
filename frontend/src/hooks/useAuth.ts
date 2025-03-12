// src/hooks/useAuth.ts
import { useQuery } from '@tanstack/react-query';
import { User } from '@/types';

export const useAuth = () => {
  const { data: user, isLoading } = useQuery<User>({
    queryKey: ['user'],
    queryFn: async () => {
      // Replace with actual API call
      const response = await fetch('/api/me');
      if (!response.ok) {
        throw new Error('Failed to fetch user');
      }
      return response.json();
    },
  });

  // ✅ Add login function
  const login = async (email: string, password: string) => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Invalid login credentials');
      }

      return await response.json();
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  return {
    user,
    isLoading,
    login, // ✅ Now `login` is part of the returned object
  };
};