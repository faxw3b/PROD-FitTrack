import { useState } from 'react';
import * as motion from 'motion/react-m';
import { Check, ChevronRight, Timer } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ExerciseControlsProps {
  exerciseType: string;
  isTimerStarted: boolean;
  isTimerCompleted: boolean;
  onStartTimer: () => void;
  onTimerExerciseComplete: () => void;
  onExerciseComplete: () => void;
  onExerciseSkip: () => void;
}

export const ExerciseControls = ({
  exerciseType,
  isTimerStarted,
  isTimerCompleted,
  onStartTimer,
  onTimerExerciseComplete,
  onExerciseComplete,
  onExerciseSkip,
}: ExerciseControlsProps) => {
  const [isWeightConfirmed, setIsWeightConfirmed] = useState(false);

  const handleConfirmWeight = () => {
    setIsWeightConfirmed(true);
    onExerciseComplete();
  };

  const renderActionButton = () => {
    switch (exerciseType) {
      case 'Время':
        if (!isTimerStarted) {
          return (
            <Button onClick={onStartTimer} className="w-full group relative overflow-hidden" scaling="sm">
              <motion.div
                className="absolute inset-0 bg-primary/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-200"
                whileHover={{ translateX: 0 }}
              />
              <motion.span
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.05 }}
                className="relative flex items-center gap-2 justify-center"
              >
                Начать
                <Timer className="w-4 h-4" />
              </motion.span>
            </Button>
          );
        }
        if (isTimerCompleted) {
          return (
            <Button onClick={onTimerExerciseComplete} className="w-full group relative overflow-hidden" scaling="sm">
              <motion.div
                className="absolute inset-0 bg-primary/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-200"
                whileHover={{ translateX: 0 }}
              />
              <motion.span
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.05 }}
                className="relative flex items-center gap-2 justify-center"
              >
                Завершить
                <Check className="w-4 h-4" />
              </motion.span>
            </Button>
          );
        }
        return null;

      case 'Вес':
        if (!isWeightConfirmed) {
          return (
            <Button onClick={handleConfirmWeight} className="w-full group relative overflow-hidden" scaling="sm">
              <motion.div
                className="absolute inset-0 bg-primary/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-200"
                whileHover={{ translateX: 0 }}
              />
              <motion.span
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.05 }}
                className="relative flex items-center gap-2 justify-center"
              >
                Завершить
                <Check className="w-4 h-4" />
              </motion.span>
            </Button>
          );
        }
        return null;

      case 'Повторения':
        return (
          <Button onClick={onExerciseComplete} className="w-full group relative overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-primary/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-200"
              whileHover={{ translateX: 0 }}
            />
            <motion.span
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
              className="relative flex items-center gap-2 justify-center"
            >
              Завершить
              <Check className="w-4 h-4" />
            </motion.span>
          </Button>
        );
    }
  };

  const renderSkipButton = () => (
    <Button variant="outline" onClick={onExerciseSkip} scaling="sm" className="w-full group relative overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-primary/10 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-200"
        whileHover={{ translateX: 0 }}
      />
      <motion.span initial={{ x: 0 }} whileHover={{ x: 5 }} className="relative flex items-center gap-2 justify-center">
        Пропустить
        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </motion.span>
    </Button>
  );

  return (
    <div className="flex flex-col sm:flex-row justify-stretch gap-3 sm:gap-4 mt-6 sm:mt-8 w-full">
      {exerciseType === 'Время' ? (
        isTimerCompleted ? (
          <div className="w-full">{renderActionButton()}</div>
        ) : isTimerStarted ? (
          renderSkipButton()
        ) : (
          <>
            {renderSkipButton()}
            <div className="w-full">{renderActionButton()}</div>
          </>
        )
      ) : (
        <>
          {renderSkipButton()}
          <div className="w-full">{renderActionButton()}</div>
        </>
      )}
    </div>
  );
};
