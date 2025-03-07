import { Link } from '@tanstack/react-router';
import * as motion from 'motion/react-m';
import { ArrowLeft, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const NotFoundPage = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <div className="text-[150px] font-bold text-primary/10 text-center select-none">404</div>
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <span className="text-6xl font-bold text-primary">404</span>
          </motion.div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-center space-y-4"
        >
          <h1 className="text-2xl font-bold text-foreground">Упс! Страница не найдена</h1>
          <p className="text-muted-foreground">Похоже, страница, которую вы ищете, не существует или была перемещена</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
        >
          <Button variant="default" size="lg" asChild className="gap-2 mx-auto sm:mx-0">
            <Link to="/">
              <Home className="w-4 h-4" />
              На главную
            </Link>
          </Button>

          <Button variant="outline" size="lg" onClick={() => window.history.back()} className="gap-2 mx-auto sm:mx-0">
            <ArrowLeft className="w-4 h-4" />
            Назад
          </Button>
        </motion.div>
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <motion.div
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%'],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: 'radial-gradient(circle, hsl(var(--primary)) 1px, transparent 1px)',
              backgroundSize: '50px 50px',
            }}
          />
        </div>
      </div>
    </div>
  );
};
