import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { Repair } from '../types/repair.ts';

export type CreateRepairRequest = {
  createdAt: Date;
  //finishedAt: Date;
  status: string; //??
  price: number;
  description: string;
};

const createRepair = async (newRepair: CreateRepairRequest): Promise<Repair> => {
  const { data } = await axios.post<Repair>('http://localhost:5174/api/Repair', newRepair);
  return data;
};

type UseCreateRepairMutationOptions = {
  onSuccess?: (data: Repair) => void;
  onError?: (error: unknown) => void;
};

export const useCreateRepairMutation = ({ onSuccess, onError }: UseCreateRepairMutationOptions = {}) => {
  return useMutation({
    mutationFn: createRepair,
    onSuccess,
    onError,
  });
};
