import { useEffect, useState } from 'react';
import * as motion from 'motion/react-m';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { IChartData, getLast12Months } from '@/helpers/StatisticsHelper';
import { useTrainingsStatsStore } from '@/stores/trainingsStatsStore';

export const MonthlySessionsChart = () => {
  const stats = useTrainingsStatsStore((state) => state.stats);
  const [openStates, setOpenStates] = useState<Record<string, boolean>>({});
  const [data, setData] = useState<IChartData[]>([]);

  useEffect(() => {
    const newData: Record<string, number> = {};
    stats.forEach((stat) => {
      stat.sessions.forEach((session) => {
        const date = new Date(session.startTime);
        const month = date.toLocaleString('ru', { month: 'short' });
        newData[month] = (newData[month] || 0) + 1;
      });
    });
    setData(Object.entries(newData).map(([name, value]) => ({ name, value })));
  }, [stats]);

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const last12Months = getLast12Months(data, currentMonth);
  const maxValue = Math.max(...data.map((item) => item.value), 1);

  return (
    <div className="sm:block">
      <ScrollArea className="w-full md:hidden">
        <div className="min-w-[600px]">
          <div className="pt-3 sm:pt-6 space-y-4 sm:space-y-8">
            <div className="relative h-[160px] sm:h-[200px] w-full">
              {last12Months.map((item, index) => {
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
                        className={`absolute bottom-0 transition-colors ${
                          item.monthIndex === currentMonth ? 'bg-primary' : 'bg-primary/60 hover:bg-primary/80'
                        }`}
                        style={{
                          left: `${(index / 12) * 100}%`,
                          width: `${85 / 12}%`,
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
                      className="w-auto p-2 sm:p-3"
                      align="center"
                      sideOffset={5}
                      alignOffset={0}
                      style={{ zIndex: 50, marginTop: '-50px', marginLeft: `${index == 0 ? 30 : -50}px` }}
                    >
                      <div className="space-y-1 ">
                        <p className="text-xs sm:text-sm font-medium">{item.name}</p>
                        <p className="text-xs sm:text-sm text-primary">{item.value} тренировок</p>
                        {item.monthIndex === currentMonth && (
                          <p className="text-[10px] sm:text-xs text-muted-foreground">Текущий месяц</p>
                        )}
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                );
              })}
            </div>

            <div className="grid grid-cols-12 gap-0.5 sm:gap-1 text-[10px] sm:text-xs">
              {last12Months.map((item) => (
                <div
                  key={item.name}
                  className={`text-center ${
                    item.monthIndex === currentMonth ? 'text-primary font-medium' : 'text-muted-foreground'
                  }`}
                >
                  {item.name}
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
            {last12Months.map((item, index) => {
              const height = (item.value / maxValue) * 100;
              return (
                <HoverCard key={item.name} openDelay={0}>
                  <HoverCardTrigger asChild>
                    <motion.div
                      initial={{ height: 1 }}
                      animate={{ height: `${Math.max(height, 1)}%` }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                      className={`absolute bottom-0 transition-colors ${
                        item.monthIndex === currentMonth ? 'bg-primary' : 'bg-primary/60 hover:bg-primary/80'
                      }`}
                      style={{
                        left: `${(index / 12) * 100}%`,
                        width: `${85 / 12}%`,
                        borderRadius: '4px 4px 0 0',
                      }}
                    />
                  </HoverCardTrigger>
                  <HoverCardContent className="w-auto p-2 sm:p-3">
                    <div className="space-y-1">
                      <p className="text-xs sm:text-sm font-medium">{item.name}</p>
                      <p className="text-xs sm:text-sm text-primary">{item.value} тренировок</p>
                      {item.monthIndex === currentMonth && (
                        <p className="text-[10px] sm:text-xs text-muted-foreground">Текущий месяц</p>
                      )}
                    </div>
                  </HoverCardContent>
                </HoverCard>
              );
            })}
          </div>
          <div className="grid grid-cols-12 gap-1 text-xs">
            {last12Months.map((item) => (
              <div
                key={item.name}
                className={`text-center ${
                  item.monthIndex === currentMonth ? 'text-primary font-medium' : 'text-muted-foreground'
                }`}
              >
                {item.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
