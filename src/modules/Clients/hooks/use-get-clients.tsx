import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

export type Customer = {
  customerId: string;
  name: string;
  surName: string;
  phoneNumber: string;
};

export type GetcustomersResponse = {
  data: Customer[];
  currentPage: number;
  pageSize: number;
  totalCount: number;
};

const fetchcustomers = async (): Promise<GetcustomersResponse> => {
  const { data } = await axios.get<GetcustomersResponse>('http://localhost:5174/api/Customer');
  return data;
};

export const useGetcustomersQuery = () => {
  return useQuery({
    queryKey: ['customers'],
    queryFn: fetchcustomers,
    staleTime: 1000 * 60 * 5,
  });
};
