import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Client } from '../types/client.ts';

export type GetClientsResponse = {
  data: Client[];
  currentPage: number;
  pageSize: number;
  totalCount: number;
};

const fetchClients = async (): Promise<GetClientsResponse> => {
  const { data } = await axios.get<GetClientsResponse>('http://localhost:5174/api/Customer');
  return data;
};

export const useGetClientsQuery = () => {
  return useQuery({
    queryKey: ['customers'],
    queryFn: fetchClients,
    staleTime: 1000 * 60 * 5,
  });
};
