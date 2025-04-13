import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { Repair } from '../types/repair';

export type UpdateRepairRequest = {
  repairId: string;
  carId: string;
  description: string;
  employeeIds: string[];
  status: string;
};

const updateRepair = async (repair: UpdateRepairRequest): Promise<Repair> => {
  const { data } = await axios.put<Repair>('http://localhost:5174/api/Repair', repair);
  return data;
};

type UsePutRepairMutationOptions = {
  onSuccess?: (data: Repair) => void;
  onError?: (error: unknown) => void;
};

export const usePutRepairMutation = ({ onSuccess, onError }: UsePutRepairMutationOptions = {}) => {
  return useMutation<Repair, unknown, UpdateRepairRequest>({
    mutationFn: updateRepair,
    onSuccess,
    onError,
  });
};
