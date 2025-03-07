import { useState } from 'react';
import * as motion from 'motion/react-m';
import { Timer } from '@/components/shared/Timer';
import { Card, cardShadowClassname } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { getDifficultyColor } from '@/helpers/ExercisesHelper';
import { cn } from '@/lib/utils';
import { ITrainingSession } from '@/models/Stores/TrainingsStats/ITrainingStats';
import { useExercisesStore } from '@/stores/exercisesStore';
import { useTrainingsStatsStore } from '@/stores/trainingsStatsStore';
import { useTrainingsStore } from '@/stores/trainingsStore';
import { useUserStore } from '@/stores/userStore';
import { TrainingComplete } from './Complete/TrainingComplete';
import { RunningExercise } from './RunningExercise/RunningExercise';

export interface ITrainingState {
  currentExerciseIndex: number;
  isRestTime: boolean;
  restTimeRemaining: number;
  exerciseTimeRemaining?: number;
}

export const RunningTraining = ({ id }: { id: number }) => {
  const training = useTrainingsStore((state) => state.trainings.find((t) => t.id === id));
  const exercises = useExercisesStore((state) => state.exercises);
  const addTrainingBonus = useUserStore((state) => state.addTrainingBonus);
  const addTrainingSession = useTrainingsStatsStore((state) => state.addSession);

  const [state, setState] = useState<ITrainingState>({
    currentExerciseIndex: 0,
    isRestTime: false,
    restTimeRemaining: training?.restBetweenExercises || 0,
    exerciseTimeRemaining: undefined,
  });

  const [session, setSession] = useState<ITrainingSession>({
    id: Date.now(),
    startTime: Date.now(),
    endTime: Date.now(),
    completedExerciseIds: [],
    skippedExerciseIds: [],
    efficiency: 0,
  });

  if (!training) {
    return <div>Тренировка не найдена</div>;
  }

  const currentExercise = exercises.find((ex) => ex.id === training.exercises[state.currentExerciseIndex]?.exerciseId);

  const handleExerciseComplete = () => {
    const isLastExercise = state.currentExerciseIndex === training.exercises.length - 1;
    const updatedSession = {
      ...session,
      completedExerciseIds: [...session.completedExerciseIds, currentExercise!.id],
    };

    setSession(updatedSession);
    setState((prev) => ({
      ...prev,
      isRestTime: true,
      restTimeRemaining: training.restBetweenExercises,
    }));

    if (isLastExercise) finishTraining(updatedSession);
  };

  const handleExerciseSkip = () => {
    const isLastExercise = state.currentExerciseIndex === training.exercises.length - 1;
    const updatedSession = {
      ...session,
      skippedExerciseIds: [...session.skippedExerciseIds, currentExercise!.id],
    };

    setSession(updatedSession);
    setState((prev) => ({
      ...prev,
      isRestTime: true,
      restTimeRemaining: training.restBetweenExercises,
    }));

    if (isLastExercise) finishTraining(updatedSession);
  };

  const finishTraining = (finalSession: ITrainingSession) => {
    const endTime = Date.now();
    const completedCount = finalSession.completedExerciseIds.length;
    const efficiency = Math.floor((completedCount / training.exercises.length) * 100);

    const finalizedSession = {
      ...finalSession,
      endTime,
      efficiency,
    };

    setSession(finalizedSession);
    setState((prev) => ({
      ...prev,
      currentExerciseIndex: prev.currentExerciseIndex + 1,
      isRestTime: false,
    }));

    const experienceGained = Math.floor(efficiency / 2);
    const pointsGained = Math.floor(experienceGained * 1.5);
    if (!training.isTemporary) addTrainingSession(training.id, finalizedSession);
    addTrainingBonus(pointsGained, experienceGained);
  };

  const handleRestComplete = () => {
    setState((prev) => ({
      ...prev,
      currentExerciseIndex: prev.currentExerciseIndex + 1,
      isRestTime: false,
    }));
  };

  if (!currentExercise) {
    return <TrainingComplete session={session} totalExercises={training.exercises.length} trainingId={training.id} />;
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen p-0 sm:p-6">
      <Card className={`max-w-4xl mx-auto ${cardShadowClassname}`}>
        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
          <motion.div
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
          >
            <div className="w-full sm:w-auto">
              {state.isRestTime ? (
                <h1 className="text-2xl sm:text-3xl font-bold ">Отдых</h1>
              ) : (
                <>
                  <h1 className="text-2xl sm:text-3xl font-bold">{currentExercise.title}</h1>
                  <p className="text-sm sm:text-base text-muted-foreground mt-1">{currentExercise.description}</p>
                </>
              )}
            </div>

            <div className="flex flex-col items-start sm:items-end w-full sm:w-auto">
              <div className="text-base sm:text-lg font-medium">
                Упражнение {state.currentExerciseIndex + 1} из {training.exercises.length}
              </div>
              <Progress
                value={(state.currentExerciseIndex / training.exercises.length) * 100}
                className="w-full sm:w-32 h-2 mt-2"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="relative"
          >
            {state.isRestTime ? (
              <div className="mt-10">
                <Timer
                  duration={state.restTimeRemaining}
                  onComplete={handleRestComplete}
                  onDurationChange={(newDuration) => setState((prev) => ({ ...prev, restTimeRemaining: newDuration }))}
                  showControls={true}
                />
              </div>
            ) : (
              <RunningExercise
                currentExercise={currentExercise}
                training={training}
                state={state}
                handleExerciseComplete={handleExerciseComplete}
                handleExerciseSkip={handleExerciseSkip}
              />
            )}
          </motion.div>

          {!state.isRestTime && (
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-sm text-muted-foreground">
              <div>
                Сложность:
                <span className={cn('ml-2 px-2 py-1 rounded', getDifficultyColor(currentExercise.difficulty))}>
                  {currentExercise.difficulty}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-2 mt-2 sm:mt-0">
                {currentExercise.bodyParts.map((part) => (
                  <span key={part} className="px-2 py-1 bg-primary/10 rounded text-primary text-xs sm:text-sm">
                    {part}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
};
