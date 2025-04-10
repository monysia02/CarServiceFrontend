import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

export type Repair = {
  repairId: string;
  createdAt: string;
  finishedAt: string;
  description: string;
  status: string;
  price: string;
};

export type GetRepairsResponse = {
  data: Repair[];
  currentPage: number;
  pageSize: number;
  totalCount: number;
};

const fetchRepairs = async (): Promise<GetRepairsResponse> => {
  const { data } = await axios.get<GetRepairsResponse>('http://localhost:5174/api/Repair');
  return data;
};

export const useGetRepairsQuery = () => {
  return useQuery({
    queryKey: ['repairs'],
    queryFn: fetchRepairs,
    staleTime: 1000 * 60 * 5,
  });
};
