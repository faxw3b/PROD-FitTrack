import { ITraining } from '@/models/Stores/Trainings/ITraining';
import { MockExercises } from './MockExercises';

export const MockTrainings: ITraining[] = [
  {
    id: 1,
    title: 'Силовая тренировка тела',
    description:
      'Комплексная тренировка для развития силы основных групп мышц. Подходит для среднего уровня подготовки.',
    exercises: [
      {
        exerciseId: MockExercises[11].id,
        targetValue: 40,
        order: 0,
      },
      {
        exerciseId: MockExercises[14].id,
        targetValue: 45,
        order: 1,
      },
      {
        exerciseId: MockExercises[0].id,
        targetValue: 15,
        order: 2,
      },
      {
        exerciseId: MockExercises[4].id,
        targetValue: 12,
        order: 3,
      },
      {
        exerciseId: MockExercises[2].id,
        targetValue: 60,
        order: 4,
      },
    ],
    targetBodyParts: ['Грудь', 'Спина', 'Ноги', 'Руки', 'Пресс'],
    duration: 1500,
    restBetweenExercises: 300,
    difficulty: 'Среднее',
    isTemporary: false,
  },
  {
    id: 2,
    title: 'Кардио + Пресс',
    description:
      'Интенсивная тренировка для сжигания жира и укрепления мышц кора. Минимум оборудования, максимум эффекта.',
    exercises: [
      {
        exerciseId: MockExercises[8].id,
        targetValue: 30,
        order: 0,
      },
      {
        exerciseId: MockExercises[6].id,
        targetValue: 20,
        order: 1,
      },
      {
        exerciseId: MockExercises[13].id,
        targetValue: 25,
        order: 2,
      },
      {
        exerciseId: MockExercises[7].id,
        targetValue: 20,
        order: 3,
      },
      {
        exerciseId: MockExercises[10].id,
        targetValue: 45,
        order: 4,
      },
    ],
    targetBodyParts: ['Пресс', 'Ноги'],
    duration: 1680,
    restBetweenExercises: 300,
    difficulty: 'Простое',
    isTemporary: false,
  },
  {
    id: 3,
    title: 'Продвинутый верх',
    description: 'Сложная тренировка для развития силы и массы верхней части тела. Требуется опыт тренировок.',
    exercises: [
      {
        exerciseId: MockExercises[11].id,
        targetValue: 80,
        order: 0,
      },
      {
        exerciseId: MockExercises[3].id,
        targetValue: 15,
        order: 1,
      },
      {
        exerciseId: MockExercises[5].id,
        targetValue: 25,
        order: 2,
      },
      {
        exerciseId: MockExercises[1].id,
        targetValue: 30,
        order: 3,
      },
    ],
    targetBodyParts: ['Грудь', 'Плечи', 'Руки'],
    duration: 1200,
    restBetweenExercises: 300,
    difficulty: 'Продвинутое',
    isTemporary: false,
  },
  {
    id: 4,
    title: 'Функциональный фитнес',
    description:
      'Тренировка для улучшения общей физической формы и выносливости. Комбинация силовых и кардио упражнений.',
    exercises: [
      {
        exerciseId: MockExercises[6].id,
        targetValue: 15,
        order: 0,
      },
      {
        exerciseId: MockExercises[8].id,
        targetValue: 40,
        order: 1,
      },
      {
        exerciseId: MockExercises[2].id,
        targetValue: 45,
        order: 2,
      },
      {
        exerciseId: MockExercises[1].id,
        targetValue: 15,
        order: 3,
      },
      {
        exerciseId: MockExercises[0].id,
        targetValue: 20,
        order: 4,
      },
    ],
    targetBodyParts: ['Ноги', 'Пресс', 'Грудь', 'Руки'],
    duration: 1620,
    restBetweenExercises: 300,
    difficulty: 'Среднее',
    isTemporary: false,
  },
  {
    id: 5,
    title: 'Интенсивная силовая',
    description:
      'Комплексная силовая тренировка высокой интенсивности для опытных атлетов. Включает сложные компаунд-движения.',
    exercises: [
      {
        exerciseId: MockExercises[11].id,
        targetValue: 100,
        order: 0,
      },
      {
        exerciseId: MockExercises[14].id,
        targetValue: 120,
        order: 1,
      },
      {
        exerciseId: MockExercises[5].id,
        targetValue: 35,
        order: 2,
      },
      {
        exerciseId: MockExercises[4].id,
        targetValue: 25,
        order: 3,
      },
      {
        exerciseId: MockExercises[1].id,
        targetValue: 50,
        order: 4,
      },
      {
        exerciseId: MockExercises[2].id,
        targetValue: 120,
        order: 5,
      },
      {
        exerciseId: MockExercises[13].id,
        targetValue: 50,
        order: 6,
      },
    ],
    targetBodyParts: ['Грудь', 'Спина', 'Руки', 'Плечи', 'Пресс'],
    duration: 2580,
    restBetweenExercises: 300,
    difficulty: 'Продвинутое',
    isTemporary: false,
  },
  {
    id: 6,
    title: 'Разминка + Растяжка',
    description:
      'Идеальная тренировка для начала дня или разогрева перед основной тренировкой. Улучшает гибкость и подвижность.',
    exercises: [
      {
        exerciseId: MockExercises[0].id,
        targetValue: 10,
        order: 0,
      },
      {
        exerciseId: MockExercises[2].id,
        targetValue: 30,
        order: 1,
      },
      {
        exerciseId: MockExercises[12].id,
        targetValue: 120,
        order: 2,
      },
      {
        exerciseId: MockExercises[8].id,
        targetValue: 15,
        order: 3,
      },
    ],
    targetBodyParts: ['Ноги', 'Спина', 'Пресс'],
    duration: 1200,
    restBetweenExercises: 300,
    difficulty: 'Простое',
    isTemporary: false,
  },
  {
    id: 7,
    title: 'Круговая тренировка на руки',
    description:
      'Интенсивная круговая тренировка из трех кругов, направленная на развитие силы и выносливости верхней части тела.',
    exercises: [
      {
        exerciseId: MockExercises[15].id,
        targetValue: 10,
        order: 0,
      },
      {
        exerciseId: MockExercises[4].id,
        targetValue: 20,
        order: 1,
      },
      {
        exerciseId: MockExercises[1].id,
        targetValue: 50,
        order: 2,
      },
      {
        exerciseId: MockExercises[19].id,
        targetValue: 20,
        order: 3,
      },
      {
        exerciseId: MockExercises[15].id,
        targetValue: 10,
        order: 4,
      },
      {
        exerciseId: MockExercises[4].id,
        targetValue: 20,
        order: 5,
      },
      {
        exerciseId: MockExercises[1].id,
        targetValue: 50,
        order: 6,
      },
      {
        exerciseId: MockExercises[19].id,
        targetValue: 20,
        order: 7,
      },
      {
        exerciseId: MockExercises[15].id,
        targetValue: 10,
        order: 8,
      },
      {
        exerciseId: MockExercises[4].id,
        targetValue: 20,
        order: 9,
      },
      {
        exerciseId: MockExercises[1].id,
        targetValue: 50,
        order: 10,
      },
      {
        exerciseId: MockExercises[19].id,
        targetValue: 20,
        order: 11,
      },
    ],
    targetBodyParts: ['Грудь', 'Спина', 'Руки'],
    duration: 1800,
    restBetweenExercises: 60,
    difficulty: 'Продвинутое',
    isTemporary: false,
  },
  {
    id: 8,
    title: 'Круговая тренировка на плечи и предплечья',
    description:
      'Интенсивная круговая тренировка из трех кругов, направленная на развитие силы и выносливости плеч и предплечий.',
    exercises: [
      {
        exerciseId: MockExercises[16].id,
        targetValue: 10,
        order: 0,
      },
      {
        exerciseId: MockExercises[17].id,
        targetValue: 10,
        order: 1,
      },
      {
        exerciseId: MockExercises[18].id,
        targetValue: 20,
        order: 2,
      },
      {
        exerciseId: MockExercises[19].id,
        targetValue: 20,
        order: 3,
      },
      {
        exerciseId: MockExercises[16].id,
        targetValue: 10,
        order: 4,
      },
      {
        exerciseId: MockExercises[17].id,
        targetValue: 10,
        order: 5,
      },
      {
        exerciseId: MockExercises[18].id,
        targetValue: 20,
        order: 6,
      },
      {
        exerciseId: MockExercises[19].id,
        targetValue: 20,
        order: 7,
      },
      {
        exerciseId: MockExercises[16].id,
        targetValue: 10,
        order: 8,
      },
      {
        exerciseId: MockExercises[17].id,
        targetValue: 10,
        order: 9,
      },
      {
        exerciseId: MockExercises[18].id,
        targetValue: 20,
        order: 10,
      },
      {
        exerciseId: MockExercises[19].id,
        targetValue: 20,
        order: 11,
      },
    ],
    targetBodyParts: ['Плечи', 'Руки'],
    duration: 1800,
    restBetweenExercises: 60,
    difficulty: 'Среднее',
    isTemporary: false,
  },
];
