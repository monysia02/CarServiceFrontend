import { FC } from 'react';
import { Box, Stack } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { PageHeader } from '../../components/page-header.tsx';
import { useGetCarsQuery } from './hooks/use-get-cars.tsx';

export const Cars: FC = () => {
  const { data, isLoading } = useGetCarsQuery();

  const columns: GridColDef[] = [
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

  const parsedData = data?.data.map((x) => {
    return { id: x.carId, ...x };
  });

  return (
    <Stack direction="column">
      <PageHeader title="Cars list" />
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
