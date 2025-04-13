import axios from 'axios';
import { useMutation } from '@tanstack/react-query';

export interface FinishRepairRequest {
  repairId: string;
  finalPrice: number;
}

async function finishRepair({ repairId, finalPrice }: FinishRepairRequest): Promise<void> {
  await axios.patch(`http://localhost:5174/api/Repair/finishRepair?repairId=${repairId}&finalPrice=${finalPrice}`);
}

type UseFinishRepairMutationOptions = {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
};

export function useFinishRepairMutation({ onSuccess, onError }: UseFinishRepairMutationOptions = {}) {
  return useMutation<void, Error, FinishRepairRequest>({
    mutationFn: finishRepair,
    onSuccess,
    onError,
  });
}
