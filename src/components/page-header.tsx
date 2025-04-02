import { FC } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { Button, Stack, Typography } from '@mui/material';

type Props = {
  title: string;
};

export const PageHeader: FC<Props> = ({ title }) => {
  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 2,
      }}
    >
      <Typography variant="h4">{title}</Typography>
      <Button
        startIcon={<AddIcon />}
        variant="contained"
        sx={{
          borderRadius: 4,
        }}
      >
        Add
      </Button>
    </Stack>
  );
};
