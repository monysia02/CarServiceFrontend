import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Car } from '../types/car.ts';

export type GetCarsResponse = {
  data: Car[];
  currentPage: number;
  pageSize: number;
  totalCount: number;
};

const fetchCars = async (search?: string): Promise<GetCarsResponse> => {
  let url = 'http://localhost:5174/api/Car';

  if (search?.trim()) {
    const encoded = encodeURIComponent(`vin|registrationNumber@=*${search}`);
    url += `?Filters=${encoded}`;
  }

  const { data } = await axios.get<GetCarsResponse>(url);
  return data;
};

export const useGetCarsQuery = (search?: string) => {
  return useQuery({
    queryKey: ['cars', search],
    queryFn: () => fetchCars(search),
    staleTime: 1000 * 60 * 5,
  });
};
