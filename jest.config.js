module.exports = {
  preset: 'next/babel',  // Use Next.js Babel preset
  testEnvironment: 'jsdom',  // Change from 'node' to 'jsdom' for React component testing
  roots: ['<rootDir>/src', '<rootDir>/tests'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',  // Map '@' alias to 'src' directory
  },
  setupFilesAfterEnv: ['<rootDir>/tests/setup.ts'],  // Setup file if needed
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/types/**/*',
  ],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',  // Ensure TypeScript files are handled by ts-jest
  },
  // Optionally, you can enable this if you want to make testing more efficient with Next.js
  transformIgnorePatterns: [
    "/node_modules/(?!(@next|react)/)"
  ],
};
