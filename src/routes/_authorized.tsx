import { useEffect } from 'react';
import { Outlet, createFileRoute, useNavigate } from '@tanstack/react-router';
import { MainLayout } from '@/components/layouts/MainLayout/MainLayout';
import { MockUser } from '@/mocks/MockUser';
import { useUserStore } from '@/stores/userStore';

export const Route = createFileRoute('/_authorized')({
  component: AuthorizedRoute,
});

export function AuthorizedRoute() {
  const user = useUserStore((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (JSON.stringify(user) === JSON.stringify(MockUser)) {
      navigate({ to: '/login', replace: true });
    }
  }, [user, navigate]);

  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
}
