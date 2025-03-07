import * as motion from 'motion/react-m';
import { ChevronDown } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { getFilterLabel, getFilterOptions } from '@/helpers/ExercisesHelper';
import { cn } from '@/lib/utils';
import { IExerciseFilters } from '@/models/Stores/Exercises/IExercise';

interface IDesktopFiltersProps {
  filters: IExerciseFilters;
  handleFilterOptionClick: (filterType: keyof IExerciseFilters, option: string) => () => void;
}

export const DesktopFilters = ({ filters, handleFilterOptionClick }: IDesktopFiltersProps) => {
  return (
    <div className="hidden md:flex md:flex-nowrap gap-4">
      {(Object.keys(filters) as Array<keyof IExerciseFilters>).map((filterType) => (
        <motion.div
          key={filterType}
          className="w-full xl:w-auto"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  'w-full xl:w-[200px] justify-between bg-background/50 backdrop-blur-sm transition-all duration-200',
                  'hover:bg-background/70 hover:border-primary/50',
                  'focus:ring-2 focus:ring-primary/20 focus:border-primary/50',
                  filters[filterType].length > 0 && 'border-primary/50 bg-background/70'
                )}
              >
                <span className="flex items-center gap-1">
                  {getFilterLabel(filterType)}
                  {filters[filterType].length > 0 && (
                    <Badge variant="secondary" className="ml-1 bg-primary/20 hover:bg-primary/30 transition-colors">
                      {filters[filterType].length}
                    </Badge>
                  )}
                </span>
                <ChevronDown className="h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] p-3 bg-card/80 backdrop-blur-sm border border-border/50">
              <div className="flex flex-col gap-1.5">
                {getFilterOptions(filterType).map((option) => (
                  <Button
                    key={option}
                    variant={filters[filterType].includes(option as never) ? 'secondary' : 'ghost'}
                    size="sm"
                    scaling="sm"
                    className={cn(
                      'w-full justify-start font-medium transition-all duration-200 ',
                      'hover:pl-2 hover:pr-2 ',
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
            </PopoverContent>
          </Popover>
        </motion.div>
      ))}
    </div>
  );
};
