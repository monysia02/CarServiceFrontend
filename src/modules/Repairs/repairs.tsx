import { FC } from 'react';
import { Box, Stack } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { PageHeader } from '../../components/page-header.tsx';
import { useGetRepairsQuery } from './hook/use-get-repairs.tsx';

export const Repairs: FC = () => {
  const { data, isLoading } = useGetRepairsQuery();

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'Repair ID', width: 250 },
    {
      field: 'createdAt',
      headerName: 'Created Date',
      width: 150,
      editable: true,
    },
    {
      field: 'finishedAt',
      headerName: 'Finished Date',
      width: 150,
      editable: true,
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

  const parsedData = data?.data.map((x) => {
    return { id: x.repairId, ...x };
  });

  return (
    <Stack direction="column">
      <PageHeader title="Repairs list" />
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
