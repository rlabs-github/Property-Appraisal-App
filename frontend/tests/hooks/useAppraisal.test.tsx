import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { renderHook } from '../utils/test-utils';
import { useAppraisal } from '../../hooks/useAppraisal';

// Mock TanStack Query
vi.mock('@tanstack/react-query', () => ({
  useQuery: vi.fn(() => ({
    data: null,
    isLoading: false,
    error: null,
  })),
  useMutation: vi.fn(() => ({
    mutate: vi.fn(),
    isLoading: false,
  })),
}));

describe('useAppraisal', () => {
  it('initializes with default values', () => {
    const { result } = renderHook(() => useAppraisal());
    expect(result.current).toBeDefined();
  });

  // Add more specific tests based on your hook's functionality
});