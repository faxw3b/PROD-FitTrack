import { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import * as motion from 'motion/react-m';
import { ChevronDown, Filter } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { getFilterLabel, getFilterOptions } from '@/helpers/ExercisesHelper';
import { cn } from '@/lib/utils';
import { IExerciseFilters } from '@/models/Stores/Exercises/IExercise';

interface IMobileFiltersProps {
  filters: IExerciseFilters;
  handleFilterOptionClick: (filterType: keyof IExerciseFilters, option: string) => () => void;
}

export const MobileFilters = ({ filters, handleFilterOptionClick }: IMobileFiltersProps) => {
  const [expandedFilters, setExpandedFilters] = useState<Record<string, boolean>>({});

  const handleFilterClick = (filterType: keyof IExerciseFilters) => () => {
    setExpandedFilters((prev) => ({
      ...prev,
      [filterType]: !prev[filterType],
    }));
  };

  return (
    <div className="md:hidden w-full">
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            scaling="sm"
            className="w-full justify-between bg-background/50 backdrop-blur-sm hover:bg-background/70 hover:border-primary/50 group"
          >
            <span className="flex items-center gap-2">
              <Filter className="h-4 w-4 transition-colors group-hover:text-primary" />
              Фильтры
              {Object.values(filters).some((arr) => arr.length > 0) && (
                <Badge variant="secondary" className="ml-1 bg-primary/20">
                  {Object.values(filters).reduce((acc, arr) => acc + arr.length, 0)}
                </Badge>
              )}
            </span>
            <ChevronDown className="h-4 w-4 opacity-50 transition-transform group-hover:translate-y-0.5" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[600px] h-[90vh] mt-16 p-0 pb-8 gap-0 bg-background/95 backdrop-blur-md flex flex-col rounded-sm">
          <DialogHeader className="p-6 pb-2 bg-background/50 border-b border-border/10 flex-shrink-0 flex items-center">
            <DialogTitle className="text-2xl font-bold text-foreground">Фильтры упражнений</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4 flex-1 overflow-y-auto px-3 pb-6 pt-4 custom-scrollbar">
            {(Object.keys(filters) as Array<keyof IExerciseFilters>).map((filterType) => (
              <motion.div
                key={filterType}
                className="space-y-3 bg-card/50 p-4 rounded-xl border border-border/50 shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <button
                  className="w-full font-medium text-lg flex items-center justify-between text-foreground/90"
                  onClick={handleFilterClick(filterType)}
                >
                  <span>{getFilterLabel(filterType)}</span>
                  <span className="flex items-center gap-2">
                    {filters[filterType].length > 0 && (
                      <Badge variant="secondary" className="bg-primary/20 px-2.5 py-0.5 font-semibold">
                        {filters[filterType].length}
                      </Badge>
                    )}
                    <ChevronDown
                      className={cn('h-4 w-4 transition-transform', expandedFilters[filterType] ? 'rotate-180' : '')}
                    />
                  </span>
                </button>
                <AnimatePresence>
                  {expandedFilters[filterType] && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="flex flex-col gap-1.5">
                        {getFilterOptions(filterType).map((option) => (
                          <Button
                            key={option}
                            variant={filters[filterType].includes(option as never) ? 'secondary' : 'ghost'}
                            size="sm"
                            scaling="sm"
                            className={cn(
                              'w-full justify-start font-medium transition-all duration-200',
                              'hover:pl-2 hover:pr-2',
                              filters[filterType].includes(option as never)
                                ? 'bg-secondary/80 hover:bg-secondary/90'
                                : 'hover:bg-secondary/20'
                            )}
                            onClick={handleFilterOptionClick(filterType, option)}
                          >
                            <motion.span
                              initial={false}
                              animate={{
                                scale: filters[filterType].includes(option as never) ? 1.01 : 1,
                              }}
                              transition={{ duration: 0.15 }}
                              className="flex items-center gap-2"
                            >
                              <motion.div
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{
                                  scale: filters[filterType].includes(option as never) ? 1 : 0,
                                  opacity: filters[filterType].includes(option as never) ? 0.9 : 0,
                                }}
                                transition={{ duration: 0.15 }}
                                className="min-w-[4px] h-1 rounded-full bg-primary"
                              />
                              {option}
                            </motion.span>
                          </Button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
