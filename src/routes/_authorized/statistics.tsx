import { createFileRoute } from '@tanstack/react-router';
import { StatisticsPage } from '@/components/pages/Statistics/StatisticsPage';

export const Route = createFileRoute('/_authorized/statistics')({
  component: StatisticsRoute,
});

function StatisticsRoute() {
  return <StatisticsPage />;
}
