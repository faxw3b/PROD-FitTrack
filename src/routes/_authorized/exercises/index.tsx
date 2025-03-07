import { createFileRoute } from '@tanstack/react-router';
import { ExercisesPage } from '@/components/pages/Exercises/ExercisesPage';

export const Route = createFileRoute('/_authorized/exercises/')({
  component: ExercisesRoute,
});

function ExercisesRoute() {
  return <ExercisesPage />;
}
