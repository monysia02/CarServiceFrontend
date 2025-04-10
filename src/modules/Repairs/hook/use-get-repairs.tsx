import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Repair } from '../types/repair.ts';

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
