import { useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import * as motion from 'motion/react-m';
import { Activity, ArrowRight, Clock, Dumbbell, Star, Target, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ITrainingSession } from '@/models/Stores/TrainingsStats/ITrainingStats';
import { useExercisesStore } from '@/stores/exercisesStore';
import { useTrainingsStore } from '@/stores/trainingsStore';
import { CompletedExercises } from './CompletedExercises';
import { LevelProgress } from './LevelProgress';
import { RewardItem } from './RewardItem';
import { StatsCard } from './StatsCard';

interface TrainingCompleteProps {
  session: ITrainingSession;
  totalExercises: number;
  trainingId: number;
}

export const TrainingComplete = ({ session, totalExercises }: TrainingCompleteProps) => {
  const navigate = useNavigate();
  const exercises = useExercisesStore((state) => state.exercises);
  const deleteTemporaryTrainings = useTrainingsStore((state) => state.deleteTemporaryTrainings);

  const duration = session.endTime - session.startTime;
  const completedExercises = exercises.filter((ex) => session.completedExerciseIds.includes(ex.id));
  const skippedExercises = exercises.filter((ex) => session.skippedExerciseIds.includes(ex.id));
  const experienceGained = Math.floor(session.efficiency / 2);
  const pointsGained = Math.floor(experienceGained * 1.5);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    deleteTemporaryTrainings();
  }, []);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gradient-to-b from-background to-primary/5  sm:p-6"
      >
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="container max-w-4xl mx-auto"
        >
          <Card className="relative overflow-hidden backdrop-blur-sm bg-background/80">
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            />

            <div className="relative p-4 sm:p-6 space-y-6">
              <motion.div
                className="text-center space-y-3"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: 'spring',
                    stiffness: 200,
                    damping: 15,
                    delay: 0.5,
                  }}
                  className="w-20 h-20 mx-auto bg-primary/10 rounded-full flex items-center justify-center"
                >
                  <Trophy className="w-10 h-10 text-primary" />
                </motion.div>
                <h1 className="text-3xl font-bold ">Тренировка завершена!</h1>
                <p className="text-muted-foreground text-base">Отличная работа! Вот ваши результаты:</p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <StatsCard
                  title="Длительность"
                  value={`${Math.floor(duration / 1000 / 60)}м ${Math.floor((duration / 1000) % 60)}с`}
                  icon={Clock}
                  delay={0.6}
                />
                <StatsCard
                  title="Выполнено упражнений"
                  value={`${session.completedExerciseIds.length} из ${totalExercises}`}
                  icon={Dumbbell}
                  delay={0.7}
                />
                <StatsCard
                  title="Эффективность"
                  value={`${Math.round(session.efficiency)}%`}
                  icon={Target}
                  delay={0.8}
                />
              </div>

              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
              >
                <div className="bg-primary/5 rounded-xl p-4 backdrop-blur-sm">
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <Star className="w-4 h-4 text-primary" />
                    Награды
                  </h3>
                  <div className="space-y-3">
                    <RewardItem icon={Star} title="Очки кастомизации" value={pointsGained} delay={1.1} />
                    <RewardItem icon={Activity} title="Опыт" value={experienceGained} delay={1.2} />
                  </div>
                </div>

                <LevelProgress experienceGained={experienceGained} session={session} />
              </motion.div>

              <CompletedExercises completedExercises={completedExercises} skippedExercises={skippedExercises} />

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2 }}>
                <Button
                  className="w-full bg-primary/90 hover:bg-primary rounded-md"
                  size="lg"
                  scaling="sm"
                  onClick={() => navigate({ to: '/statistics' })}
                >
                  Посмотреть всю статистику
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </motion.div>
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </>
  );
};
