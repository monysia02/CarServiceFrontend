import { describe, expect, it, vi } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { FinishRepairModal } from '../../modules/Repairs/components/finish-repair-modal';

const mockFinishRepair = vi.fn();
vi.mock('../../modules/Repairs/hook/use-finish-repair', () => ({
  useFinishRepairMutation: ({ onSuccess }: any) => ({
    mutate: (data: any) => {
      mockFinishRepair(data);
      onSuccess();
    },
    isPending: false,
  }),
}));

vi.mock('../../modules/Repairs/hook/use-get-repairs', () => ({
  useGetRepairsQuery: () => ({
    refetch: vi.fn(),
  }),
}));

const renderWithProviders = (ui: React.ReactElement) => {
  const queryClient = new QueryClient();
  return render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>);
};

describe('FinishRepairModal', () => {
  it('renders and finishes repair', async () => {
    const onCloseMock = vi.fn();

    renderWithProviders(<FinishRepairModal open={true} onClose={onCloseMock} repairId="r123" />);

    expect(screen.getByRole('heading', { name: /finish repair/i, level: 2 })).toBeInTheDocument();

    const input = screen.getByLabelText(/final price/i);
    fireEvent.change(input, { target: { value: '450' } });
    expect(input).toHaveValue(450);

    const button = screen.getByRole('button', { name: /finish repair/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockFinishRepair).toHaveBeenCalledWith({ repairId: 'r123', finalPrice: 450 });
      expect(onCloseMock).toHaveBeenCalled();
    });
  });
});
