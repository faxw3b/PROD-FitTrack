import { useEffect, useState } from 'react';
import { AnimatePresence } from 'motion/react';
import * as motion from 'motion/react-m';
import { Plus } from 'lucide-react';
import { AnimatedCard } from '@/components/ui/animated-card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { useTrainingsStore } from '@/stores/trainingsStore';
import { TrainingCard } from './Card/TrainingCard';
import { TrainingsForm } from './Create/TrainingsForm';

export const TrainingsPage = () => {
  const trainings = useTrainingsStore((state) => state.trainings);
  const deleteTemporaryTrainings = useTrainingsStore((state) => state.deleteTemporaryTrainings);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    deleteTemporaryTrainings();
  }, []);

  return (
    <div className="min-h-screen">
      <div className="container mx-auto py-4 pb-8 md:py-4 space-y-8">
        <div className="flex flex-col gap-4 md:gap-8">
          <div className="flex items-center justify-between">
            <motion.h1
              className="text-3xl sm:text-4xl font-bold tracking-tight"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Тренировки
            </motion.h1>
            <div className="flex gap-2">
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                  >
                    <Button className="gap-2 group" size="sm">
                      <Plus className="h-4 w-4 transition-transform group-hover:rotate-90" />
                      <span className="hidden sm:inline">Добавить тренировку</span>
                    </Button>
                  </motion.div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-2xl max-h-[90vh] mt-10 sm:mt-0 overflow-y-auto p-3 pt-0 pb-14 sm:p-6 flex flex-col">
                  <DialogHeader className="p-6 pb-2 bg-background/50 border-b border-border/10 flex-shrink-0 flex items-center">
                    <DialogTitle className="text-2xl font-bold text-foreground">Создание тренировки</DialogTitle>
                  </DialogHeader>
                  <div className="pt-4 overflow-y-auto">
                    <TrainingsForm onFormClose={() => setIsDialogOpen(false)} />
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          <Separator className="md:-mt-3" />
        </div>
        <AnimatePresence>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {trainings.map((training, index) => (
              <AnimatedCard key={training.id} index={index}>
                <TrainingCard training={training} />
              </AnimatedCard>
            ))}
          </div>
        </AnimatePresence>
        {trainings.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-muted-foreground py-12"
          >
            Тренировки не найдены, создайте новую тренировку
          </motion.div>
        )}
      </div>
    </div>
  );
};
