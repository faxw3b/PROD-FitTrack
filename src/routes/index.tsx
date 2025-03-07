import { Navigate, createFileRoute } from '@tanstack/react-router';
import { MockUser } from '@/mocks/MockUser';
import { useUserStore } from '@/stores/userStore';

export const Route = createFileRoute('/')({
  component: IndexRoute,
});

function IndexRoute() {
  const user = useUserStore((state) => state.user);
  if (JSON.stringify(user) === JSON.stringify(MockUser)) {
    return <Navigate to="/login" />;
  }
  return <Navigate to="/trainings" />;
}
