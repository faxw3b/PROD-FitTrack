import { createFileRoute } from '@tanstack/react-router';
import { TrainingsPage } from '@/components/pages/Trainings/TrainingsPage';

export const Route = createFileRoute('/_authorized/trainings/')({
  component: TrainingsRoute,
});

function TrainingsRoute() {
  return <TrainingsPage />;
}
