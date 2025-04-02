import { createFileRoute } from '@tanstack/react-router';
import { Repairs } from '../modules/Repairs/repairs.tsx';

export const Route = createFileRoute('/repairs')({
  component: RouteComponent,
});

function RouteComponent() {
  return <Repairs />;
}
