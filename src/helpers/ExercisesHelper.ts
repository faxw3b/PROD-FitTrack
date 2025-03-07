import { IExerciseFormData } from '@/models/Schemas/ExerciseFormSchema';
import {
  IExerciseBodyPart,
  IExerciseDifficulty,
  IExerciseEquipment,
  IExerciseExerciseType,
  IExerciseFilters,
} from '@/models/Stores/Exercises/IExercise';

export const difficulties: IExerciseDifficulty[] = ['Простое', 'Среднее', 'Продвинутое'];
export const bodyParts: IExerciseBodyPart[] = ['Ноги', 'Руки', 'Пресс', 'Спина', 'Грудь', 'Плечи'];
export const equipment: IExerciseEquipment[] = ['Без инвентаря', 'Гантели', 'Штанга', 'Коврик', 'Скамья'];
export const exerciseTypes: IExerciseExerciseType[] = ['Повторения', 'Время', 'Вес'];

export const defaultExerciseFormValues: IExerciseFormData = {
  title: '',
  description: '',
  difficulty: 'Простое',
  exerciseType: 'Повторения',
  bodyParts: [],
  equipment: [],
  instructions: [],
  minValue: 1,
  maxValue: 100,
};

export const getFilterLabel = (filterType: keyof IExerciseFilters) => {
  switch (filterType) {
    case 'difficulty':
      return 'Сложность';
    case 'bodyParts':
      return 'Части тела';
    case 'equipment':
      return 'Оборудование';
    default:
      return 'Тип упражнения';
  }
};

export const getFilterOptions = (filterType: keyof IExerciseFilters) => {
  switch (filterType) {
    case 'difficulty':
      return difficulties;
    case 'bodyParts':
      return bodyParts;
    case 'equipment':
      return equipment;
    default:
      return exerciseTypes;
  }
};

export const getDifficultyColor = (difficulty: IExerciseDifficulty): string => {
  switch (difficulty) {
    case 'Простое':
      return 'bg-green-500/10 text-green-500 hover:bg-green-500/20';
    case 'Среднее':
      return 'bg-orange-500/10 text-orange-500 hover:bg-orange-500/20';
    case 'Продвинутое':
      return 'bg-red-500/10 text-red-500 hover:bg-red-500/20';
    default:
      return 'bg-blue-500/10 text-blue-500 hover:bg-blue-500/20';
  }
};

export const getExerciseTypeLabel = (exerciseType: IExerciseExerciseType) => {
  return exerciseType === 'Время' ? 'с' : exerciseType === 'Вес' ? 'кг.' : ' повт.';
};
