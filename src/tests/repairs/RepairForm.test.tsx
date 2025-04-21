import { act } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Repairs } from '../../modules/Repairs/repairs';

const renderWithProviders = (ui: React.ReactElement) => {
  const queryClient = new QueryClient();
  return render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>);
};

vi.mock('../../modules/Repairs/hook/use-get-repairs', () => ({
  useGetRepairsQuery: () => ({
    data: {
      data: [
        {
          repairId: 'r1',
          description: 'Wymiana sprzęgła',
          status: 'New',
          carId: 'c1',
          employeeIds: ['e1'],
        },
      ],
    },
    isLoading: false,
    refetch: () => {},
  }),
}));

describe('Repairs page', () => {
  it('renders page header and repair data', async () => {
    renderWithProviders(<Repairs />);
    expect(await screen.findByText('Repairs list')).toBeInTheDocument();
    expect(await screen.findByText('Wymiana sprzęgła')).toBeInTheDocument();
  });

  it('opens modal when header button is clicked', async () => {
    renderWithProviders(<Repairs />);

    const addButton = await screen.findByRole('button', { name: /add/i });
    await act(async () => {
      fireEvent.click(addButton);
    });

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /new repair/i })).toBeInTheDocument();
    });
  });
});
