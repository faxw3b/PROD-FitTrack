import { AnimatePresence } from 'motion/react';
import * as motion from 'motion/react-m';
import { X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { IExerciseFilters } from '@/models/Stores/Exercises/IExercise';

interface IActiveFiltersProps {
  filters: IExerciseFilters;
  removeFilter: (type: keyof IExerciseFilters, value: string) => void;
}

export const ActiveFilters = ({ filters, removeFilter }: IActiveFiltersProps) => {
  const activeFilters = Object.values(filters).filter((values) => values.length > 0);
  if (activeFilters.length === 0) return null;

  return (
    <AnimatePresence mode="wait">
      {Object.values(filters).some((values) => values.length > 0) && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="flex flex-wrap gap-2"
        >
          {(Object.entries(filters) as Array<[keyof IExerciseFilters, string[]]>).map(([type, values]) =>
            values.map((value) => (
              <motion.div
                key={`${type}-${value}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                whileHover={{ scale: 1.05 }}
              >
                <Badge variant="secondary" className="px-3 py-1 hover:bg-secondary/80 transition-colors duration-200">
                  {value}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 ml-2 hover:bg-transparent"
                    onClick={() => removeFilter(type, value)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              </motion.div>
            ))
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
