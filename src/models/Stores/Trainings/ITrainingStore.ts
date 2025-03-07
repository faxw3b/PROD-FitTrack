import { ITraining } from './ITraining';

export interface ITrainingStore {
  trainings: ITraining[];
  addTraining: (training: ITraining) => void;
  updateTraining: (id: number, training: Partial<ITraining>) => void;
  deleteTraining: (id: number) => void;
  deleteTemporaryTrainings: () => void;
  deleteTrainingsByExerciseId: (exerciseId: number) => void;
  resetTrainings: () => void;
}
