import { FC } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { Button, Stack, Typography } from '@mui/material';

type Props = {
  title: string;
  onClick?: () => void;
};

export const PageHeader: FC<Props> = ({ title, onClick }) => {
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
        onClick={onClick || (() => {})}
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
