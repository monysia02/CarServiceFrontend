import { createFileRoute } from '@tanstack/react-router';
import { Clients } from '../modules/Clients/clients.tsx';

export const Route = createFileRoute('/clients')({
  component: RouteComponent,
});

function RouteComponent() {
  return <Clients />;
}
