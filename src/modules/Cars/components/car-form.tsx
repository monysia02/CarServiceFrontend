import { FC, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { enqueueSnackbar } from 'notistack';
import { Autocomplete, Button, CircularProgress, Stack, TextField, Typography } from '@mui/material';
import { useGetClientsQuery } from '../../Clients/hooks/use-get-clients.tsx';
import { useGetCarsQuery } from '../hooks/use-get-cars.ts';
import { useCreateCarMutation } from '../hooks/use-post-car.ts';
import { usePutCarMutation } from '../hooks/use-put-car.ts';
import { CarFormFields } from '../types/car.ts';

type Props = {
  closeModal: () => void;
  car?: CarFormFields;
};

export const CarForm: FC<Props> = ({ closeModal, car }) => {
  const [inputValue, setInputValue] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    setInterval(() => {
      setSearch(inputValue);
    }, 500);
  }, [inputValue]);

  const { data, isLoading } = useGetClientsQuery(search);

  const { control, handleSubmit, reset } = useForm<CarFormFields>({
    defaultValues: {
      customerIds: car?.customerIds || [],
      brand: car?.brand,
      model: car?.model,
      year: car?.year,
      registrationNumber: car?.registrationNumber,
      vin: car?.vin,
    },
  });

  const { mutate: updateCar } = usePutCarMutation({
    onSuccess: () => {
      enqueueSnackbar('Car updated successfully', {
        variant: 'success',
      });
    },
    onError: () => {
      enqueueSnackbar('Error updating car', {
        variant: 'error',
      });
    },
  });

  const {
    mutate: createCar,
    isPending,
    isError,
  } = useCreateCarMutation({
    onSuccess: () => {
      enqueueSnackbar('Car created successfully', {
        variant: 'success',
      });
    },
    onError: () => {
      enqueueSnackbar('Error creating car', {
        variant: 'error',
      });
    },
  });
  const { refetch } = useGetCarsQuery();

  const onSubmit = (data: CarFormFields) => {
    if (car) {
      updateCar(
        { ...data, carId: car.id || '' },
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

    createCar(data, {
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
        Car Form
      </Typography>
      <Controller
        name="brand"
        rules={{ required: 'Brand is required' }}
        control={control}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            label="Brand"
            fullWidth
            error={fieldState.invalid}
            helperText={fieldState.error?.message}
          />
        )}
      />
      <Controller
        name="model"
        rules={{ required: 'Model is required' }}
        control={control}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            label="Model"
            fullWidth
            error={fieldState.invalid}
            helperText={fieldState.error?.message}
          />
        )}
      />
      <Controller
        name="year"
        rules={{ required: 'Year is required' }}
        control={control}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            label="Year"
            fullWidth
            error={fieldState.invalid}
            helperText={fieldState.error?.message}
          />
        )}
      />
      <Controller
        name="registrationNumber"
        rules={{ required: 'Registration number is required' }}
        control={control}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            label="Registration Number"
            fullWidth
            error={fieldState.invalid}
            helperText={fieldState.error?.message}
          />
        )}
      />
      <Controller
        name="vin"
        rules={{ required: 'VIN is required' }}
        control={control}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            label="VIN"
            fullWidth
            error={fieldState.invalid}
            helperText={fieldState.error?.message}
          />
        )}
      />
      <Controller
        name="customerIds"
        control={control}
        defaultValue={car?.customerIds || []}
        render={({ field }) => {
          // znajdź wybrane opcje po ID
          const selectedOptions = data?.data.filter((option) => field.value.includes(option.customerId)) ?? [];

          return (
            <Autocomplete
              multiple
              fullWidth
              options={data?.data ?? []}
              getOptionLabel={(option) => `${option.name} ${option.surName}`}
              filterSelectedOptions
              loading={isLoading}
              value={selectedOptions}
              onInputChange={(_, newInputValue) => setInputValue(newInputValue)}
              onChange={(_, newValue) => {
                // zapisz tylko ID
                const ids = newValue.map((v) => v.customerId);
                field.onChange(ids);
              }}
              isOptionEqualToValue={(option, value) => option.customerId === value.customerId}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Assign Clients"
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <>
                        {isLoading ? <CircularProgress color="inherit" size={20} /> : null}
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
