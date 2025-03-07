import { useState } from 'react';
import * as motion from 'motion/react-m';
import { Activity, Dumbbell, Timer, Weight } from 'lucide-react';
import { Timer as CustomTimer } from '@/components/shared/Timer';
import Spinner from '@/components/ui/Spinner';
import { getExerciseTypeLabel } from '@/helpers/ExercisesHelper';
import { IExercise } from '@/models/Stores/Exercises/IExercise';
import { ITraining } from '@/models/Stores/Trainings/ITraining';
import { ITrainingState } from '../RunningTraining';
import { ExerciseControls } from './ExerciseControls';

interface IRunningExerciseProps {
  currentExercise: IExercise;
  training: ITraining;
  state: ITrainingState;
  handleExerciseComplete: () => void;
  handleExerciseSkip: () => void;
}

export const RunningExercise = ({
  currentExercise,
  training,
  state,
  handleExerciseComplete,
  handleExerciseSkip,
}: IRunningExerciseProps) => {
  const [isGifLoaded, setIsGifLoaded] = useState(false);
  const [isTimerStarted, setIsTimerStarted] = useState(false);
  const [isTimerCompleted, setIsTimerCompleted] = useState(false);
  const targetValue = training.exercises[state.currentExerciseIndex].targetValue;

  const ExerciseTypeIcon =
    currentExercise.exerciseType === 'Время' ? Timer : currentExercise.exerciseType === 'Вес' ? Weight : Activity;

  const handleStartTimer = () => {
    setIsTimerStarted(true);
  };

  const handleTimerComplete = () => {
    setIsTimerCompleted(true);
  };

  const handleTimerExerciseComplete = () => {
    setIsTimerStarted(false);
    setIsTimerCompleted(false);
    handleExerciseComplete();
  };

  return (
    <motion.div
      className="space-y-6 sm:space-y-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div className="relative">
        <motion.div
          className="relative rounded-xl overflow-hidden aspect-video bg-gradient-to-br from-primary/5 to-primary/10"
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          {!isGifLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Spinner />
            </div>
          )}
          <motion.img
            src={currentExercise.gifUrl}
            alt={currentExercise.title}
            className="w-full h-full object-contain"
            onLoad={() => setIsGifLoaded(true)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
            <div className="flex items-end gap-2 mb-1">
              <ExerciseTypeIcon className="w-5 h-5" />
              <span className="text-xs font-medium">{currentExercise.exerciseType}</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="mt-6 sm:mt-8 space-y-4 sm:space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            <motion.div
              className="bg-primary/5 rounded-xl p-3 text-center flex items-center"
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <ExerciseTypeIcon className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1 ml-3 text-left">
                <div className="text-xs text-muted-foreground">Цель</div>
                <div className="font-medium text-sm">
                  {training.exercises[state.currentExerciseIndex].targetValue}
                  {getExerciseTypeLabel(currentExercise.exerciseType)}
                </div>
              </div>
            </motion.div>

            <motion.div
              className="bg-primary/5 rounded-xl p-3 text-center flex items-center"
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Dumbbell className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1 ml-3 text-left">
                <div className="text-xs text-muted-foreground">Оборудование</div>
                <div className="font-medium text-sm">{currentExercise.equipment.join(', ')}</div>
              </div>
            </motion.div>

            <motion.div
              className="bg-primary/5 rounded-xl p-3 text-center flex items-center"
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Activity className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1 ml-3 text-left">
                <div className="text-xs text-muted-foreground">Диапазон (рекомендуемый)</div>
                <div className="font-medium text-sm">
                  {currentExercise.minValue} - {currentExercise.maxValue}
                  {getExerciseTypeLabel(currentExercise.exerciseType)}
                </div>
              </div>
            </motion.div>
          </div>

          <div className="bg-primary/5 rounded-xl p-3 sm:p-4">
            <div className="text-sm text-muted-foreground mb-2">Инструкции:</div>
            <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm">
              {currentExercise.instructions.map((instruction, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  {instruction}
                </motion.li>
              ))}
            </ul>
          </div>

          {currentExercise.exerciseType === 'Время' && isTimerCompleted ? (
            <motion.div
              className="bg-primary/5 rounded-xl p-3 sm:p-6 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="text-2xl font-bold mb-2">Время истекло!</div>
              <p className="text-muted-foreground">Нажмите кнопку "Завершить" чтобы перейти к следующему упражнению</p>
            </motion.div>
          ) : null}

          {currentExercise.exerciseType === 'Время' && (
            <CustomTimer
              duration={targetValue}
              onComplete={handleTimerComplete}
              showControls={false}
              isStarted={isTimerStarted}
            />
          )}

          <ExerciseControls
            exerciseType={currentExercise.exerciseType}
            isTimerStarted={isTimerStarted}
            isTimerCompleted={isTimerCompleted}
            onStartTimer={handleStartTimer}
            onTimerExerciseComplete={handleTimerExerciseComplete}
            onExerciseComplete={handleExerciseComplete}
            onExerciseSkip={handleExerciseSkip}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};
