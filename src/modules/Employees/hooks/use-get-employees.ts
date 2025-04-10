import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Employee } from '../types/employee.ts';

export type GetEmployeesResponse = {
  data: Employee[];
  currentPage: number;
  pageSize: number;
  totalCount: number;
};

const fetchEmployees = async (): Promise<GetEmployeesResponse> => {
  const { data } = await axios.get<GetEmployeesResponse>('http://localhost:5174/api/Employee');
  return data;
};

export const useGetEmployeesQuery = () => {
  return useQuery({
    queryKey: ['employees'],
    queryFn: fetchEmployees,
    staleTime: 1000 * 60 * 5,
  });
};
