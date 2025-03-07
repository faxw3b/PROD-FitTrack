import { createFileRoute } from '@tanstack/react-router';
import { RunningTraining } from '@/components/pages/RunningTraining/RunningTraining';

export const Route = createFileRoute('/_authorized/trainings/$id/run')({
  component: RunTrainingRoute,
});

function RunTrainingRoute() {
  const { id } = Route.useParams();
  return <RunningTraining id={Number(id)} />;
}
