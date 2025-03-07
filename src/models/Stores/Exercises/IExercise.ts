export type IExerciseDifficulty = 'Простое' | 'Среднее' | 'Продвинутое';
export type IExerciseBodyPart = 'Ноги' | 'Руки' | 'Пресс' | 'Спина' | 'Грудь' | 'Плечи';
export type IExerciseExerciseType = 'Повторения' | 'Время' | 'Вес';
export type IExerciseEquipment = 'Без инвентаря' | 'Гантели' | 'Штанга' | 'Коврик' | 'Скамья';

export interface IExercise {
  id: number;
  title: string;
  description: string;
  photoUrl: string;
  gifUrl: string;
  difficulty: IExerciseDifficulty;
  equipment: IExerciseEquipment[];
  bodyParts: IExerciseBodyPart[];
  exerciseType: IExerciseExerciseType;
  instructions: string[];
  minValue: number;
  maxValue: number;
}

export interface IExerciseFilters {
  difficulty: IExerciseDifficulty[];
  bodyParts: IExerciseBodyPart[];
  equipment: IExerciseEquipment[];
  exerciseType: IExerciseExerciseType[];
}
