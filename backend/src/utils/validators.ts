// src/utils/validators.ts
import { AppError } from '../../src/utils/errors';

export const validateRequired = (value: any, fieldName: string): void => {
    if (value === undefined || value === null || value === '') {
      throw new AppError(400, `${fieldName} is required`);
    }
  };
  
  export const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  export const validatePropertyData = (data: any): void => {
    validateRequired(data.address, 'Property address');
    validateRequired(data.type, 'Property type');
    validateRequired(data.status, 'Property status');
  };