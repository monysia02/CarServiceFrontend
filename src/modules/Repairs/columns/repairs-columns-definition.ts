// columns/repairs-columns-definition.ts
import { format } from 'date-fns';
import { GridColDef } from '@mui/x-data-grid';
import { Car } from '../../Cars/types/car.ts';
import { Employee } from '../../Employees/types/employee.ts';

export const columns: GridColDef[] = [
  {
    field: 'createdAt',
    headerName: 'Created Date',
    width: 150,
    editable: true,
    valueFormatter: (date) => {
      if (!date) return '';
      return format(new Date(date), 'yyyy-MM-dd');
    },
  },
  {
    field: 'finishedAt',
    headerName: 'Finished Date',
    width: 150,
    editable: true,
    valueFormatter: (date) => {
      if (!date) return '';
      return format(new Date(date), 'yyyy-MM-dd');
    },
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 200,
    editable: true,
  },
  {
    field: 'price',
    headerName: 'Price',
    width: 200,
    editable: true,
  },
  {
    field: 'description',
    headerName: 'Description',
    width: 150,
    editable: true,
  },
  {
    field: 'car',
    headerName: 'Car',
    width: 200,
    valueGetter: (car: Car) => {
      console.log(car, 'carInfo');
      if (!car) return '';
      return `${car.brand} ${car.model} (${car.registrationNumber})`;
    },
  },
  {
    field: 'employees',
    headerName: 'Employees',
    width: 200,
    valueGetter: (Employees: Employee[]) => {
      if (!Employees) return '';
      return Employees.map((x) => `${x.name} ${x.surName}`).join(', ');
    },
  },
];
