import React from 'react';
import { AppBar, Drawer, Stack, Typography } from '@mui/material';
import { Outlet } from '@tanstack/react-router';
import { Menu } from './components/menu/menu.tsx';

export const Layout: React.FC = () => {
  return (
    <Stack>
      <AppBar
        position="fixed"
        sx={{
          p: 4,
          backgroundColor: 'primary.main',
        }}
      >
        <Stack direction={'row'} justifyContent={'end'} alignItems={'center'}>
          <Stack direction={'row'} alignItems={'center'}></Stack>
        </Stack>
      </AppBar>
      <Drawer
        variant="permanent"
        open={true}
        ModalProps={{ keepMounted: true }}
        sx={{
          '& .MuiDrawer-paper': {
            width: 300,
            backgroundColor: 'background.paper',
          },
        }}
      >
        <Stack direction="column" spacing={2} py={2} alignItems="center">
          <Typography variant="h4">CarService</Typography>
          <Menu />
        </Stack>
      </Drawer>
      <Outlet />
    </Stack>
  );
};
