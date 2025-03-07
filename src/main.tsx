import ReactDOM from 'react-dom/client';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { LazyMotion, domAnimation, domMax } from 'motion/react';
import { ErrorPage } from './components/pages/Error/ErrorPage';
import { NotFoundPage } from './components/pages/NotFound/NotFoundPage';
import Spinner from './components/ui/Spinner';
import { ThemeProvider } from './components/ui/theme-provider';
import { routeTree } from './routeTree.gen';

const router = createRouter({
  routeTree: routeTree,
  defaultPendingComponent: () => <Spinner className="mt-20" />,
  defaultErrorComponent: ErrorPage,
  defaultNotFoundComponent: NotFoundPage,
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById('root')!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <LazyMotion features={domAnimation}>
      <LazyMotion features={domMax}>
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
          <RouterProvider router={router} />
        </ThemeProvider>
      </LazyMotion>
    </LazyMotion>
  );
}
