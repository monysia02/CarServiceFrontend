import { act } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Cars } from '../../modules/Cars/cars';

vi.mock('../../modules/Cars/hooks/use-get-cars.ts', () => ({
  useGetCarsQuery: () => ({
    data: {
      data: [
        {
          carId: '1',
          brand: 'Toyota',
          model: 'Corolla',
          year: 2020,
          registrationNumber: 'XYZ123',
          vin: '123456789ABCDEFG',
          customerIds: [],
        },
      ],
    },
    isLoading: false,
    refetch: vi.fn(),
  }),
}));

const renderWithProviders = (ui: React.ReactElement) => {
  const queryClient = new QueryClient();
  return render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>);
};

describe('Cars page', () => {
  it('renders page header and car data', async () => {
    renderWithProviders(<Cars />);

    expect(await screen.findByText('Cars list')).toBeInTheDocument();
    expect(await screen.findByText(/Toyota/i)).toBeInTheDocument();
    expect(await screen.findByText(/Corolla/i)).toBeInTheDocument();
  });

  it('opens modal when header button is clicked', async () => {
    renderWithProviders(<Cars />);

    const addButton = await screen.findByRole('button', { name: /add/i });

    await act(async () => {
      fireEvent.click(addButton);
    });

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'Car Form' })).toBeInTheDocument();
    });
  });
});
