import { IExercise } from './IExercise';

export interface IExercisesStore {
  exercises: IExercise[];
  addExercise: (exercise: IExercise) => void;
  editExercise: (id: number, editedExercise: IExercise) => void;
  deleteExercise: (id: number) => void;
  resetExercises: () => void;
}
