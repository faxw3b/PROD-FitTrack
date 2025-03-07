export interface ITrainingSession {
  id: number;
  startTime: number;
  endTime: number;
  completedExerciseIds: number[];
  skippedExerciseIds: number[];
  efficiency: number;
}

export interface ITrainingStats {
  trainingId: number;
  totalSessions: number;
  totalDuration: number;
  totalExercisesCompleted: number;
  totalExercisesSkipped: number;
  averageEfficiency: number;
  sessions: ITrainingSession[];
}
