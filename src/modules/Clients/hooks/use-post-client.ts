import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { Client } from '../types/client.ts';

export type CreateClientRequest = {
  name: string;
  surName: string;
  phoneNumber: string;
};

const createClient = async (newClient: CreateClientRequest): Promise<Client> => {
  const { data } = await axios.post<Client>('http://localhost:5174/api/Customer', newClient);
  return data;
};

type UseCreateClientMutationOptions = {
  onSuccess?: (data: Client) => void;
  onError?: (error: unknown) => void;
};

export const useCreateClientMutation = ({ onSuccess, onError }: UseCreateClientMutationOptions = {}) => {
  return useMutation({
    mutationFn: createClient,
    onSuccess,
    onError,
  });
};
