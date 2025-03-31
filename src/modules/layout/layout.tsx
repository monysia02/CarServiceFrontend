import React from 'react';
import { AppBar, Box, Container, Drawer, Stack, Typography } from '@mui/material';
import { Outlet } from '@tanstack/react-router';
import { Menu } from './components/menu/menu.tsx';

export const Layout: React.FC = () => {
  const drawerWidth = 300;

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{
          p: 4,
          backgroundColor: 'primary.main',
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Stack direction="row" justifyContent="end" alignItems="center"></Stack>
      </AppBar>

      <Drawer
        variant="permanent"
        open
        ModalProps={{ keepMounted: true }}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: 'background.paper',
          },
        }}
      >
        <Stack direction="column" spacing={2} py={2} alignItems="center">
          <Typography variant="h4">CarService</Typography>
          <Menu />
        </Stack>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: 10,
        }}
      >
        <Container maxWidth="xl">
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
};
