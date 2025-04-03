import { GridColDef } from '@mui/x-data-grid';

export const columns: GridColDef[] = [
  { field: 'id', headerName: 'Employee ID', width: 250 },
  {
    field: 'name',
    headerName: 'Name',
    width: 150,
    editable: true,
  },
  {
    field: 'surName',
    headerName: 'Surname',
    width: 150,
    editable: true,
  },
  {
    field: 'phoneNumber',
    headerName: 'Phone Number',
    width: 150,
    editable: true,
  },
  {
    field: 'position',
    headerName: 'Position',
    width: 200,
    editable: true,
  },
  {
    field: 'fullName',
    headerName: 'Full Name',
    width: 200,
    sortable: false,
    valueGetter: (_: never, row: { name: string; surName: string }) => `${row.name || ''} ${row.surName || ''}`,
  },
];
