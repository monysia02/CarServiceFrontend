import { describe, expect, it } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { CarForm } from '../../modules/Cars/components/car-form';

const renderWithProviders = (ui: React.ReactElement) => {
  const queryClient = new QueryClient();
  return render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>);
};

describe('CarForm', () => {
  it('renders all fields', () => {
    renderWithProviders(<CarForm closeModal={() => {}} />);

    expect(screen.queryAllByText(/Brand/i).length).toBeGreaterThan(0);
    expect(screen.queryAllByText(/Model/i).length).toBeGreaterThan(0);
    expect(screen.queryAllByText(/Year/i).length).toBeGreaterThan(0);
    expect(screen.queryAllByText(/Registration Number/i).length).toBeGreaterThan(0);
    expect(screen.queryAllByText(/VIN/i).length).toBeGreaterThan(0);
    expect(screen.queryAllByText(/Assign Clients/i).length).toBeGreaterThan(0);
  });

  it('shows validation messages when fields are empty and form is submitted', async () => {
    renderWithProviders(<CarForm closeModal={() => {}} />);

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(screen.getAllByText(/Brand is required/i).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/Model is required/i).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/Year is required/i).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/Registration number is required/i).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/VIN is required/i).length).toBeGreaterThan(0);
    });
  });
});
