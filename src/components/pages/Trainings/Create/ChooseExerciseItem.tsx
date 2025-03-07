import { useState } from 'react';
import { Reorder, useDragControls } from 'motion/react';
import * as motion from 'motion/react-m';
import { AlertTriangle, GripVertical, Trash } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SelectedExercise } from '@/models/Stores/Trainings/ITraining';

interface IChooseExerciseItemProps {
  exercise: SelectedExercise;
  onValueChange: (value: number) => void;
  onRemove: () => void;
}

export const ChooseExerciseItem = ({ exercise, onValueChange, onRemove }: IChooseExerciseItemProps) => {
  const dragControls = useDragControls();
  const [showWarning, setShowWarning] = useState(false);
  const [pendingValue, setPendingValue] = useState<number | null>(null);

  const handleValueChange = (value: number) => {
    if (value > exercise.maxValue) {
      setPendingValue(value);
      setShowWarning(true);
    } else {
      onValueChange(value);
    }
  };

  const handleConfirmHighValue = () => {
    if (pendingValue !== null) {
      onValueChange(pendingValue);
      setPendingValue(null);
    }
    setShowWarning(false);
  };

  const handleCancelHighValue = () => {
    if (pendingValue !== null) {
      onValueChange(exercise.maxValue);
      setPendingValue(null);
    }
    setShowWarning(false);
  };

  return (
    <>
      <Reorder.Item key={exercise.exerciseId} value={exercise} dragListener={false} dragControls={dragControls}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-3 p-4 bg-background border rounded-lg group hover:shadow-md transition-all"
          whileHover={{ scale: 1.01, y: -2 }}
          whileTap={{ scale: 0.99 }}
        >
          <div className="flex items-center justify-between w-full sm:w-auto gap-2">
            <div
              className="cursor-grab active:cursor-grabbing touch-none hover:text-primary transition-colors"
              onPointerDown={(e) => {
                e.preventDefault();
                dragControls.start(e);
              }}
            >
              <GripVertical className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <div className="font-medium text-base sm:text-lg">{exercise.title}</div>
              <div className="text-xs sm:text-sm text-muted-foreground">{exercise.exerciseType}</div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              scaling="sm"
              className="sm:hidden text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
              onClick={onRemove}
            >
              <Trash className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto mt-2 sm:mt-0">
            <div className="flex items-center gap-2 flex-1 sm:flex-initial">
              <Input
                type="number"
                value={exercise.targetValue}
                onChange={(e) => handleValueChange(Number(e.target.value))}
                onKeyDown={(e: React.KeyboardEvent) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                  }
                }}
                className="w-20 sm:w-24 text-center font-medium"
                min={exercise.minValue}
                max={9999}
              />
            </div>
            <Button
              variant="ghost"
              size="sm"
              scaling="sm"
              className="hidden sm:flex text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
              onClick={onRemove}
            >
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        </motion.div>
      </Reorder.Item>
      <AlertDialog open={showWarning} onOpenChange={setShowWarning}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              Внимание!
            </AlertDialogTitle>
            <AlertDialogDescription className="space-y-2">
              <p>
                Вы установили значение <span className="font-medium">{pendingValue}</span>, которое превышает
                рекомендуемый максимум <span className="font-medium">({exercise.maxValue})</span> для упражнения{' '}
                <span className="font-medium">{exercise.title}</span>.
              </p>
              <p>Это может быть опасно для здоровья. Вы уверены, что хотите продолжить?</p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancelHighValue}>Установить рекомендуемое</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmHighValue} className="bg-destructive hover:bg-destructive/90">
              Оставить опасное значение
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
