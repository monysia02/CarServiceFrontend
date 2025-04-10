import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { Car } from '../types/car.ts';

const updateCar = async (car: Car): Promise<Car> => {
  const { data } = await axios.put<Car>(`http://localhost:5174/api/Car/`, car);
  return data;
};

type UsePutCarMutationOptions = {
  onSuccess?: (data: Car) => void;
  onError?: (error: unknown) => void;
};

export const usePutCarMutation = ({ onSuccess, onError }: UsePutCarMutationOptions = {}) => {
  return useMutation({
    mutationFn: updateCar,
    onSuccess,
    onError,
  });
};
