import { Stack } from '@mui/material';

type Props = {
  icon: React.ReactNode;
  link?: string;
  title: string;
};

export const MenuItem: React.FC<Props> = ({ title, icon }) => {
  return (
    <Stack
      direction="row"
      gap={2}
      p={2}
      alignItems="center"
      sx={{
        width: '100%',
        '&:hover': {
          backgroundColor: 'primary.light',
          color: 'primary.dark',
          cursor: 'pointer',
        },
      }}
    >
      {icon}
      {title}
    </Stack>
  );
};
