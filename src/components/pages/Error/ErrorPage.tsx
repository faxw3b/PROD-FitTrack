import { Link } from '@tanstack/react-router';
import * as motion from 'motion/react-m';
import { AlertTriangle, Home, RefreshCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const ErrorPage = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <div className="flex justify-center">
            <motion.div
              animate={{
                rotate: [0, 10, -10, 10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'easeInOut',
              }}
            >
              <AlertTriangle className="w-32 h-32 text-destructive/80" />
            </motion.div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-center space-y-4"
        >
          <h1 className="text-3xl font-bold text-foreground">Что-то пошло не так</h1>
          <p className="text-muted-foreground">
            Произошла ошибка при загрузке страницы. Попробуйте обновить страницу или вернуться на главную.
          </p>
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

          <Button
            variant="outline"
            size="lg"
            onClick={() => window.location.reload()}
            className="gap-2 mx-auto sm:mx-0"
          >
            <RefreshCcw className="w-4 h-4" />
            Обновить страницу
          </Button>
        </motion.div>
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <motion.div
            animate={{
              opacity: [0.03, 0.06, 0.03],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
            className="absolute inset-0"
            style={{
              backgroundImage: `
                radial-gradient(circle at 20% 30%, hsl(var(--destructive)) 0%, transparent 70%),
                radial-gradient(circle at 80% 70%, hsl(var(--primary)) 0%, transparent 70%)
              `,
            }}
          />
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
