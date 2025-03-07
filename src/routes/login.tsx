import { useEffect } from 'react';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { LoginPage } from '@/components/pages/Login/LoginPage';
import { MockUser } from '@/mocks/MockUser';
import { useUserStore } from '@/stores/userStore';

export const Route = createFileRoute('/login')({
  component: LoginRoute,
});

function LoginRoute() {
  const user = useUserStore((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (JSON.stringify(user) !== JSON.stringify(MockUser)) {
      navigate({ to: '/trainings', replace: true });
    }
  }, [user, navigate]);

  return <LoginPage />;
}
