import { FC } from 'react';
import { Box, Stack } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { PageHeader } from '../../components/page-header.tsx';
import { useGetcustomersQuery } from './hooks/use-get-clients.tsx';

export const Clients: FC = () => {
  const { data, isLoading } = useGetcustomersQuery();

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'Customer ID', width: 250 },
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
      field: 'fullName',
      headerName: 'Full Name',
      width: 200,
      sortable: false,
      valueGetter: (_: never, row: { name: string; surName: string }) => `${row.name || ''} ${row.surName || ''}`,
    },
  ];

  const parsedData = data?.data.map((x) => {
    return { id: x.customerId, ...x };
  });

  return (
    <Stack direction="column">
      <PageHeader title="Customers list" />
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          loading={isLoading}
          rows={parsedData || []}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          disableRowSelectionOnClick
        />
      </Box>
    </Stack>
  );
};
