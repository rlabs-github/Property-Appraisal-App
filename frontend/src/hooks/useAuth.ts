// src/hooks/useAuth.ts
import { useQuery } from '@tanstack/react-query';
import { User } from '@/types';
import { api } from '@/lib/api/api';

export const useAuth = () => {
  const { data: user, isLoading } = useQuery<User>({
    queryKey: ['user'],
    queryFn: async () => {
      // If needed, add Firebase token here:
      // const token = await firebaseUser.getIdToken();
      const response = await api.get<User>('/users/me', {
        headers: {
          // Authorization: `Bearer ${token}`,
        },
      });
      return response;
    },
  });

  const login = async (email: string, password: string) => {
    try {
      const response = await api.post<{ token: string; user: User }>(
        '/login',
        { email, password }
      );
      return response;
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  return {
    user,
    isLoading,
    login,
  };
};
