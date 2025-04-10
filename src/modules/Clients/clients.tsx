import { FC, useState } from 'react';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { Box, IconButton, Stack } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { BasicModal } from '../../components/basic-modal.tsx';
import { PageHeader } from '../../components/page-header.tsx';
import { columns } from './columns/clients-columns-definition.ts';
import { ClientForm } from './components/client-form.tsx';
import { useGetClientsQuery } from './hooks/use-get-clients.tsx';
import { ClientFormFields } from './types/client.ts';

export const Clients: FC = () => {
  const { data, isLoading } = useGetClientsQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clientToEdit, setClientToEdit] = useState<ClientFormFields | undefined>();

  const parsedData = data?.data.map((x) => {
    return { id: x.customerId, ...x };
  });

  return (
    <Stack direction="column">
      <PageHeader
        title="Customers list"
        onClick={() => {
          setIsModalOpen(true);
        }}
      />
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
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
                        setClientToEdit(params.row);
                        console.log(clientToEdit);
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
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          disableRowSelectionOnClick
        />
      </Box>
      <BasicModal
        isModalOpen={isModalOpen || !!clientToEdit}
        setIsModalOpen={() => {
          setIsModalOpen(false);
          setClientToEdit(undefined);
        }}
        modalBody={
          <ClientForm
            client={clientToEdit}
            closeModal={() => {
              setIsModalOpen(false);
              setClientToEdit(undefined);
            }}
          />
        }
      />
    </Stack>
  );
};
