import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { enqueueSnackbar } from 'notistack';
import { Button, Stack, TextField, Typography } from '@mui/material';
import { useGetClientsQuery } from '../hooks/use-get-clients.tsx';
import { useCreateClientMutation } from '../hooks/use-post-client.ts';
import { usePutClientMutation } from '../hooks/use-put-client';
import { ClientFormFields } from '../types/client.ts';

type Props = {
  closeModal: () => void;
  client?: ClientFormFields;
};

export const ClientForm: FC<Props> = ({ closeModal, client }) => {
  const { control, handleSubmit, reset } = useForm<ClientFormFields>({
    defaultValues: {
      name: client?.name,
      surName: client?.surName,
      phoneNumber: client?.phoneNumber,
    },
  });

  const { mutate: updateClient } = usePutClientMutation({
    onSuccess: () => {
      enqueueSnackbar('Client updated successfully', {
        variant: 'success',
      });
    },
    onError: () => {
      enqueueSnackbar('Error updating client', {
        variant: 'error',
      });
    },
  });

  const {
    mutate: createClient,
    isPending,
    isError,
  } = useCreateClientMutation({
    onSuccess: () => {
      enqueueSnackbar('Client created successfully', {
        variant: 'success',
      });
    },
    onError: () => {
      enqueueSnackbar('Error creating client', {
        variant: 'error',
      });
    },
  });
  const { refetch } = useGetClientsQuery();

  const onSubmit = (data: ClientFormFields) => {
    if (client) {
      updateClient(
        { ...data, customerId: client.id || '' },
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

    createClient(data, {
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
        Client Form
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
