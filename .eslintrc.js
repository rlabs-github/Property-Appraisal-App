module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'eslint-config-next', // Add Next.js ESLint config
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'react'],
  settings: {
    react: {
      version: 'detect', // Automatically detect React version
    },
  },
  rules: {
    'react/react-in-jsx-scope': 'off', // Not needed with Next.js
    '@typescript-eslint/explicit-module-boundary-types': 'off', // Optional, based on your preference
  },
};
