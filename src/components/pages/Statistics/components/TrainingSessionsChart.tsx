import { useEffect, useState } from 'react';
import * as motion from 'motion/react-m';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { IChartData } from '@/helpers/StatisticsHelper';
import { useTrainingsStatsStore } from '@/stores/trainingsStatsStore';
import { useTrainingsStore } from '@/stores/trainingsStore';

export const TrainingSessionsChart = () => {
  const stats = useTrainingsStatsStore((state) => state.stats);
  const trainings = useTrainingsStore((state) => state.trainings);
  const [openStates, setOpenStates] = useState<Record<string, boolean>>({});
  const [data, setData] = useState<IChartData[]>([]);

  useEffect(() => {
    const sortedData: IChartData[] = stats.map((stat) => {
      const training = trainings.find((t) => t.id === stat.trainingId);
      return {
        name: training?.title || 'Удалённая тренировка',
        value: stat.totalSessions,
        total: Math.round(stats.reduce((acc, s) => acc + s.totalSessions, 0)),
      };
    });
    setData([...sortedData].sort((a, b) => b.value - a.value));
  }, [stats, trainings]);

  const maxValue = Math.max(...data.map((item) => item.value), 1);
  const minWidth = Math.max(data.length * 100, 600);

  return (
    <div className="sm:block">
      <ScrollArea className="w-full md:hidden">
        <div style={{ minWidth: `${minWidth}px` }}>
          <div className="pt-3 space-y-4">
            <div className="relative h-[160px] w-full ">
              {data.map((item, index) => {
                const height = (item.value / maxValue) * 100;
                return (
                  <HoverCard
                    key={item.name}
                    openDelay={0}
                    open={openStates[item.name]}
                    onOpenChange={(open) => {
                      setOpenStates((prev) => ({
                        ...prev,
                        [item.name]: open,
                      }));
                    }}
                  >
                    <HoverCardTrigger asChild>
                      <motion.div
                        initial={{ height: 1 }}
                        animate={{ height: `${Math.max(height, 1)}%` }}
                        transition={{ duration: 0.5, delay: index * 0.05 }}
                        className="absolute bottom-0 bg-primary/60 hover:bg-primary/80 active:bg-primary/80 transition-colors"
                        style={{
                          left: `${(index / data.length) * 100}%`,
                          width: `${85 / data.length}%`,
                          borderRadius: '4px 4px 0 0',
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenStates((prev) => ({
                            ...prev,
                            [item.name]: !prev[item.name],
                          }));
                          setTimeout(() => {
                            setOpenStates((prev) => ({
                              ...prev,
                              [item.name]: !prev[item.name],
                            }));
                          }, 1000);
                        }}
                      />
                    </HoverCardTrigger>
                    <HoverCardContent
                      align="center"
                      sideOffset={5}
                      alignOffset={0}
                      style={{
                        zIndex: 50,
                        marginTop: '-50px',
                        marginLeft: `${index == 0 ? 30 : -50}px`,
                        maxWidth: '140px',
                      }}
                    >
                      <div className="space-y-1">
                        <p className="text-xs sm:text-sm font-medium">
                          {item.name.length > 12 ? `${item.name.substring(0, 12)}...` : item.name}
                        </p>
                        <p className="text-xs sm:text-sm text-primary">{item.value} сессий</p>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                );
              })}
            </div>
            <div className="grid gap-0.5 text-[10px]" style={{ gridTemplateColumns: `repeat(${data.length}, 1fr)` }}>
              {data.map((item) => (
                <div key={item.name} className="text-center text-muted-foreground">
                  <span className="truncate block" title={item.name}>
                    {item.name.length > 12 ? `${item.name.substring(0, 12)}...` : item.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <div className="hidden md:block">
        <div className="pt-6 space-y-8">
          <div className="relative h-[200px] w-full">
            {data.map((item, index) => {
              const height = (item.value / maxValue) * 100;
              return (
                <HoverCard key={item.name} openDelay={0}>
                  <HoverCardTrigger asChild>
                    <motion.div
                      initial={{ height: 1 }}
                      animate={{ height: `${Math.max(height, 1)}%` }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                      className="absolute bottom-0 bg-primary/60 hover:bg-primary/80 active:bg-primary/80 transition-colors"
                      style={{
                        left: `${(index / data.length) * 100}%`,
                        width: `${90 / data.length}%`,
                        borderRadius: '4px 4px 0 0',
                      }}
                    />
                  </HoverCardTrigger>
                  <HoverCardContent className="w-auto p-3">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-sm text-primary">{item.value} сессий</p>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              );
            })}
          </div>
          <div className="grid gap-1 text-xs" style={{ gridTemplateColumns: `repeat(${data.length}, 1fr)` }}>
            {data.map((item) => (
              <div key={item.name} className="text-center text-muted-foreground">
                <span className="truncate block" title={item.name}>
                  {item.name.length > 16 ? `${item.name.substring(0, 16)}...` : item.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
