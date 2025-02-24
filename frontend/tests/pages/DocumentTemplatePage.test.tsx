import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { render, screen } from '../utils/test-utils';
import DocumentTemplatePage from '../../components/DocumentTemplatePage';

// Mock the components we're using from shadcn/ui
vi.mock('@/components/ui/card', () => ({
  Card: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  CardHeader: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  CardContent: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

describe('DocumentTemplatePage', () => {
  it('renders without crashing', () => {
    render(<DocumentTemplatePage />);
    expect(screen.getByText('Document Templates')).toBeInTheDocument();
  });

  it('displays template list', () => {
    render(<DocumentTemplatePage />);
    expect(screen.getByText('Commercial Appraisal Report')).toBeInTheDocument();
    expect(screen.getByText('Residential Appraisal Report')).toBeInTheDocument();
  });

  it('shows import and new template buttons', () => {
    render(<DocumentTemplatePage />);
    expect(screen.getByText('Import Template')).toBeInTheDocument();
    expect(screen.getByText('New Template')).toBeInTheDocument();
  });
});