import { ITraining } from '@/models/Stores/Trainings/ITraining';
import { ITrainingStats } from '@/models/Stores/TrainingsStats/ITrainingStats';

export const ChartColors = {
  Ноги: 'hsl(var(--chart-1))',
  Руки: 'hsl(var(--chart-2))',
  Пресс: 'hsl(var(--chart-3))',
  Спина: 'hsl(var(--chart-4))',
  Грудь: 'hsl(var(--chart-5))',
  Плечи: 'hsl(var(--chart-6))',
};

export const BodyPartsIcons = {
  Ноги: '🦵',
  Руки: '💪',
  Пресс: '🏋️‍♂️',
  Спина: '🔄',
  Грудь: '👕',
  Плечи: '🎯',
};

export interface IChartData {
  name: string;
  value: number;
  total?: number;
}

const getShortMonthName = (monthIndex: number) => {
  const date = new Date(2024, monthIndex, 1);
  return date.toLocaleString('ru', { month: 'short' });
};

export const getLast12Months = (data: IChartData[], currentMonth: number): (IChartData & { monthIndex: number })[] => {
  return Array.from({ length: 12 }, (_, i) => {
    const monthIndex = (currentMonth - i + 12) % 12;
    const monthName = getShortMonthName(monthIndex);
    return {
      name: monthName,
      value: data.find((item) => item.name === monthName)?.value || 0,
      monthIndex,
    };
  }).reverse();
};

export const countRegularity = (stats: ITrainingStats[], trainings: ITraining[]) => {
  return stats.map((stat) => {
    const training = trainings.find((t) => t.id === stat.trainingId);

    if (stat.sessions.length === 0) {
      return {
        name: training?.title || 'Удалённая тренировка',
        regularity: 0,
      };
    }

    if (stat.sessions.length === 1) {
      return {
        name: training?.title || 'Удалённая тренировка',
        regularity: 50,
      };
    }

    const timestamps = stat.sessions.map((s) => new Date(s.startTime).getTime()).sort((a, b) => a - b);
    const intervals = timestamps.slice(1).map((time, i) => time - timestamps[i]);
    const avgInterval = intervals.reduce((acc, val) => acc + val, 0) / intervals.length;
    const variance = intervals.reduce((acc, val) => acc + Math.pow(val - avgInterval, 2), 0) / intervals.length;
    const stdDev = Math.sqrt(variance);
    const regularity = Math.max(0, Math.min(100, 100 - (stdDev / avgInterval) * 10));

    return {
      name: training?.title || 'Удалённая тренировка',
      regularity: Math.round(regularity),
    };
  });
};
