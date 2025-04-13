import { FC, useState } from 'react';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { Box, IconButton, Stack } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { BasicModal } from '../../components/basic-modal.tsx';
import { PageHeader } from '../../components/page-header.tsx';
import { columns } from './columns/cars-columns-definition.ts';
import { CarForm } from './components/car-form.tsx';
import { useGetCarsQuery } from './hooks/use-get-cars.ts';
import { CarFormFields } from './types/car.ts';

export const Cars: FC = () => {
  const { data, isLoading } = useGetCarsQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [carToEdit, setCarToEdit] = useState<CarFormFields | undefined>();

  const parsedData = data?.data.map((x) => {
    return { id: x.carId, ...x };
  });

  return (
    <Stack direction="column">
      <PageHeader
        title="Cars list"
        onClick={() => {
          setIsModalOpen(true);
        }}
      />
      <Box sx={{ height: '75vh', width: '100%' }}>
        <DataGrid
          disableColumnSorting
          loading={isLoading}
          rows={parsedData || []}
          columns={[
            {
              field: 'actions',
              headerName: '',
              width: 70,
              renderCell: (params) => (
                <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
                  <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
                    <IconButton
                      onClick={() => {
                        setCarToEdit(params.row);
                        console.log(carToEdit);
                      }}
                    >
                      <EditNoteIcon />
                    </IconButton>
                  </Stack>
                </Stack>
              ),
            },
            ...columns,
          ]}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          disableRowSelectionOnClick
        />
      </Box>
      <BasicModal
        isModalOpen={isModalOpen || !!carToEdit}
        setIsModalOpen={() => {
          setIsModalOpen(false);
          setCarToEdit(undefined);
        }}
        modalBody={
          <CarForm
            car={carToEdit}
            closeModal={() => {
              setIsModalOpen(false);
              setCarToEdit(undefined);
            }}
          />
        }
      />
    </Stack>
  );
};
