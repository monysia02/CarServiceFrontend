import { FC } from 'react';
import axios, { AxiosInstance } from 'axios';
import { Box } from '@mui/material';

export const Employees: FC = () => {
  const axiosInstance: AxiosInstance = axios.create({
    baseURL: 'http://localhost:5174/api/',
  });

  // axios.get('http://localhost:5174/api/Employee').then((response) => {
  //   console.log(response);
  // });

  axiosInstance.get('Employee').then((response) => {
    console.log(response);
  });

  return (
    <Box
      sx={{
        pt: 2,
        width: '100%',
        backgroundColor: 'primary.light',
      }}
    />
  );
};
