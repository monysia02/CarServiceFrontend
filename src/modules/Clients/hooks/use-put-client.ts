import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { Client } from '../types/client.ts';

const updateClient = async (client: Client): Promise<Client> => {
  const { data } = await axios.put<Client>(`http://localhost:5174/api/Customer/`, client);
  return data;
};

type UsePutClientMutationOptions = {
  onSuccess?: (data: Client) => void;
  onError?: (error: unknown) => void;
};

export const usePutClientMutation = ({ onSuccess, onError }: UsePutClientMutationOptions = {}) => {
  return useMutation({
    mutationFn: updateClient,
    onSuccess,
    onError,
  });
};
