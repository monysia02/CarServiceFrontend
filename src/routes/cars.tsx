import { createFileRoute } from '@tanstack/react-router';
import { Cars } from '../modules/Cars/cars.tsx';

export const Route = createFileRoute('/cars')({
  component: RouteComponent,
});

function RouteComponent() {
  return <Cars />;
}
