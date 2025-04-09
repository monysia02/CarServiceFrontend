import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Client } from '../types/client.ts';

export type GetClientsResponse = {
  data: Client[];
  currentPage: number;
  pageSize: number;
  totalCount: number;
};

const fetchClients = async (search?: string): Promise<GetClientsResponse> => {
  let url = 'http://localhost:5174/api/Customer';

  if (search?.trim()) {
    const encoded = encodeURIComponent(`surname|name@=*${search}`);
    url += `?Filters=${encoded}`;
  }

  const { data } = await axios.get<GetClientsResponse>(url);
  return data;
};

export const useGetClientsQuery = (search?: string) => {
  return useQuery({
    queryKey: ['customers', search],
    queryFn: () => fetchClients(search),
    staleTime: 1000 * 60 * 5,
  });
};
