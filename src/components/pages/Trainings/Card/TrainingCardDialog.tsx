import * as motion from 'motion/react-m';
import { Edit2, Play, Trash } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ITraining } from '@/models/Stores/Trainings/ITraining';
import { useExercisesStore } from '@/stores/exercisesStore';

interface ITrainingCardProps {
  training: ITraining;
  handleDeleteTraining: () => void;
  handleEdit: () => void;
  handleStartTraining: () => void;
}

export const TrainingCardDialog = ({
  training,
  handleDeleteTraining,
  handleEdit,
  handleStartTraining,
}: ITrainingCardProps) => {
  const exercises = useExercisesStore((state) => state.exercises);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      className="h-full flex flex-col"
    >
      <DialogHeader className="flex flex-col items-start justify-between gap-2">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 mt-6 sm:mt-0">
          <DialogTitle className="text-xl sm:text-2xl font-bold">{training.title}</DialogTitle>
          <Badge variant="outline">{Math.ceil(training.duration / 60)} мин</Badge>
        </div>
        <p className="text-muted-foreground text-sm sm:text-base text-left">{training.description}</p>
      </DialogHeader>

      <div className="py-4 flex-1 flex flex-col pb-12 sm:mb-0">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Упражнения</h3>
          <div className="grid gap-4">
            {training.exercises.map((ex, index) => {
              const exercise = exercises.find((e) => e.id === ex.exerciseId);
              return (
                <motion.div
                  key={exercise?.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div className="bg-card border rounded-lg p-3 sm:p-4 hover:shadow-md transition-shadow">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="space-y-1">
                        <div className="font-medium flex items-center gap-2 text-sm sm:text-base">
                          <span className="text-muted-foreground">#{index + 1}</span>
                          {exercise?.title}
                        </div>
                        <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">{exercise?.description}</p>
                      </div>
                      <Badge variant="secondary" className="self-start sm:self-center shrink-0">
                        {exercise?.exerciseType === 'Время'
                          ? `${ex.targetValue} сек.`
                          : exercise?.exerciseType === 'Вес'
                            ? `${ex.targetValue} кг.`
                            : `${ex.targetValue} повт.`}
                      </Badge>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
        <div className="flex-1 min-h-[20px]" />
        <motion.div
          className="flex flex-col sm:flex-row justify-stretch items-stretch gap-2 sm:gap-3 mt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <AlertDialog>
            <AlertDialogTrigger className="w-full" asChild>
              <Button
                size="sm"
                className="text-destructive bg-destructive/10 hover:bg-destructive/10 rounded-md w-full order-3 sm:order-none"
              >
                <Trash className="h-4 w-4 mr-2" />
                Удалить
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="rounded-md max-w-[96vw] sm:max-w-[32rem]">
              <AlertDialogHeader>
                <AlertDialogTitle>Вы уверены что хотите удалить тренировку?</AlertDialogTitle>
                <AlertDialogDescription>
                  Это действие нельзя отменить. Тренировка будет удалена, также будут удалена вся статистика по этой
                  тренировке
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Отменить</AlertDialogCancel>
                <AlertDialogAction onClick={handleDeleteTraining}>Удалить</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <Button
            size="sm"
            className="text-foreground bg-muted rounded-md hover:bg-muted w-full sm:order-none order-2"
            onClick={handleEdit}
          >
            <Edit2 className="h-4 w-4 mr-2" />
            Редактировать
          </Button>
          <Button onClick={handleStartTraining} className="gap-2 group w-full order-1 sm:order-none">
            <motion.div whileHover={{ scale: 1.2, rotate: 360 }} transition={{ duration: 0.3 }}>
              <Play className="h-4 w-4" />
            </motion.div>
            <span>Начать тренировку</span>
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};
