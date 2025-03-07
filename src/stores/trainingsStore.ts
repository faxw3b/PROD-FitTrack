import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { MockTrainings } from '@/mocks/MockTrainings';
import { ITraining } from '@/models/Stores/Trainings/ITraining';
import { ITrainingStore } from '@/models/Stores/Trainings/ITrainingStore';
import { useTrainingsStatsStore } from './trainingsStatsStore';

export const useTrainingsStore = create<ITrainingStore>()(
  persist(
    (set) => ({
      trainings: MockTrainings,

      resetTrainings: () => set({ trainings: MockTrainings }),

      addTraining: (training: ITraining) => {
        set((state) => ({
          trainings: [...state.trainings, training],
        }));
        useTrainingsStatsStore.getState().addEmptyStats(training.id);
      },

      deleteTraining: (id: number) => {
        set((state) => ({
          trainings: state.trainings.filter((t) => t.id !== id),
        }));
        useTrainingsStatsStore.getState().deleteStats(id);
      },

      updateTraining: (id: number, training: Partial<ITraining>) => {
        set((state) => ({
          trainings: state.trainings.map((t) => (t.id === id ? { ...t, ...training } : t)),
        }));
      },

      deleteTemporaryTrainings: () => {
        set((state) => ({
          trainings: state.trainings.filter((t) => !t.isTemporary),
        }));
      },

      deleteTrainingsByExerciseId: (exerciseId: number) => {
        set((state) => {
          const trainingsToDelete = state.trainings.filter((t) => t.exercises.some((e) => e.exerciseId === exerciseId));
          trainingsToDelete.forEach((training) => {
            useTrainingsStatsStore.getState().deleteStats(training.id);
          });

          return {
            trainings: state.trainings.filter((t) => t.exercises.every((e) => e.exerciseId !== exerciseId)),
          };
        });
      },
    }),
    {
      name: 'trainings-storage',
    }
  )
);
