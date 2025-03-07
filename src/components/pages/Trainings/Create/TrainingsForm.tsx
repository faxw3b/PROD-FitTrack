import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import * as motion from 'motion/react-m';
import { Play, Save } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { MultiSelect } from '@/components/ui/multi-select';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { ToastAction } from '@/components/ui/toast';
import { bodyParts } from '@/helpers/ExercisesHelper';
import { createTrainingData, defaultTrainingFormValues } from '@/helpers/TrainingsHelper';
import { useToast } from '@/hooks/use-toast';
import { ITrainingFormData, trainingFormSchema } from '@/models/Schemas/TrainingFormSchema';
import { ITraining, SelectedExercise } from '@/models/Stores/Trainings/ITraining';
import { useExercisesStore } from '@/stores/exercisesStore';
import { useTrainingsStore } from '@/stores/trainingsStore';
import { ChooseExercises } from './ChooseExercises';

interface TrainingsFormProps {
  onFormClose: () => void;
  editMode?: boolean;
  trainingToEdit?: ITraining;
}

export const TrainingsForm = ({ onFormClose, editMode = false, trainingToEdit }: TrainingsFormProps) => {
  const navigate = useNavigate();
  const exercises = useExercisesStore((state) => state.exercises);
  const addTraining = useTrainingsStore((state) => state.addTraining);
  const updateTraining = useTrainingsStore((state) => state.updateTraining);
  const [warning, setWarning] = useState<string | null>(null);
  const [selectedExercises, setSelectedExercises] = useState<SelectedExercise[]>(
    editMode && trainingToEdit
      ? trainingToEdit.exercises.map((ex, index) => {
          const exercise = exercises.find((e) => e.id === ex.exerciseId);
          return {
            exerciseId: ex.exerciseId,
            targetValue: ex.targetValue,
            order: index,
            title: exercise?.title || '',
            exerciseType: exercise?.exerciseType || '',
            minValue: exercise?.minValue || 0,
            maxValue: exercise?.maxValue || 0,
          };
        })
      : []
  );
  const form = useForm<ITrainingFormData>({
    resolver: zodResolver(trainingFormSchema),
    defaultValues:
      editMode && trainingToEdit
        ? {
            title: trainingToEdit.title,
            description: trainingToEdit.description,
            targetBodyParts: trainingToEdit.targetBodyParts,
            restBetweenExercises: trainingToEdit.restBetweenExercises,
            difficulty: trainingToEdit.difficulty,
          }
        : defaultTrainingFormValues,
  });
  const { toast } = useToast();

  const handleSaveTraining = (values: ITrainingFormData) => {
    if (selectedExercises.length === 0) {
      setWarning('Добавьте хотя бы одно упражнение');
      return;
    }

    const trainingData = createTrainingData(selectedExercises, values);
    if (editMode && trainingToEdit) {
      updateTraining(trainingToEdit.id, trainingData);
    } else {
      addTraining(trainingData);
    }

    toast({
      title: editMode ? 'Тренировка обновлена' : 'Тренировка создана',
      description: 'Вы можете найти её в списке тренировок',
      action: (
        <ToastAction
          altText="Try again"
          className="text-background bg-foreground hover:bg-accent hover:text-accent-foreground "
        >
          Закрыть
        </ToastAction>
      ),
    });
    onFormClose();
    form.reset();
  };

  const handleStartTraining = async () => {
    const isValid = await form.trigger();
    if (!isValid) return;

    if (selectedExercises.length === 0) {
      setWarning('Добавьте хотя бы одно упражнение');
      return;
    }

    const training = {
      ...createTrainingData(selectedExercises, form.getValues()),
      isTemporary: true,
    };

    addTraining(training);
    navigate({ to: `/trainings/$id/run`, params: { id: training.id.toString() } });
    onFormClose();
    form.reset();
  };

  return (
    <Form {...form}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <form className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="space-y-6 bg-card p-6 rounded-lg border shadow-sm hover:shadow-md transition-shadow"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold">Название тренировки</FormLabel>
                  <FormControl>
                    <Input {...field} className="text-lg" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold">Описание</FormLabel>
                  <FormControl>
                    <Textarea {...field} className="min-h-[100px] text-base" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="difficulty"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold">Сложность</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите сложность" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Простое">Простая</SelectItem>
                      <SelectItem value="Среднее">Средняя</SelectItem>
                      <SelectItem value="Продвинутое">Продвинутая</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="space-y-6 bg-card p-6 rounded-lg border shadow-sm hover:shadow-md transition-shadow"
          >
            <FormField
              control={form.control}
              name="targetBodyParts"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold">Целевые части тела</FormLabel>
                  <MultiSelect
                    options={bodyParts.map((part) => ({ label: part, value: part }))}
                    selected={field.value || []}
                    onChange={field.onChange}
                    placeholder="Выберите части тела"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="space-y-6 bg-card p-6 rounded-lg border shadow-sm hover:shadow-md transition-shadow"
          >
            <FormField
              control={form.control}
              name="restBetweenExercises"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold">Отдых между упражнениями (сек.)</FormLabel>
                  <div className="flex items-center gap-2">
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        className="w-24 text-center"
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </motion.div>
          <ChooseExercises
            selectedExercises={selectedExercises}
            setSelectedExercises={setSelectedExercises}
            formValues={form.getValues()}
          />
          {warning && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Alert variant="destructive">
                <AlertDescription>{warning}</AlertDescription>
              </Alert>
            </motion.div>
          )}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            className="flex w-full justify-stretch gap-2 mx-2"
          >
            <Button
              type="button"
              variant="outline"
              scaling="sm"
              className="text-base w-full"
              onClick={handleStartTraining}
            >
              <Play className="w-5 h-5 mr-2" />
              Начать
            </Button>
            <Button
              onClick={form.handleSubmit(handleSaveTraining)}
              type="submit"
              variant="default"
              scaling="sm"
              className="text-base w-[96%]"
            >
              <Save className="w-5 h-5 mr-2" />
              Сохранить
            </Button>
          </motion.div>
        </form>
      </motion.div>
    </Form>
  );
};
