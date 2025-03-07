import { z } from 'zod';
import { MAX_FILE_SIZE } from '@/constants/constants';

const baseFormSchema = z.object({
  title: z.string().min(2, 'Минимум 2 символа').max(50, 'Максимум 50 символов'),
  description: z.string().min(10, 'Минимум 10 символов'),
  difficulty: z.enum(['Простое', 'Среднее', 'Продвинутое'] as const),
  exerciseType: z.enum(['Повторения', 'Время', 'Вес'] as const),
  bodyParts: z.array(z.string()).min(1, 'Выберите хотя бы одну часть тела'),
  equipment: z.array(z.string()).min(1, 'Выберите хотя бы один тип оборудования'),
  instructions: z.array(z.string()).min(1, 'Добавьте хотя бы одну инструкцию'),
  minValue: z.number().min(1, 'Минимальное значение должно быть больше 0'),
  maxValue: z.number().min(1, 'Максимальное значение должно быть больше 0'),
});

export const exerciseFormSchema = baseFormSchema
  .extend({
    photo: z.union([
      z
        .instanceof(FileList)
        .refine((files) => files.length > 0, 'Фото обязательно')
        .refine((files) => files[0].size <= MAX_FILE_SIZE, 'Размер фото не должен превышать 30MB')
        .refine(
          (files) =>
            ['image/jpeg', 'image/png', 'image/bmp', 'image/tiff', 'image/webp', 'image/heic'].includes(files[0].type),
          'Файл должен быть в формате JPEG, PNG, BMP, TIFF, WEBP или HEIC'
        ),
      z.undefined().refine(() => false, 'Фотография обязательна'),
    ]),
    gif: z.union([
      z
        .instanceof(FileList)
        .refine((files) => files.length > 0, 'GIF обязательно')
        .refine((files) => files[0].size <= MAX_FILE_SIZE, 'Размер GIF не должен превышать 30MB')
        .refine((files) => files[0].type === 'image/gif', 'Файл должен быть в формате GIF'),
      z.undefined().refine(() => false, 'Гифка обязательна'),
    ]),
  })
  .refine((data) => data.maxValue >= data.minValue, {
    message: 'Максимальное значение должно быть больше или равно минимальному',
    path: ['maxValue'],
  });

export const editExerciseFormSchema = baseFormSchema
  .extend({
    photo: z.union([
      z
        .instanceof(FileList)
        .refine((files) => files.length > 0, 'Фото обязательно')
        .refine((files) => files[0].size <= MAX_FILE_SIZE, 'Размер фото не должен превышать 30MB')
        .refine(
          (files) =>
            ['image/jpeg', 'image/png', 'image/bmp', 'image/tiff', 'image/webp', 'image/heic'].includes(files[0].type),
          'Файл должен быть в формате JPEG, PNG, BMP, TIFF, WEBP или HEIC'
        ),
      z.undefined(),
    ]),
    gif: z.union([
      z
        .instanceof(FileList)
        .refine((files) => files.length > 0, 'GIF обязательно')
        .refine((files) => files[0].size <= MAX_FILE_SIZE, 'Размер GIF не должен превышать 30MB')
        .refine((files) => files[0].type === 'image/gif', 'Файл должен быть в формате GIF'),
      z.undefined(),
    ]),
  })
  .refine((data) => data.maxValue >= data.minValue, {
    message: 'Максимальное значение должно быть больше или равно минимальному',
    path: ['maxValue'],
  });

export type IExerciseFormData = z.infer<typeof exerciseFormSchema>;
export type IEditExerciseFormData = z.infer<typeof editExerciseFormSchema>;
