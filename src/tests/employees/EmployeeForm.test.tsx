import { describe, expect, it } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { EmployeeForm } from '../../modules/Employees/components/employee-form';

const renderWithProviders = (ui: React.ReactElement) => {
  const queryClient = new QueryClient();
  return render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>);
};

describe('EmployeeForm', () => {
  it('renders all fields', () => {
    renderWithProviders(<EmployeeForm closeModal={() => {}} />);

    expect(screen.queryAllByText(/Name/i).length).toBeGreaterThan(0);
    expect(screen.queryAllByText(/Surname/i).length).toBeGreaterThan(0);
    expect(screen.queryAllByText(/Phone Number/i).length).toBeGreaterThan(0);
    expect(screen.queryAllByText(/Position/i).length).toBeGreaterThan(0);
  });

  it('shows validation messages when fields are empty and form is submitted', async () => {
    renderWithProviders(<EmployeeForm closeModal={() => {}} />);

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(screen.getAllByText(/Name is required/i).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/Surname is required/i).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/Phone Number is required/i).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/Position is required/i).length).toBeGreaterThan(0);
    });
  });
});
