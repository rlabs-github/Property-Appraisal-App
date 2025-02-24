// src/lib/routes.ts
// Keep path constants for consistent navigation
export const PATHS = {
  HOME: '/',
  DOCUMENTS: {
    TEMPLATES: '/documents/templates',
  },
  TOOLS: {
    FORM_BUILDER: '/tools/form-builder',
    FORM_FILLER: '/tools/form-filler',
  },
} as const;

// Add helper for type-safe navigation (useful with Next.js)
export const createHref = (path: keyof typeof PATHS | string, params?: Record<string, string>) => {
  let href = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      href = href.replace(`:${key}`, value);
    });
  }
  return href;
};

// Move navigation authorization logic to middleware.ts