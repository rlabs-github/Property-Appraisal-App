// src/utils/storage.ts
const STORAGE_PREFIX = 'property_appraisal_';

export const storage = {
  get: <T>(key: string): T | null => {
    const item = localStorage.getItem(`${STORAGE_PREFIX}${key}`);
    return item ? JSON.parse(item) : null;
  },

  set: <T>(key: string, value: T): void => {
    localStorage.setItem(`${STORAGE_PREFIX}${key}`, JSON.stringify(value));
  },

  remove: (key: string): void => {
    localStorage.removeItem(`${STORAGE_PREFIX}${key}`);
  },

  clear: (): void => {
    Object.keys(localStorage)
      .filter(key => key.startsWith(STORAGE_PREFIX))
      .forEach(key => localStorage.removeItem(key));
  },
};