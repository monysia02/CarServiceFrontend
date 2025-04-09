import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { enqueueSnackbar } from 'notistack';
import { Button, Stack, TextField, Typography } from '@mui/material';
import { useGetCarsQuery } from '../hooks/use-get-cars.tsx';
import { useCreateCarMutation } from '../hooks/use-post-car.ts';
import { usePutCarMutation } from '../hooks/use-put-car.ts';
import { CarFormFields } from '../types/car.ts';

type Props = {
  closeModal: () => void;
  car?: CarFormFields;
};

export const CarForm: FC<Props> = ({ closeModal, car }) => {
  const { control, handleSubmit, reset } = useForm<CarFormFields>({
    defaultValues: {
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
