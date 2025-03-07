import { Reorder } from 'motion/react';
import * as motion from 'motion/react-m';
import { Wand2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ExerciseSelect } from '@/components/ui/exercise-select';
import { FormLabel } from '@/components/ui/form';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { calculateExerciseTargetValue, generateExercisesForTraining } from '@/helpers/TrainingsHelper';
import { cn } from '@/lib/utils';
import { ITrainingFormData } from '@/models/Schemas/TrainingFormSchema';
import { IExerciseBodyPart } from '@/models/Stores/Exercises/IExercise';
import { SelectedExercise } from '@/models/Stores/Trainings/ITraining';
import { useExercisesStore } from '@/stores/exercisesStore';
import { useUserStore } from '@/stores/userStore';
import { ChooseExerciseItem } from './ChooseExerciseItem';

interface IChooseExercisesProps {
  selectedExercises: SelectedExercise[];
  setSelectedExercises: React.Dispatch<React.SetStateAction<SelectedExercise[]>>;
  formValues: ITrainingFormData;
}

export const ChooseExercises = ({ selectedExercises, setSelectedExercises, formValues }: IChooseExercisesProps) => {
  const user = useUserStore((state) => state.user);
  const exercises = useExercisesStore((state) => state.exercises);

  const handleExerciseAdd = (exerciseId: number) => {
    const exercise = exercises.find((ex) => ex.id === exerciseId);
    if (!exercise) return;

    const targetValue = calculateExerciseTargetValue(user, exercise);
    setSelectedExercises((prev) => [
      ...prev,
      {
        exerciseId: exercise.id,
        targetValue,
        order: prev.length,
        title: exercise.title,
        exerciseType: exercise.exerciseType,
        minValue: exercise.minValue,
        maxValue: exercise.maxValue,
      },
    ]);
  };

  const handleTargetValueChange = (index: number, value: number) => {
    const updatedExercises = [...selectedExercises];
    updatedExercises[index] = { ...updatedExercises[index], targetValue: value };
    setSelectedExercises(updatedExercises);
  };

  const handleReorder = (reorderedExercises: SelectedExercise[]) => {
    setSelectedExercises(
      reorderedExercises.map((exercise, index) => ({
        ...exercise,
        order: index,
      }))
    );
  };

  const handleExerciseRemove = (exerciseId: number) => {
    setSelectedExercises((prev) => prev.filter((ex) => ex.exerciseId !== exerciseId));
  };

  const handleGenerateExercises = () => {
    if (!formValues.targetBodyParts || formValues.targetBodyParts.length === 0) {
      return;
    }

    const generatedExercises = generateExercisesForTraining({
      exercises,
      bodyParts: formValues.targetBodyParts as IExerciseBodyPart[],
      difficulty: formValues.difficulty,
      count: formValues.difficulty === 'Простое' ? 3 : formValues.difficulty === 'Среднее' ? 5 : 7,
    });

    const selectedExercisesList = generatedExercises.map((ex, index) => ({
      exerciseId: ex.id,
      targetValue: calculateExerciseTargetValue(user, ex),
      order: index,
      title: ex.title,
      exerciseType: ex.exerciseType,
      minValue: ex.minValue,
      maxValue: ex.maxValue,
    }));

    setSelectedExercises(selectedExercisesList);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: 0.3 }}
      className="space-y-4 bg-card p-6 rounded-lg border shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex flex-col items-start gap-2 sm:flex-row justify-between sm:items-center">
        <FormLabel className="text-base font-semibold">Упражнения</FormLabel>
        <TooltipProvider>
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant="outline"
                size="sm"
                scaling="none"
                className={cn(
                  'gap-2',
                  !formValues.targetBodyParts || (formValues.targetBodyParts.length === 0 && 'opacity-50')
                )}
                onClick={handleGenerateExercises}
              >
                <Wand2 className="h-4 w-4" />
                Сгенерировать упражнения
              </Button>
            </TooltipTrigger>
            {(!formValues.targetBodyParts || formValues.targetBodyParts.length === 0) && (
              <TooltipContent>
                <p>Выберите хотя бы одну часть тела</p>
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
      </div>
      <ExerciseSelect
        options={exercises.map((ex) => ({ label: ex.title, value: ex.id.toString() }))}
        onSelect={(value) => handleExerciseAdd(Number(value))}
        selectedValues={selectedExercises.map((ex) => ex.exerciseId.toString())}
        placeholder="Добавить упражнение"
      />
      <Reorder.Group axis="y" values={selectedExercises} onReorder={handleReorder} className="space-y-3 mt-4">
        {selectedExercises.map((exercise, index) => (
          <ChooseExerciseItem
            key={exercise.exerciseId}
            exercise={exercise}
            onValueChange={(value) => handleTargetValueChange(index, value)}
            onRemove={() => handleExerciseRemove(exercise.exerciseId)}
          />
        ))}
      </Reorder.Group>
    </motion.div>
  );
};
