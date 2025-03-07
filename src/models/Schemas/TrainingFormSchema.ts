import * as z from 'zod';

export const trainingFormSchema = z.object({
  title: z
    .string()
    .min(3, 'Название должно содержать минимум 3 символа')
    .max(50, 'Название не должно превышать 50 символов'),
  description: z
    .string()
    .min(10, 'Описание должно содержать минимум 10 символов')
    .max(200, 'Описание не должно превышать 200 символов'),
  targetBodyParts: z.array(z.string()).min(1, 'Выберите хотя бы одну часть тела'),
  restBetweenExercises: z.number().min(1, 'Минимальное время отдыха 1 секунда'),
  difficulty: z.enum(['Простое', 'Среднее', 'Продвинутое'] as const).default('Среднее'),
});

export type ITrainingFormData = z.infer<typeof trainingFormSchema>;
