import { FC, useState } from 'react';
import { Box, Stack } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { BasicModal } from '../../components/basic-modal.tsx';
import { PageHeader } from '../../components/page-header.tsx';
import { columns } from './columns/employees-columns-definiton.ts';
import { EmployeeForm } from './components/employee-form.tsx';
import { useGetEmployeesQuery } from './hooks/use-get-employees.tsx';

export const Employees: FC = () => {
  const { data, isLoading } = useGetEmployeesQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);
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
      <BasicModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        modalBody={
          <EmployeeForm
            closeModal={() => {
              setIsModalOpen(false);
            }}
          />
        }
      />
    </Stack>
  );
};
