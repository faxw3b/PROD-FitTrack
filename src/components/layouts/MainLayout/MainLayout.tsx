import { ReactNode } from 'react';
import { Toaster } from '@/components/ui/toaster';
import { Header } from './Header/Header';

export const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen gap-4">
      <Header />
      <main className="w-full px-3 sm:px-6 py-5 mx-auto mt-20 bg-gradient-to-b from-background to-zinc-200 dark:from-background dark:to-zinc-900 min-h-screen h-full -mb-4">
        {children}
      </main>
      <Toaster />
    </div>
  );
};
