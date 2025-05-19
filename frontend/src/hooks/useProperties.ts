//src/hooks/useProperties.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api/api';

interface Property {
  id: string;
  name: string;
  address: string;
  status: 'active' | 'pending' | 'completed';
  lastModified: string;
}

interface PropertyResponse {
  properties: Property[];
  totalCount: number;
}

interface PropertyFilters {
  status?: string;
  search?: string;
  page?: number;
  limit?: number;
}

export const useProperties = (filters: PropertyFilters = {}) => {
  const queryClient = useQueryClient();

  const fetchProperties = async (): Promise<PropertyResponse> => {
    const queryParams = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        queryParams.append(key, value.toString());
      }
    });

    return await api.get<PropertyResponse>(`/properties?${queryParams}`);
  };

  const propertiesQuery = useQuery({
    queryKey: ['properties', filters],
    queryFn: fetchProperties,
  });

  const createProperty = useMutation({
    mutationFn: async (newProperty: Omit<Property, 'id'>) => {
      return await api.post<Property>('/properties', newProperty);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['properties'] });
    },
  });

  const updateProperty = useMutation({
    mutationFn: async ({ id, ...data }: Partial<Property> & { id: string }) => {
      return await api.put<Property>(`/properties/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['properties'] });
    },
  });

  const deleteProperty = useMutation({
    mutationFn: async (id: string) => {
      return await api.delete(`/properties/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['properties'] });
    },
  });

  return {
    properties: propertiesQuery.data?.properties ?? [],
    totalCount: propertiesQuery.data?.totalCount ?? 0,
    isLoading: propertiesQuery.isLoading,
    isError: propertiesQuery.isError,
    error: propertiesQuery.error,
    createProperty,
    updateProperty,
    deleteProperty,
  };
};
