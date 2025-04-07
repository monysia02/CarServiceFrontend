import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { enqueueSnackbar } from 'notistack';
import { Button, Stack, TextField, Typography } from '@mui/material';
import { useGetEmployeesQuery } from '../hooks/use-get-employees.ts';
import { useCreateEmployeeMutation } from '../hooks/use-post-emplouyee.ts';
import { usePutEmployeeMutation } from '../hooks/use-put-employee.ts';
import { EmployeeFormFields } from '../types/employee.ts';

type Props = {
  closeModal: () => void;
  employee?: EmployeeFormFields;
};

export const EmployeeForm: FC<Props> = ({ closeModal, employee }) => {
  const { control, handleSubmit, reset } = useForm<EmployeeFormFields>({
    defaultValues: {
      name: employee?.name,
      surName: employee?.surName,
      phoneNumber: employee?.phoneNumber,
      position: employee?.position,
    },
  });

  const { mutate: updateEmployee } = usePutEmployeeMutation({
    onSuccess: () => {
      enqueueSnackbar('Employee updated successfully', {
        variant: 'success',
      });
    },
    onError: () => {
      enqueueSnackbar('Error updating employee', {
        variant: 'error',
      });
    },
  });

  const {
    mutate: createEmployee,
    isPending,
    isError,
  } = useCreateEmployeeMutation({
    onSuccess: () => {
      enqueueSnackbar('Employee created successfully', {
        variant: 'success',
      });
    },
    onError: () => {
      enqueueSnackbar('Error creating employee', {
        variant: 'error',
      });
    },
  });
  const { refetch } = useGetEmployeesQuery();

  const onSubmit = (data: EmployeeFormFields) => {
    if (employee) {
      updateEmployee(
        { ...data, employeeId: employee.id || '' },
        {
          onSuccess: () => {
            refetch();
            closeModal();
            reset();
          },
        },
      );
      return;
    }

    createEmployee(data, {
      onSuccess: () => {
        refetch();
        closeModal();
        reset();
      },
    });
  };

  return (
    <Stack
      direction="column"
      spacing={2}
      justifyContent="center"
      alignItems="center"
      onSubmit={handleSubmit(onSubmit)}
      component="form"
      sx={{ width: '100%', maxWidth: '400px', mx: 'auto', p: 2 }}
    >
      <Typography variant="h4" align="center">
        Employee Form
      </Typography>
      <Controller
        name="name"
        rules={{ required: 'Name is required' }}
        control={control}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            label="Name"
            fullWidth
            error={fieldState.invalid}
            helperText={fieldState.error?.message}
          />
        )}
      />
      <Controller
        name="surName"
        rules={{ required: 'Surname is required' }}
        control={control}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            label="Surname"
            fullWidth
            error={fieldState.invalid}
            helperText={fieldState.error?.message}
          />
        )}
      />
      <Controller
        name="phoneNumber"
        rules={{ required: 'Phone Number is required' }}
        control={control}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            label="Phone Number"
            fullWidth
            error={fieldState.invalid}
            helperText={fieldState.error?.message}
          />
        )}
      />
      <Controller
        name="position"
        rules={{ required: 'Position is required' }}
        control={control}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            label="Position"
            fullWidth
            error={fieldState.invalid}
            helperText={fieldState.error?.message}
          />
        )}
      />
      <Button type="submit" variant="contained" color="primary" disabled={isPending}>
        {isPending ? 'Submitting...' : 'Submit'}
      </Button>
      {isError && (
        <Typography color="error" textAlign="center">
          Error submitting form. Please try again.
        </Typography>
      )}
    </Stack>
  );
};
