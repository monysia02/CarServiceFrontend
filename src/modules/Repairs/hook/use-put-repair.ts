import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { Repair } from '../types/repair.ts';

const updateRepair = async (repair: Repair): Promise<Repair> => {
  const { data } = await axios.put<Repair>(`http://localhost:5174/api/Repair/`, repair);
  return data;
};

type UsePutRepairMutationOptions = {
  onSuccess?: (data: Repair) => void;
  onError?: (error: unknown) => void;
};

export const usePutRepairMutation = ({ onSuccess, onError }: UsePutRepairMutationOptions = {}) => {
  return useMutation({
    mutationFn: updateRepair,
    onSuccess,
    onError,
  });
};
