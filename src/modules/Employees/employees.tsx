import { FC } from 'react';
import axios, { AxiosInstance } from 'axios';
import { Box } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';


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

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 250 },
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

  const rows = [
    {
      id: '8aac35c3-6369-4594-9797-9d1f5e25193d',
      name: 'Elon',
      surName: 'Musk',
      phoneNumber: '323642385',
      position: 'Sprzątaczka',
    },
    {
      id: 'b2c6c9d1-77b4-4c6f-8c32-524f3cf61723',
      name: 'Bill',
      surName: 'Gates',
      phoneNumber: '555123456',
      position: 'Programista',
    },
    {
      id: '3d8a45e1-1df9-49c5-9f0a-6746be06b5c4',
      name: 'Ada',
      surName: 'Lovelace',
      phoneNumber: '123456789',
      position: 'Analityk danych',
    },
  ];


  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
};
