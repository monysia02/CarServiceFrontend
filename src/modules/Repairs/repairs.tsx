import { FC, useState } from 'react';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { Box, IconButton, Stack } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { BasicModal } from '../../components/basic-modal.tsx';
import { PageHeader } from '../../components/page-header.tsx';
import { columns } from './columns/repairs-columns-definition.ts';
import { RepairForm } from './components/repair-form.tsx';
import { useGetRepairsQuery } from './hook/use-get-repairs.tsx';
import { RepairFormFields } from './types/repair.ts';

export const Repairs: FC = () => {
  const { data, isLoading } = useGetRepairsQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [repairToEdit, setRepairToEdit] = useState<RepairFormFields | undefined>();

  const parsedData = data?.data.map((x) => {
    return { id: x.repairId, ...x };
  });

  return (
    <Stack direction="column">
      <PageHeader
        title="Repairs list"
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
                        setRepairToEdit(params.row);
                        console.log(repairToEdit);
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
        ></DataGrid>
      </Box>
      <BasicModal
        isModalOpen={isModalOpen || !!repairToEdit}
        setIsModalOpen={() => {
          setIsModalOpen(false);
          setRepairToEdit(undefined);
        }}
        modalBody={
          <RepairForm
            repair={repairToEdit}
            closeModal={() => {
              setIsModalOpen(false);
              setRepairToEdit(undefined);
            }}
          />
        }
      />
    </Stack>
  );
};
