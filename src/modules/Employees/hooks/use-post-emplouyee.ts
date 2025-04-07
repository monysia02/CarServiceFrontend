import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { Employee } from '../types/employee.ts';

export type CreateEmployeeRequest = {
  name: string;
  surName: string;
  phoneNumber: string;
  position: string;
};

const createEmployee = async (newEmployee: CreateEmployeeRequest): Promise<Employee> => {
  const { data } = await axios.post<Employee>('http://localhost:5174/api/Employee', newEmployee);
  return data;
};

type UseCreateEmployeeMutationOptions = {
  onSuccess?: (data: Employee) => void;
  onError?: (error: unknown) => void;
};

export const useCreateEmployeeMutation = ({ onSuccess, onError }: UseCreateEmployeeMutationOptions = {}) => {
  return useMutation({
    mutationFn: createEmployee,
    onSuccess,
    onError,
  });
};
