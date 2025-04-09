import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Car } from '../types/car.ts';

export type GetCarsResponse = {
  data: Car[];
  currentPage: number;
  pageSize: number;
  totalCount: number;
};

const fetchCars = async (): Promise<GetCarsResponse> => {
  const { data } = await axios.get<GetCarsResponse>('http://localhost:5174/api/Car');
  return data;
};

export const useGetCarsQuery = () => {
  return useQuery({
    queryKey: ['cars'],
    queryFn: fetchCars,
    staleTime: 1000 * 60 * 5,
  });
};
