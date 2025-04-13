import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Employee } from '../types/employee.ts';

export type GetEmployeesResponse = {
  data: Employee[];
  currentPage: number;
  pageSize: number;
  totalCount: number;
};

const fetchEmployees = async (search?: string): Promise<GetEmployeesResponse> => {
  let url = 'http://localhost:5174/api/Employee';

  if (search?.trim()) {
    const encoded = encodeURIComponent(`name|surName@=*${search}`);
    url += `?Filters=${encoded}`;
  }

  const { data } = await axios.get<GetEmployeesResponse>(url);
  return data;
};

export const useGetEmployeesQuery = (search?: string) => {
  return useQuery({
    queryKey: ['employees', search],
    queryFn: () => fetchEmployees(search),
    staleTime: 1000 * 60 * 5,
  });
};
