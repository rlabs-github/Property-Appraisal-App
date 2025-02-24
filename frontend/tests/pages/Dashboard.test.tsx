import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Dashboard from '../../src/pages/Dashboard';

vi.mock('lucide-react', () => ({
  Bell: () => <div data-testid="bell-icon" />,
  Settings: () => <div data-testid="settings-icon" />,
  User: () => <div data-testid="user-icon" />,
}));

describe('Dashboard', () => {
  it('renders without crashing', () => {
    render(<Dashboard />);
    expect(screen.getByText('PropertyAppraise Pro')).toBeInTheDocument();
  });

  it('displays active appraisals section', () => {
    render(<Dashboard />);
    expect(screen.getByText('Active Appraisals')).toBeInTheDocument();
  });

  it('shows navigation tabs', () => {
    render(<Dashboard />);
    expect(screen.getByText('Overview')).toBeInTheDocument();
    expect(screen.getByText('Property Details')).toBeInTheDocument();
  });
});