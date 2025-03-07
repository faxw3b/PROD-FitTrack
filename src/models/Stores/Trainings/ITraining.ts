import { IExerciseBodyPart, IExerciseDifficulty } from '../Exercises/IExercise';

export interface ITrainingExercise {
  exerciseId: number;
  targetValue: number;
  order: number;
}

export interface ITraining {
  id: number;
  title: string;
  description: string;
  exercises: ITrainingExercise[];
  targetBodyParts: IExerciseBodyPart[];
  duration: number;
  restBetweenExercises: number;
  isTemporary: boolean;
  difficulty: IExerciseDifficulty;
}

export interface SelectedExercise {
  exerciseId: number;
  targetValue: number;
  order: number;
  title: string;
  exerciseType: string;
  minValue: number;
  maxValue: number;
}
