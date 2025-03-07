import { ITrainingFormData } from '@/models/Schemas/TrainingFormSchema';
import { IExercise, IExerciseBodyPart } from '@/models/Stores/Exercises/IExercise';
import { ITraining, SelectedExercise } from '@/models/Stores/Trainings/ITraining';
import { IUser } from '@/models/Stores/User/IUser';

export const defaultTrainingFormValues: ITrainingFormData = {
  title: '',
  description: '',
  targetBodyParts: [],
  restBetweenExercises: 300,
  difficulty: 'Среднее',
};

export const calculateTrainingDuration = (exercises: SelectedExercise[], restBetweenExercises: number) => {
  const exercisesTime = exercises.reduce((acc, ex) => {
    const timePerExercise =
      ex.exerciseType === 'Время' ? ex.targetValue : ex.exerciseType === 'Вес' ? 60 : ex.targetValue * 4;
    return acc + timePerExercise;
  }, 0);

  const restTime = (exercises.length - 1) * restBetweenExercises;

  return exercisesTime + restTime;
};

export const createTrainingData = (selectedExercises: SelectedExercise[], values: ITrainingFormData): ITraining => {
  return {
    ...values,
    id: Date.now(),
    exercises: selectedExercises.map(({ exerciseId, targetValue, order }) => ({
      exerciseId,
      targetValue,
      order,
    })),
    targetBodyParts: values.targetBodyParts as IExerciseBodyPart[],
    duration: calculateTrainingDuration(selectedExercises, values.restBetweenExercises),
    restBetweenExercises: values.restBetweenExercises,
    isTemporary: false,
  } as ITraining;
};

export const calculateExerciseTargetValue = (user: IUser, exercise: IExercise) => {
  const levelMultiplier = 1 + Math.max(10, user.level) * 0.05;
  const bodyTypeMultiplier = {
    Худое: 1.0,
    Атлетичное: 1.1,
    Среднее: 1.0,
    Полное: 0.9,
  }[user.bodyType];

  const goalMultiplier = {
    'Набор мышечной массы': {
      Время: 0.9,
      Вес: 1.1,
      Повторения: 0.9,
    },
    Похудение: {
      Время: 1.1,
      Вес: 0.9,
      Повторения: 1.1,
    },
    'Поддержка текущей фигуры': {
      Время: 1.0,
      Вес: 1.0,
      Повторения: 1.0,
    },
  }[user.goal][exercise.exerciseType];

  const sexMultiplier = user.sex === 'Мужской' ? 1.1 : 1.0;

  const ageMultiplier =
    user.age >= 25 && user.age <= 35 ? 1.1 : user.age < 25 ? 1.0 : Math.max(0.7, 1.1 - (user.age - 35) * 0.02);

  const totalMultiplier = levelMultiplier * bodyTypeMultiplier * goalMultiplier * sexMultiplier * ageMultiplier;

  if (exercise.exerciseType === 'Время') {
    const baseValue = Math.floor((exercise.maxValue + exercise.minValue) / 2);
    return Math.min(exercise.maxValue, Math.floor(baseValue * totalMultiplier));
  }

  if (exercise.exerciseType === 'Вес') {
    const baseValue = Math.floor((exercise.maxValue + exercise.minValue) / 2);
    const weightMultiplier = user.weight / 70;
    return Math.min(exercise.maxValue, Math.floor(baseValue * totalMultiplier * weightMultiplier));
  }

  const baseValue = Math.floor((exercise.maxValue + exercise.minValue) / 2);
  return Math.min(exercise.maxValue, Math.floor(baseValue * totalMultiplier));
};

interface IGenerateExercisesForTrainingProps {
  exercises: IExercise[];
  bodyParts: IExerciseBodyPart[];
  difficulty: string;
  count: number;
}

export const generateExercisesForTraining = ({
  exercises,
  bodyParts,
  difficulty,
  count,
}: IGenerateExercisesForTrainingProps): IExercise[] => {
  const filteredExercises = exercises.filter((ex) => bodyParts.some((part) => ex.bodyParts.includes(part)));

  const getDifficultyRange = (exercise: IExercise) => {
    const avgValue = (exercise.maxValue + exercise.minValue) / 2;
    const maxPossibleValue = exercise.exerciseType === 'Вес' ? 200 : exercise.exerciseType === 'Время' ? 180 : 50;
    return avgValue / maxPossibleValue;
  };

  const difficultyGroups = [...filteredExercises].reduce(
    (groups, exercise) => {
      const complexity = getDifficultyRange(exercise);
      const difficultyLevel = complexity < 0.3 ? 'easy' : complexity > 0.7 ? 'hard' : 'medium';

      if (!groups[difficultyLevel]) {
        groups[difficultyLevel] = [];
      }
      groups[difficultyLevel].push(exercise);
      return groups;
    },
    {} as Record<string, IExercise[]>
  );

  let targetExercises = [];
  if (difficulty === 'Простое') {
    targetExercises = [
      ...(difficultyGroups.easy || []),
      ...(difficultyGroups.medium || []).slice(0, Math.floor(count / 3)),
    ];
  } else if (difficulty === 'Продвинутое') {
    targetExercises = [
      ...(difficultyGroups.hard || []),
      ...(difficultyGroups.medium || []).slice(0, Math.floor(count / 3)),
    ];
  } else {
    targetExercises = [
      ...((difficultyGroups.medium || []).length > 0 ? difficultyGroups.medium : []),
      ...((difficultyGroups.easy || []).length > 0 ? difficultyGroups.easy : []),
      ...((difficultyGroups.hard || []).length > 0 ? difficultyGroups.hard : []),
    ];
  }

  const shuffledExercises = targetExercises.sort(() => Math.random() - 0.5);

  const result: IExercise[] = [];
  const usedTypes = new Set<string>();

  for (const exercise of shuffledExercises) {
    if (result.length >= count) break;

    const typeCount = Array.from(usedTypes).filter((type) => type === exercise.exerciseType).length;
    const maxTypeCount = Math.ceil(count / 3);

    if (typeCount < maxTypeCount) {
      result.push(exercise);
      usedTypes.add(exercise.exerciseType);
    }
  }

  while (result.length < count && shuffledExercises.length > result.length) {
    const remainingExercises = shuffledExercises.filter((ex) => !result.includes(ex));
    const randomIndex = Math.floor(Math.random() * remainingExercises.length);
    const nextExercise = remainingExercises[randomIndex];

    if (nextExercise) {
      result.push(nextExercise);
    }
  }

  return result.sort(() => Math.random() - 0.5);
};
