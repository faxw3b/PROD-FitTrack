import { useEffect, useState } from 'react';
import { AnimatePresence } from 'motion/react';
import * as motion from 'motion/react-m';
import { Plus } from 'lucide-react';
import { ExerciseCard } from '@/components/pages/Exercises/ExerciseCard';
import { AnimatedCard } from '@/components/ui/animated-card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { IExerciseFilters } from '@/models/Stores/Exercises/IExercise';
import { useExercisesStore } from '@/stores/exercisesStore';
import { CreateExerciseForm } from './CreateExerciseForm';
import { ActiveFilters } from './Filters/ActiveFilters';
import { DesktopFilters } from './Filters/DesktopFilters';
import { MobileFilters } from './Filters/MobileFilters';
import { SearchInput } from './Filters/SearchInput';

export const ExercisesPage = () => {
  const exercises = useExercisesStore((state) => state.exercises);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<IExerciseFilters>({
    difficulty: [],
    bodyParts: [],
    equipment: [],
    exerciseType: [],
  });
  const [filteredExercises, setFilteredExercises] = useState(exercises);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const addFilter = (type: keyof IExerciseFilters, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [type]: [...prev[type], value],
    }));
  };

  const removeFilter = (type: keyof IExerciseFilters, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [type]: prev[type].filter((item) => item !== value),
    }));
  };

  const handleFilterOptionClick = (filterType: keyof IExerciseFilters, option: string) => () => {
    if (filters[filterType].includes(option as never)) {
      removeFilter(filterType, option);
    } else {
      addFilter(filterType, option);
    }
  };

  useEffect(() => {
    const filtered = exercises.filter((exercise) => {
      const matchesSearch = exercise.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDifficulty = filters.difficulty.length === 0 || filters.difficulty.includes(exercise.difficulty);
      const matchesBodyParts =
        filters.bodyParts.length === 0 || exercise.bodyParts.some((part) => filters.bodyParts.includes(part));
      const matchesEquipment =
        filters.equipment.length === 0 || exercise.equipment.some((eq) => filters.equipment.includes(eq));
      const matchesType = filters.exerciseType.length === 0 || filters.exerciseType.includes(exercise.exerciseType);

      return matchesSearch && matchesDifficulty && matchesBodyParts && matchesEquipment && matchesType;
    });
    setFilteredExercises(filtered);
  }, [exercises, searchQuery, filters]);

  return (
    <div className="min-h-screen">
      <div className="container mx-auto py-4 pb-8 md:py-4 space-y-8">
        <div className="flex flex-col gap-4 md:gap-8">
          <div className="flex items-center justify-between">
            <motion.h1
              className="text-3xl sm:text-4xl font-bold tracking-tight"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Упражнения
            </motion.h1>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  <Button className="gap-2 group" size="sm">
                    <Plus className="h-4 w-4 transition-transform group-hover:rotate-90" />
                    <span className="hidden sm:inline">Добавить упражнение</span>
                  </Button>
                </motion.div>
              </DialogTrigger>
              <DialogContent className="sm:max-w-2xl max-h-[90vh] mt-10 sm:mt-0 overflow-y-auto p-3 pt-0 pb-14 sm:p-6 flex flex-col">
                <DialogHeader className="p-6 pb-2 bg-background/50 border-b border-border/10 flex-shrink-0 flex items-center">
                  <DialogTitle className="text-2xl font-bold text-foreground">Создание нового упражнения</DialogTitle>
                </DialogHeader>
                <div className="pt-4 overflow-y-auto">
                  <CreateExerciseForm onFormClose={() => setIsDialogOpen(false)} />
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <Separator className="md:-mt-3" />
          <motion.div
            className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 bg-card p-4 sm:p-4 rounded-xl shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-1px_rgba(0,0,0,0.06)] dark:shadow-[0_4px_6px_-1px_rgba(255,255,255,0.1),0_2px_4px_-1px_rgba(255,255,255,0.06)] border border-border/50 backdrop-blur-sm sticky top-4 z-10"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <SearchInput searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <DesktopFilters filters={filters} handleFilterOptionClick={handleFilterOptionClick} />
            <MobileFilters filters={filters} handleFilterOptionClick={handleFilterOptionClick} />
          </motion.div>
          <ActiveFilters filters={filters} removeFilter={removeFilter} />
        </div>
        <AnimatePresence>
          {filteredExercises.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredExercises.map((exercise, index) => (
                <AnimatedCard key={exercise.id} index={index}>
                  <ExerciseCard exercise={exercise} />
                </AnimatedCard>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center py-12"
            >
              <p className="text-xl text-muted-foreground">Упражнения не найдены</p>
              {JSON.stringify(filteredExercises) != JSON.stringify(exercises) && (
                <p className="text-sm text-muted-foreground mt-2">Попробуйте изменить параметры поиска или фильтры</p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
