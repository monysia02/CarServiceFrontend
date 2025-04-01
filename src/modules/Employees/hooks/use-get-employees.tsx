import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

export type Employee = {
  employeeId: string;
  name: string;
  surName: string;
  phoneNumber: string;
  position: string;
};

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
