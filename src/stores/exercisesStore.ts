import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { MockExercises } from '@/mocks/MockExercises';
import { IExercise } from '@/models/Stores/Exercises/IExercise';
import { IExercisesStore } from '@/models/Stores/Exercises/IExercisesStore';
import { useTrainingsStore } from './trainingsStore';

export const useExercisesStore = create<IExercisesStore>()(
  persist(
    (set) => ({
      exercises: MockExercises,

      resetExercises: () => set({ exercises: MockExercises }),

      addExercise: (exercise: IExercise) => set((state) => ({ exercises: [...state.exercises, exercise] })),

      editExercise: (id: number, editedExercise: IExercise) =>
        set((state) => ({
          exercises: state.exercises.map((ex) => (ex.id === id ? editedExercise : ex)),
        })),

      deleteExercise: (id: number) => {
        set((state) => ({ exercises: state.exercises.filter((ex) => ex.id !== id) }));
        useTrainingsStore.getState().deleteTrainingsByExerciseId(id);
      },
    }),
    {
      name: 'exercises-storage',
    }
  )
);
