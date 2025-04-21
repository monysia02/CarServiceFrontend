import { FC, useState } from 'react';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { Box, IconButton, Stack } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { BasicModal } from '../../components/basic-modal';
import { PageHeader } from '../../components/page-header';
import { columns } from './columns/repairs-columns-definition';
import { FinishRepairModal } from './components/finish-repair-modal';
import { RepairForm } from './components/repair-form';
import { useGetRepairsQuery } from './hook/use-get-repairs';
import { RepairFormFields } from './types/repair';

export const Repairs: FC = () => {
  const { data, isLoading } = useGetRepairsQuery();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [repairToEdit, setRepairToEdit] = useState<RepairFormFields | undefined>();

  const [finishModalOpen, setFinishModalOpen] = useState(false);
  const [selectedRepairId, setSelectedRepairId] = useState<string | null>(null);

  const parsedData = data?.data.map((x) => ({
    id: x.repairId,
    ...x,
  }));

  const openFinishModal = (repairId: string) => {
    setSelectedRepairId(repairId);
    setFinishModalOpen(true);
  };

  return (
    <Stack direction="column">
      <PageHeader
        title="Repairs list"
        onClick={() => {
          setIsModalOpen(true);
        }}
      />
      <Box sx={{ height: '75vh', maxWidth: '100%' }}>
        <DataGrid
          sx={{
            width: '100%',
            maxWidth: '100%',
          }}
          disableColumnSorting
          loading={isLoading}
          rows={parsedData || []}
          columns={[
            {
              field: 'actions',
              headerName: '',
              width: 100,
              renderCell: (params) => {
                const isDisabled = params.row.status === 'Finished';

                return (
                  <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
                    <IconButton
                      onClick={() => {
                        setRepairToEdit(params.row);
                      }}
                      disabled={isDisabled}
                    >
                      <EditNoteIcon />
                    </IconButton>
                    <IconButton onClick={() => openFinishModal(params.row.repairId)} disabled={isDisabled}>
                      <CheckCircleOutlineIcon />
                    </IconButton>
                  </Stack>
                );
              },
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
          pageSizeOptions={[10]} //add
          disableRowSelectionOnClick
        />
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

      {selectedRepairId && (
        <FinishRepairModal
          open={finishModalOpen}
          onClose={() => {
            setFinishModalOpen(false);
            setSelectedRepairId(null);
          }}
          repairId={selectedRepairId}
        />
      )}
    </Stack>
  );
};
