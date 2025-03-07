import { MockTrainings } from '@/mocks/MockTrainings';
import { ITrainingStats } from '@/models/Stores/TrainingsStats/ITrainingStats';

export const MockTrainingsStats: ITrainingStats[] = MockTrainings.map((training) => ({
  trainingId: training.id,
  totalSessions: 0,
  totalDuration: 0,
  totalExercisesCompleted: 0,
  totalExercisesSkipped: 0,
  averageEfficiency: 0,
  sessions: [],
}));
