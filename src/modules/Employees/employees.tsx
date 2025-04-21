import { FC, useState } from 'react';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { Box, IconButton, Stack } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { BasicModal } from '../../components/basic-modal.tsx';
import { PageHeader } from '../../components/page-header.tsx';
import { columns } from './columns/employees-columns-definiton.ts';
import { EmployeeForm } from './components/employee-form.tsx';
import { useGetEmployeesQuery } from './hooks/use-get-employees.ts';
import { EmployeeFormFields } from './types/employee.ts';

export const Employees: FC = () => {
  const { data, isLoading } = useGetEmployeesQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [employeeToEdit, setEmployeeToEdit] = useState<EmployeeFormFields | undefined>();

  const parsedData = data?.data.map((x) => {
    return { id: x.employeeId, ...x };
  });

  return (
    <Stack direction="column">
      <PageHeader
        title="Employees list"
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
                        setEmployeeToEdit(params.row);
                        console.log(employeeToEdit);
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
          pageSizeOptions={[10]} //add
          disableRowSelectionOnClick
        />
      </Box>
      <BasicModal
        isModalOpen={isModalOpen || !!employeeToEdit}
        setIsModalOpen={() => {
          setIsModalOpen(false);
          setEmployeeToEdit(undefined);
        }}
        modalBody={
          <EmployeeForm
            employee={employeeToEdit}
            closeModal={() => {
              setIsModalOpen(false);
              setEmployeeToEdit(undefined);
            }}
          />
        }
      />
    </Stack>
  );
};
