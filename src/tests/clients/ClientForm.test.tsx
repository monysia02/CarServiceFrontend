import { describe, expect, it } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { ClientForm } from '../../modules/Clients/components/client-form';

const renderWithProviders = (ui: React.ReactElement) => {
  const queryClient = new QueryClient();
  return render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>);
};

describe('ClientForm', () => {
  it('renders all fields', () => {
    renderWithProviders(<ClientForm closeModal={() => {}} />);

    expect(screen.queryAllByText(/Name/i).length).toBeGreaterThan(0);
    expect(screen.queryAllByText(/Surname/i).length).toBeGreaterThan(0);
    expect(screen.queryAllByText(/Phone Number/i).length).toBeGreaterThan(0);
  });

  it('shows validation messages when fields are empty and form is submitted', async () => {
    renderWithProviders(<ClientForm closeModal={() => {}} />);

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(screen.getAllByText(/Name is required/i).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/Surname is required/i).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/Phone Number is required/i).length).toBeGreaterThan(0);
    });
  });
});
