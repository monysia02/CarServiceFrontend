import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { Employee } from '../types/employee.ts';

const updateEmployee = async (employee: Employee): Promise<Employee> => {
  const { data } = await axios.put<Employee>(`http://localhost:5174/api/Employee/`, employee);
  return data;
};

type UsePutEmployeeMutationOptions = {
  onSuccess?: (data: Employee) => void;
  onError?: (error: unknown) => void;
};

export const usePutEmployeeMutation = ({ onSuccess, onError }: UsePutEmployeeMutationOptions = {}) => {
  return useMutation({
    mutationFn: updateEmployee,
    onSuccess,
    onError,
  });
};
