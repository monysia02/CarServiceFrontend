import axios from 'axios';
import { useMutation } from '@tanstack/react-query';

export type Employee = {
  employeeId: string;
  name: string;
  surName: string;
  phoneNumber: string;
  position: string;
};

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

export const useCreateEmployeeMutation = () => {
  return useMutation({
    mutationFn: createEmployee,
    onError: (error) => {
      console.error('Error creating employee:', error);
    },
  });
};
