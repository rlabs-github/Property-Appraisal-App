/// src/services/api.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const api = {
  get: async <T>(endpoint: string, options?: { headers?: Record<string, string> }): Promise<T> => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(options?.headers || {}), // Merge additional headers if provided
      },
    });
    if (!response.ok) {
      throw new Error('API Error');
    }
    return response.json() as Promise<T>;
  },

  post: async <T>(endpoint: string, data: any): Promise<T> => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('API Error');
    }
    return response.json() as Promise<T>;
  },

  put: async <T>(endpoint: string, data: any): Promise<T> => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('API Error');
    }
    return response.json() as Promise<T>;
  },

  delete: async (endpoint: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('API Error');
    }
  },
};
