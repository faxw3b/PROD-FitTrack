import { createFileRoute } from '@tanstack/react-router';
import { ExerciseDetailPage } from '@/components/pages/ExercisesDetail/ExerciseDetailPage';

export const Route = createFileRoute('/_authorized/exercises/$id')({
  component: ExerciseDetailRoute,
});

function ExerciseDetailRoute() {
  const { id } = Route.useParams();
  return <ExerciseDetailPage id={Number(id)} />;
}
