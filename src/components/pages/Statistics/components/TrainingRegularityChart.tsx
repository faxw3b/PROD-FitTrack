import { PolarAngleAxis, PolarGrid, Radar, RadarChart, ResponsiveContainer, Tooltip, TooltipProps } from 'recharts';
import { Card } from '@/components/ui/card';
import { countRegularity } from '@/helpers/StatisticsHelper';
import { useTrainingsStatsStore } from '@/stores/trainingsStatsStore';
import { useTrainingsStore } from '@/stores/trainingsStore';

export const TrainingRegularityChart = () => {
  const stats = useTrainingsStatsStore((state) => state.stats);
  const trainings = useTrainingsStore((state) => state.trainings);
  const metricsData = countRegularity(stats, trainings);
  return (
    <div className="h-[200px] sm:h-[300px] lg:h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={metricsData} cx="50%" cy="50%">
          <PolarGrid stroke="hsl(var(--border))" strokeDasharray="2 2" gridType="circle" />
          <PolarAngleAxis
            dataKey="name"
            tick={{
              fill: 'hsl(var(--muted-foreground))',
              fontSize: '10px',
              className: 'sm:text-xs lg:text-sm',
            }}
            tickFormatter={(value) => (value.length > 10 ? `${value.substring(0, 10)}...` : value)}
            stroke="hsl(var(--border))"
            strokeWidth={0.5}
          />
          <Tooltip content={<CustomTooltip />} wrapperStyle={{ fontSize: '12px' }} />
          <Radar
            name="Регулярность"
            dataKey="regularity"
            stroke="hsl(var(--primary))"
            fill="hsl(var(--primary))"
            fillOpacity={0.15}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <Card className="p-2 sm:p-3 shadow-lg">
        <div className="space-y-1 sm:space-y-1.5">
          <p className="font-medium text-xs sm:text-sm">{data.name}</p>
          <div className="text-xs sm:text-sm">
            <div className="flex items-center justify-between gap-4 sm:gap-8">
              <span className="text-muted-foreground">Регулярность:</span>
              <span className="font-medium">{data.regularity}%</span>
            </div>
          </div>
        </div>
      </Card>
    );
  }
  return null;
};
