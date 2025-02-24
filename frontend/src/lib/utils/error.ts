// src/utils/error.ts
export class AppError extends Error {
    constructor(
      message: string,
      public code?: string,
      public status?: number,
      public data?: any
    ) {
      super(message);
      this.name = 'AppError';
    }
  }
  
  export const handleError = (error: unknown): AppError => {
    if (error instanceof AppError) {
      return error;
    }
  
    if (error instanceof Error) {
      return new AppError(error.message);
    }
  
    return new AppError('An unknown error occurred');
  };