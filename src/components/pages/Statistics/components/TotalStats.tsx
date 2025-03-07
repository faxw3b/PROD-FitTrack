import { useEffect, useState } from 'react';
import * as motion from 'motion/react-m';
import { Clock, Dumbbell, Target, Trophy } from 'lucide-react';
import { useTrainingsStatsStore } from '@/stores/trainingsStatsStore';
import { StatCard } from './StatCard';

interface ITotalStats {
  totalSessions: number;
  totalDuration: number;
  totalExercises: number;
  totalSkipped: number;
  averageEfficiency: number;
}

export const TotalStats = () => {
  const stats = useTrainingsStatsStore((state) => state.stats);
  const [totalStats, setTotalStats] = useState<ITotalStats>({} as ITotalStats);

  useEffect(() => {
    setTotalStats(
      stats.reduce(
        (acc, stat) => ({
          totalSessions: acc.totalSessions + stat.totalSessions,
          totalDuration: acc.totalDuration + stat.totalDuration,
          totalExercises: acc.totalExercises + stat.totalExercisesCompleted,
          totalSkipped: acc.totalSkipped + stat.totalExercisesSkipped,
          averageEfficiency: acc.averageEfficiency + stat.averageEfficiency / stats.length,
        }),
        {
          totalSessions: 0,
          totalDuration: 0,
          totalExercises: 0,
          totalSkipped: 0,
          averageEfficiency: 0,
        }
      )
    );
  }, [stats]);

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4"
    >
      <StatCard
        title="Всего тренировок"
        value={totalStats.totalSessions}
        icon={Trophy}
        description="Завершённых тренировок"
        delay={0.1}
      />
      <StatCard
        title="Общее время"
        value={`${Math.round(totalStats.totalDuration / 1000 / 60)}м`}
        icon={Clock}
        description="Суммарная длительность тренировок"
        delay={0.2}
      />
      <StatCard
        title="Всего упражнений"
        value={totalStats.totalExercises}
        icon={Dumbbell}
        description={`Выполнено ${totalStats.totalExercises}, пропущено ${totalStats.totalSkipped}`}
        delay={0.3}
      />
      <StatCard
        title="Эффективность"
        value={`${Math.round(totalStats.averageEfficiency)}%`}
        icon={Target}
        description={`Средняя эффективность тренировок`}
        delay={0.4}
      />
    </motion.div>
  );
};
