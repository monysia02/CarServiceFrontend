import { FC, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { enqueueSnackbar } from 'notistack';
import { Autocomplete, Button, CircularProgress, MenuItem, Stack, TextField, Typography } from '@mui/material';
import { useGetCarsQuery } from '../../Cars/hooks/use-get-cars';
import { useGetEmployeesQuery } from '../../Employees/hooks/use-get-employees';
import { useGetRepairsQuery } from '../hook/use-get-repairs';
import { useCreateRepairMutation } from '../hook/use-post-repair';
import { usePutRepairMutation } from '../hook/use-put-repair';
import { RepairFormFields } from '../types/repair';

type Props = {
  closeModal: () => void;
  repair?: RepairFormFields;
};

export const RepairForm: FC<Props> = ({ closeModal, repair }) => {
  const isEditMode = Boolean(repair?.repairId);

  const statusOptions = ['New', 'InProgress', 'OnHold', 'Cancelled', 'Finished'];

  const [carInput, setCarInput] = useState('');
  const [employeeInput, setEmployeeInput] = useState('');
  const [carSearch, setCarSearch] = useState('');
  const [employeeSearch, setEmployeeSearch] = useState('');

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCarSearch(carInput);
      setEmployeeSearch(employeeInput);
    }, 500);
    return () => clearTimeout(timeout);
  }, [carInput, employeeInput]);

  const { data: carsData, isLoading: isCarsLoading } = useGetCarsQuery(carSearch);
  const { data: employeesData, isLoading: isEmployeesLoading } = useGetEmployeesQuery(employeeSearch);

  const { control, handleSubmit, reset } = useForm<RepairFormFields>({
    defaultValues: {
      repairId: repair?.repairId,
      description: repair?.description ?? '',
      carId: repair?.carId ?? '',
      employeeIds: repair?.employeeIds ?? [],
      status: repair?.status,
    },
  });

  const { mutate: updateRepair } = usePutRepairMutation({
    onSuccess: () => {
      enqueueSnackbar('Repair updated successfully', { variant: 'success' });
    },
    onError: () => {
      enqueueSnackbar('Error updating repair', { variant: 'error' });
    },
  });

  const {
    mutate: createRepair,
    isPending: isCreating,
    isError: isCreateError,
  } = useCreateRepairMutation({
    onSuccess: () => {
      enqueueSnackbar('Repair created successfully', { variant: 'success' });
    },
    onError: () => {
      enqueueSnackbar('Error creating repair', { variant: 'error' });
    },
  });

  const { refetch } = useGetRepairsQuery();
  const handleSuccess = () => {
    refetch();
    closeModal();
    reset();
  };

  const onSubmit = (formData: RepairFormFields) => {
    if (isEditMode && repair?.repairId) {
      updateRepair(
        {
          repairId: repair.repairId,
          carId: repair.carId,
          employeeIds: repair.employeeIds,
          description: formData.description,
          status: formData.status || 'New',
        },
        { onSuccess: handleSuccess },
      );
    } else {
      createRepair(
        {
          carId: formData.carId,
          description: formData.description,
          employeeIds: formData.employeeIds,
        },
        { onSuccess: handleSuccess },
      );
    }
  };

  return (
    <Stack
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      spacing={2}
      alignItems="center"
      sx={{ width: '100%', maxWidth: '500px', mx: 'auto', p: 2 }}
    >
      <Typography variant="h4" align="center">
        {isEditMode ? 'Edit Repair' : 'New Repair'}
      </Typography>

      {/* WYBÓR STATUSU (tylko w edycji) */}
      {isEditMode && (
        <Controller
          name="status"
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              label="Status"
              select
              fullWidth
              error={fieldState.invalid}
              helperText={fieldState.error?.message}
            >
              {statusOptions.map((status) => (
                <MenuItem key={status} value={status}>
                  {status}
                </MenuItem>
              ))}
            </TextField>
          )}
        />
      )}

      {/* Wybór auta (tylko w trybie tworzenia) */}
      {!isEditMode && (
        <>
          <Controller
            name="carId"
            rules={{ required: 'Car is required' }}
            control={control}
            render={({ field, fieldState }) => (
              <Autocomplete
                fullWidth
                options={carsData?.data ?? []}
                loading={isCarsLoading}
                getOptionLabel={(option) => `${option.registrationNumber} (${option.vin})`}
                value={carsData?.data?.find((car) => car.carId === field.value) || null}
                onInputChange={(_, value) => setCarInput(value)}
                onChange={(_, value) => field.onChange(value?.carId ?? '')}
                isOptionEqualToValue={(option, value) => option.carId === value.carId}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select Car"
                    error={fieldState.invalid}
                    helperText={fieldState.error?.message}
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <>
                          {isCarsLoading && <CircularProgress color="inherit" size={20} />}
                          {params.InputProps.endAdornment}
                        </>
                      ),
                    }}
                  />
                )}
              />
            )}
          />

          <Controller
            name="employeeIds"
            control={control}
            render={({ field, fieldState }) => {
              const selected = employeesData?.data.filter((e) => field.value.includes(e.employeeId)) ?? [];

              return (
                <Autocomplete
                  multiple
                  fullWidth
                  options={employeesData?.data ?? []}
                  loading={isEmployeesLoading}
                  getOptionLabel={(option) => `${option.name} ${option.surName}`}
                  value={selected}
                  filterSelectedOptions
                  onInputChange={(_, value) => setEmployeeInput(value)}
                  onChange={(_, newValue) => field.onChange(newValue.map((v) => v.employeeId))}
                  isOptionEqualToValue={(option, value) => option.employeeId === value.employeeId}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Assign Employees"
                      error={fieldState.invalid}
                      helperText={fieldState.error?.message}
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <>
                            {isEmployeesLoading && <CircularProgress color="inherit" size={20} />}
                            {params.InputProps.endAdornment}
                          </>
                        ),
                      }}
                    />
                  )}
                />
              );
            }}
          />
        </>
      )}

      {/* Pole opisu – zawsze */}
      <Controller
        name="description"
        rules={{ required: 'Description is required' }}
        control={control}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            label="Description"
            fullWidth
            error={fieldState.invalid}
            helperText={fieldState.error?.message}
          />
        )}
      />

      <Button type="submit" variant="contained" color="primary" disabled={isCreating}>
        {isCreating ? 'Submitting...' : isEditMode ? 'Update' : 'Create'}
      </Button>

      {isCreateError && (
        <Typography color="error" textAlign="center">
          Error submitting form. Please try again.
        </Typography>
      )}
    </Stack>
  );
};
