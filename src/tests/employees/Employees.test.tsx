import { describe, expect, it, vi } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen } from '@testing-library/react';
import { Employees } from '../../modules/Employees/employees';

vi.mock('../../modules/Employees/hooks/use-get-employees', () => ({
  useGetEmployeesQuery: () => ({
    data: {
      data: [
        {
          employeeId: '1',
          name: 'Anna',
          surName: 'Kowalska',
          phoneNumber: '123456789',
          position: 'Manager',
        },
      ],
    },
    isLoading: false,
  }),
}));

const renderWithProviders = (ui: React.ReactElement) => {
  const queryClient = new QueryClient();
  return render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>);
};

describe('Employees page', () => {
  it('renders page header and employee data', async () => {
    renderWithProviders(<Employees />);

    expect(await screen.findByText(/Employees list/i)).toBeInTheDocument();

    expect((await screen.findAllByText((t) => t.includes('Anna'))).length).toBeGreaterThan(0);
    expect((await screen.findAllByText((t) => t.includes('Kowalska'))).length).toBeGreaterThan(0);
  });

  it('opens modal when header button is clicked', () => {
    renderWithProviders(<Employees />);

    const button = screen.getByRole('button', { name: /Add/i });
    fireEvent.click(button);

    expect(screen.getByText(/Employee Form/i)).toBeInTheDocument();
  });
});
