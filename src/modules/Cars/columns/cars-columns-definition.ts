import { GridColDef } from '@mui/x-data-grid';

export const columns: GridColDef[] = [
  { field: 'id', headerName: 'Car ID', width: 250 },
  {
    field: 'brand',
    headerName: 'Brand',
    width: 150,
    editable: true,
  },
  {
    field: 'model',
    headerName: 'Model',
    width: 150,
    editable: true,
  },
  {
    field: 'year',
    headerName: 'Year',
    width: 200,
    editable: true,
  },
  {
    field: 'registrationNumber',
    headerName: 'Registration number',
    width: 150,
    editable: true,
  },
  {
    field: 'vin',
    headerName: 'VIN',
    width: 200,
    editable: true,
  },
];
