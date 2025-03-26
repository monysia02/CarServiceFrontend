import { createRootRoute } from '@tanstack/react-router';
import { Layout } from '../modules/layout/layout.tsx';

export const Route = createRootRoute({
  component: () => (
    <>
      <Layout />
    </>
  ),
});
