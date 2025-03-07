import { useEffect } from 'react';
import { Outlet, createRootRoute, useLocation } from '@tanstack/react-router';

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const { pathname } = useLocation();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);

    return () => clearTimeout(timeoutId);
  }, [pathname]);

  return <Outlet />;
}
