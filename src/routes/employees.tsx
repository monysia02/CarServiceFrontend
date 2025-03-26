import { createFileRoute } from '@tanstack/react-router';
import { Employees } from '../modules/Employees/employees.tsx';

export const Route = createFileRoute('/employees')({
  component: RouteComponent,
});

function RouteComponent() {
  return <Employees />;
}
