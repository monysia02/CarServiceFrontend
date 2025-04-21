import { describe, expect, it, vi } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Clients } from '../../modules/Clients/clients';

vi.mock('../../modules/Clients/hooks/use-get-clients.tsx', () => ({
  useGetClientsQuery: () => ({
    data: {
      data: [
        {
          customerId: '1',
          name: 'Jan',
          surName: 'Kowalski',
          phoneNumber: '123456789',
        },
      ],
    },
    isLoading: false,
  }),
}));

const renderWithClient = (ui: React.ReactElement) => {
  const queryClient = new QueryClient();
  return render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>);
};

describe('Clients page', () => {
  it('renders page header and client data', async () => {
    renderWithClient(<Clients />);

    expect(await screen.findByText('Customers list')).toBeInTheDocument();
    expect(await screen.findByText('Jan')).toBeInTheDocument();
    expect(await screen.findByText('Jan Kowalski')).toBeInTheDocument();
  });

  it('opens modal when header button is clicked', async () => {
    renderWithClient(<Clients />);
    const user = userEvent.setup();

    const addButton = await screen.findByRole('button', { name: /add/i });
    await user.click(addButton);

    await waitFor(() => {
      expect(screen.getByText(/client form/i)).toBeInTheDocument();
    });
  });
});
