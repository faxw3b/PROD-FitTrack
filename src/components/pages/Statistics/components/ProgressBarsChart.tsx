import * as motion from 'motion/react-m';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { IChartData } from '@/helpers/StatisticsHelper';

interface IProgressBarsChartProps {
  data: IChartData[];
  valueLabel?: string;
}

export const ProgressBarsChart = ({ data, valueLabel = '%' }: IProgressBarsChartProps) => {
  const maxValue = valueLabel === '%' ? 100 : Math.max(...data.map((item) => item.value));
  const sortedData = [...data].sort((a, b) => b.value - a.value);
  return (
    <div className="space-y-4">
      {sortedData.map((item, index) => (
        <HoverCard key={item.name}>
          <HoverCardTrigger asChild>
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="space-y-1.5"
            >
              <div className="flex items-center justify-between text-sm">
                <span className="truncate font-medium">{item.name}</span>
                <span className="text-primary">
                  {item.value}
                  {valueLabel}
                </span>
              </div>
              <div className="relative h-2 w-full overflow-hidden rounded-full bg-primary/10">
                <motion.div
                  className="h-full bg-primary"
                  initial={{ width: 0 }}
                  animate={{ width: `${(item.value / maxValue) * 100}%` }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                />
              </div>
            </motion.div>
          </HoverCardTrigger>
          <HoverCardContent className="w-80">
            <div className="space-y-2">
              <p className="text-sm font-medium">{item.name}</p>
              <div className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span>{valueLabel === '%' ? 'Эффективность' : 'Время'}</span>
                  <span className="text-primary">
                    {item.value}
                    {valueLabel}
                  </span>
                </div>
                <div className="text-xs text-muted-foreground">
                  {(item.value / maxValue) * 100 >= 80
                    ? 'Отличный результат!'
                    : (item.value / maxValue) * 100 >= 50
                      ? 'Хороший результат'
                      : 'Есть куда стремиться'}
                </div>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      ))}
    </div>
  );
};
