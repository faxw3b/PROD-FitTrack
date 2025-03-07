import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip, TooltipProps } from 'recharts';
import { useEffect, useState } from 'react';
import * as motion from 'motion/react-m';
import { Card } from '@/components/ui/card';
import { BodyPartsIcons, ChartColors, IChartData } from '@/helpers/StatisticsHelper';
import { useTrainingsStatsStore } from '@/stores/trainingsStatsStore';
import { useTrainingsStore } from '@/stores/trainingsStore';

export const BodyPartsChart = () => {
  const stats = useTrainingsStatsStore((state) => state.stats);
  const trainings = useTrainingsStore((state) => state.trainings);
  const [data, setData] = useState<IChartData[]>([]);

  useEffect(() => {
    const newData: Record<string, number> = {};
    stats.forEach((stat) => {
      const training = trainings.find((t) => t.id === stat.trainingId);
      if (training) {
        training.targetBodyParts.forEach((part) => {
          newData[part] = (newData[part] || 0) + stat.totalSessions;
        });
      }
    });

    setData(
      Object.entries(newData)
        .map(([name, value]) => ({ name, value }))
        .sort((a, b) => b.value - a.value)
    );
  }, [stats, trainings]);

  const total = data.reduce((acc, item) => acc + item.value, 0);
  const chartData: IChartData[] = data.map((item) => ({
    ...item,
    total,
  }));

  return (
    <div className="space-y-8">
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={chartData} cx="50%" cy="50%" innerRadius={60} outerRadius={120} paddingAngle={2} dataKey="value">
              {chartData.map((entry) => (
                <Cell
                  key={entry.name}
                  fill={ChartColors[entry.name as keyof typeof ChartColors]}
                  className="stroke-background hover:opacity-80 transition-opacity"
                  strokeWidth={2}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {data.map((item, index) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center gap-2 p-2 rounded-lg bg-muted/30"
          >
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: ChartColors[item.name as keyof typeof ChartColors] }}
            />
            <div className="flex-1 flex items-center justify-between">
              <span className="text-sm">{item.name}</span>
              <span className="text-sm text-muted-foreground">{item.value}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const percentage = ((data.value / data.total) * 100).toFixed(1);
    return (
      <Card className="p-3 shadow-lg">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="text-xl">{BodyPartsIcons[data.name as keyof typeof BodyPartsIcons]}</span>
            <p className="font-medium">{data.name}</p>
          </div>
          <div className="space-y-1 text-sm">
            <div className="flex items-center justify-between gap-8">
              <span className="text-muted-foreground">Включено в тренировки</span>
              <span className="font-medium">{data.value} раз</span>
            </div>
            <div className="flex items-center justify-between gap-8">
              <span className="text-muted-foreground">Процент использования</span>
              <span className="font-medium">{percentage}%</span>
            </div>
          </div>
        </div>
      </Card>
    );
  }
  return null;
};
