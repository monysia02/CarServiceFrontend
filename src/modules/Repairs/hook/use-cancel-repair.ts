import axios from 'axios';
import { useMutation } from '@tanstack/react-query';

async function cancelRepair(repairId: string): Promise<void> {
  await axios.patch(`http://localhost:5174/api/Repair/cancelRepair?repairId=${repairId}`);
}

type UseCancelRepairMutationOptions = {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
};

export function useCancelRepairMutation({ onSuccess, onError }: UseCancelRepairMutationOptions = {}) {
  return useMutation<void, Error, string>({
    mutationFn: cancelRepair,
    onSuccess,
    onError,
  });
}
