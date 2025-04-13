import React from 'react';
import { Stack } from '@mui/material';
import { useNavigate } from '@tanstack/react-router';

type Props = {
  icon: React.ReactNode;
  link?: string;
  title: string;
};

export const MenuItem: React.FC<Props> = ({ icon, link, title }) => {
  const navigate = useNavigate();

  return (
    <Stack
      direction="row"
      gap={2}
      p={2}
      alignItems="center"
      onClick={() => {
        if (link) {
          navigate({ to: link });
        }
      }}
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
