import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

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
      if (value) queryParams.append(key, value.toString());
    });

    const response = await fetch(`/api/properties?${queryParams}`);
    if (!response.ok) {
      throw new Error('Failed to fetch properties');
    }
    return response.json();
  };

  const propertiesQuery = useQuery({
    queryKey: ['properties', filters],
    queryFn: fetchProperties
  });

  const createProperty = useMutation({
    mutationFn: async (newProperty: Omit<Property, 'id'>) => {
      const response = await fetch('/api/properties', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProperty)
      });
      
      if (!response.ok) {
        throw new Error('Failed to create property');
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['properties'] });
    }
  });

  const updateProperty = useMutation({
    mutationFn: async ({ id, ...data }: Partial<Property> & { id: string }) => {
      const response = await fetch(`/api/properties/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      
      if (!response.ok) {
        throw new Error('Failed to update property');
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['properties'] });
    }
  });

  const deleteProperty = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/properties/${id}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete property');
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['properties'] });
    }
  });

  return {
    properties: propertiesQuery.data?.properties ?? [],
    totalCount: propertiesQuery.data?.totalCount ?? 0,
    isLoading: propertiesQuery.isLoading,
    isError: propertiesQuery.isError,
    error: propertiesQuery.error,
    createProperty,
    updateProperty,
    deleteProperty
  };
};