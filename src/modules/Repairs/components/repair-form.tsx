import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { enqueueSnackbar } from 'notistack';
import { Button, Stack, TextField, Typography } from '@mui/material';
import { useGetRepairsQuery } from '../hook/use-get-repairs';
import { useCreateRepairMutation } from '../hook/use-post-repair';
import { usePutRepairMutation } from '../hook/use-put-repair';
import { RepairFormFields } from '../types/repair';

type Props = {
  closeModal: () => void;
  repair?: RepairFormFields;
};

export const RepairForm: FC<Props> = ({ closeModal, repair }) => {
  const { control, handleSubmit, reset } = useForm<RepairFormFields>({
    defaultValues: {
      createdAt: repair?.createdAt,
      finishedAt: repair?.finishedAt,
      status: repair?.status,
      price: repair?.price,
      description: repair?.description,
    },
  });

  const { mutate: updateRepair } = usePutRepairMutation({
    onSuccess: () => {
      enqueueSnackbar('Repair updated successfully', {
        variant: 'success',
      });
    },
    onError: () => {
      enqueueSnackbar('Error updating repair', {
        variant: 'error',
      });
    },
  });

  const {
    mutate: createRepair,
    isPending,
    isError,
  } = useCreateRepairMutation({
    onSuccess: () => {
      enqueueSnackbar('Repair created successfully', {
        variant: 'success',
      });
    },
    onError: () => {
      enqueueSnackbar('Error creating repair', {
        variant: 'error',
      });
    },
  });
  const { refetch } = useGetRepairsQuery();

  const onSubmit = (data: RepairFormFields) => {
    if (repair) {
      updateRepair(
        { ...data, repairId: repair.id || '' },
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

    createRepair(data, {
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
        Repair Form
      </Typography>
      <Controller
        name="createdAt"
        rules={{ required: 'Created date is required' }}
        control={control}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            label="Created Date"
            type={'date'}
            fullWidth
            error={fieldState.invalid}
            helperText={fieldState.error?.message}
          />
        )}
      />
      {repair && (
        <Controller
          name="finishedAt"
          rules={{ required: 'Finished date is required' }} //??
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              label="Finished Date"
              type={'date'}
              fullWidth
              error={fieldState.invalid}
              helperText={fieldState.error?.message}
            />
          )}
        />
      )}
      {repair && (
        <Controller
          name="status"
          rules={{ required: 'Status is required' }}
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              label="Status"
              fullWidth
              error={fieldState.invalid}
              helperText={fieldState.error?.message}
            />
          )}
        />
      )}
      <Controller
        name="price"
        rules={{ required: 'Price is required' }}
        control={control}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            label="Price"
            fullWidth
            error={fieldState.invalid}
            helperText={fieldState.error?.message}
          />
        )}
      />
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
