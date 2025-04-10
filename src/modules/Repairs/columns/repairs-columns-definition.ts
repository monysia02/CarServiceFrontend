import { format } from 'date-fns';
import { GridColDef } from '@mui/x-data-grid';

export const columns: GridColDef[] = [
  {
    field: 'createdAt',
    headerName: 'Created Date',
    width: 150,
    editable: true,
    valueFormatter: (value: string) => {
      return format(new Date(value), 'yyyy-MM-dd');
    },
  },
  {
    field: 'finishedAt',
    headerName: 'Finished Date',
    width: 150,
    editable: true,
    valueFormatter: (value: string) => {
      return format(new Date(value), 'yyyy-MM-dd');
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
];
