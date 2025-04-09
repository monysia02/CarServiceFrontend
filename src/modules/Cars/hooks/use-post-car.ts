import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { Car } from '../types/car.ts';

export type CreateCarRequest = {
  brand: string;
  model: string;
  year: number;
  registrationNumber: string;
  vin: string;
};

const createCar = async (newCar: CreateCarRequest): Promise<Car> => {
  const { data } = await axios.post<Car>('http://localhost:5174/api/Car', newCar);
  return data;
};

type UseCreateCarMutationOptions = {
  onSuccess?: (data: Car) => void;
  onError?: (error: unknown) => void;
};

export const useCreateCarMutation = ({ onSuccess, onError }: UseCreateCarMutationOptions = {}) => {
  return useMutation({
    mutationFn: createCar,
    onSuccess,
    onError,
  });
};
