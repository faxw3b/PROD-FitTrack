import { ITrainingSession, ITrainingStats } from './ITrainingStats';

export interface ITrainingsStatsStore {
  stats: ITrainingStats[];
  addEmptyStats: (trainingId: number) => void;
  deleteStats: (trainingId: number) => void;
  addSession: (trainingId: number, session: ITrainingSession) => void;
  resetTrainingsStats: () => void;
}
