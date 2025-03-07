import { useEffect, useState } from 'react';
import * as motion from 'motion/react-m';
import { Activity, AlertCircle, Calendar, Clock, LineChart, Target, Users } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card } from '@/components/ui/card';
import { IChartData } from '@/helpers/StatisticsHelper';
import { useTrainingsStatsStore } from '@/stores/trainingsStatsStore';
import { useTrainingsStore } from '@/stores/trainingsStore';
import { BodyPartsChart } from './components/BodyPartsChart';
import { MonthlySessionsChart } from './components/MonthlySessionsChart';
import { ProgressBarsChart } from './components/ProgressBarsChart';
import { TotalStats } from './components/TotalStats';
import { TrainingHistoryTable } from './components/TrainingHistoryTable';
import { TrainingRegularityChart } from './components/TrainingRegularityChart';
import { TrainingSessionsChart } from './components/TrainingSessionsChart';

export const StatisticsPage = () => {
  const stats = useTrainingsStatsStore((state) => state.stats);
  const trainings = useTrainingsStore((state) => state.trainings);
  const [efficiencyData, setEfficiencyData] = useState<IChartData[]>([]);
  const [trainingTimeBarData, setTrainingTimeBarData] = useState<IChartData[]>([]);

  const hasData = stats.length > 0 && stats.some((stat) => stat.totalSessions > 0);

  useEffect(() => {
    setEfficiencyData(
      stats.map((stat) => {
        const training = trainings.find((t) => t.id === stat.trainingId);
        return {
          name: training?.title || 'Удалённая тренировка',
          value: Math.round(stat.averageEfficiency),
        };
      })
    );
    setTrainingTimeBarData(
      stats
        .map((stat) => {
          const training = trainings.find((t) => t.id === stat.trainingId);
          const avgSessionTime = Math.ceil(
            Math.ceil((stats.find((s) => s.trainingId === training?.id)?.totalDuration || 0) / 1000) / 60
          );
          return {
            name: training?.title || 'Удалённая тренировка',
            value: Math.round(avgSessionTime),
          };
        })
        .sort((a, b) => b.value - a.value)
    );
  }, [stats, trainings]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen p-2 sm:p-4 px-0 sm:px-6 space-y-4 sm:space-y-6"
    >
      <div className="container max-w-7xl mx-auto space-y-4 sm:space-y-6">
        {!hasData ? (
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Нет данных</AlertTitle>
              <AlertDescription className="text-sm">
                Здесь будет отображаться статистика после завершения тренировок. Начните тренироваться, чтобы увидеть
                свой прогресс!
              </AlertDescription>
            </Alert>
          </motion.div>
        ) : (
          <>
            <TotalStats />

            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.7 }}>
              <Card className="p-3 sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-4 flex items-center gap-4">
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                  Кол-во тренировок по месяцам
                </h3>
                <MonthlySessionsChart />
              </Card>
            </motion.div>

            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.8 }}>
              <Card className="p-3 sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-4 flex items-center gap-4">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                  Кол-во сессий по тренировкам
                </h3>
                <TrainingSessionsChart />
              </Card>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-6">
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="h-full"
              >
                <Card className="p-3 sm:p-6 h-full">
                  <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-4 flex items-center gap-4">
                    <Users className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                    Тренировки по группам мышц
                  </h3>
                  <BodyPartsChart />
                </Card>
              </motion.div>

              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="h-full"
              >
                <Card className="p-3 sm:p-6 h-full">
                  <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-4 flex items-center gap-4">
                    <Target className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                    Регулярность тренировок
                  </h3>
                  <TrainingRegularityChart />
                </Card>
              </motion.div>

              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="h-full"
              >
                <Card className="p-3 sm:p-6 h-full">
                  <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-4 flex items-center gap-4">
                    <LineChart className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                    Эффективность тренировок
                  </h3>
                  <ProgressBarsChart data={efficiencyData} />
                </Card>
              </motion.div>

              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="h-full"
              >
                <Card className="p-3 sm:p-6 h-full">
                  <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-4 flex items-center gap-4">
                    <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                    Общее время по тренировкам
                  </h3>
                  <ProgressBarsChart data={trainingTimeBarData} valueLabel="мин" />
                </Card>
              </motion.div>
            </div>

            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.9 }}>
              <Card className="p-3 sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-4 flex items-center gap-4">
                  <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                  История тренировок (последние 50)
                </h3>
                <TrainingHistoryTable />
              </Card>
            </motion.div>
          </>
        )}
      </div>
    </motion.div>
  );
};
