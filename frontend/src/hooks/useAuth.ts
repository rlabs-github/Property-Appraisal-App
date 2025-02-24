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

  return {
    user,
    isLoading,
  };
};