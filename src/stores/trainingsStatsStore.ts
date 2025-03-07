import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { MockTrainingsStats } from '@/mocks/MockTrainingsStats';
import { ITrainingSession, ITrainingStats } from '@/models/Stores/TrainingsStats/ITrainingStats';
import { ITrainingsStatsStore } from '@/models/Stores/TrainingsStats/ITrainingStatsStore';

export const useTrainingsStatsStore = create<ITrainingsStatsStore>()(
  persist(
    (set) => ({
      stats: MockTrainingsStats,

      resetTrainingsStats: () => set({ stats: MockTrainingsStats }),

      addEmptyStats: (trainingId: number) => {
        set((state) => ({
          stats: [
            ...state.stats,
            {
              trainingId,
              totalSessions: 0,
              totalDuration: 0,
              totalExercisesCompleted: 0,
              totalExercisesSkipped: 0,
              averageEfficiency: 0,
              sessions: [],
            },
          ],
        }));
      },

      deleteStats: (trainingId: number) => {
        set((state) => ({
          stats: state.stats.filter((s) => s.trainingId !== trainingId),
        }));
      },

      addSession: (trainingId: number, session: ITrainingSession) =>
        set((state) => {
          const trainingStats: ITrainingStats = state.stats.find((s) => s.trainingId === trainingId) || {
            trainingId,
            totalSessions: 0,
            totalDuration: 0,
            totalExercisesCompleted: 0,
            totalExercisesSkipped: 0,
            averageEfficiency: 0,
            sessions: [],
          };

          const newSessions = [...trainingStats.sessions, session];
          const totalSessions = newSessions.length;
          const totalDuration = newSessions.reduce((acc, s) => acc + s.endTime - s.startTime, 0);
          const totalExercisesCompleted = newSessions.reduce((acc, s) => acc + s.completedExerciseIds.length, 0);
          const totalExercisesSkipped = newSessions.reduce((acc, s) => acc + s.skippedExerciseIds.length, 0);
          const averageEfficiency = newSessions.reduce((acc, s) => acc + s.efficiency, 0) / totalSessions;

          const updatedTrainingStats = {
            ...trainingStats,
            totalSessions,
            totalDuration,
            totalExercisesCompleted,
            totalExercisesSkipped,
            averageEfficiency,
            sessions: newSessions,
          };

          return {
            stats: [...state.stats.filter((s) => s.trainingId !== trainingId), updatedTrainingStats],
          };
        }),
    }),
    {
      name: 'trainings-stats-storage',
    }
  )
);
