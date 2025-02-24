// src/types/common.ts
export interface PaginationParams {
    page: number;
    limit: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }
  
  export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }
  
  export interface ApiError {
    message: string;
    code?: string;
    details?: Record<string, any>;
  }
  
  export interface AuditInfo {
    createdBy: string;
    updatedBy: string;
    createdAt: string;
    updatedAt: string;
  }