import * as z from 'zod';

export const loginFormSchema = z.object({
  name: z.string().min(2, 'Имя должно содержать минимум 2 символа'),
  sex: z.enum(['Мужской', 'Женский'], { required_error: 'Пожалуйста, выберите ваш пол' }),
  age: z.number().int().min(8, 'Вам должно быть не менее 8 лет').max(120, 'Пожалуйста, введите корректный возраст'),
  height: z.number().min(60, 'Рост должен быть не менее 60 см').max(300, 'Рост должен быть менее 300 см'),
  weight: z.number().min(20, 'Вес должен быть не менее 20 кг').max(400, 'Вес должен быть менее 400 кг'),
  bodyType: z.enum(['Худое', 'Атлетичное', 'Среднее', 'Полное'], {
    required_error: 'Пожалуйста, выберите ваш тип телосложения',
  }),
  goal: z.enum(['Набор мышечной массы', 'Похудение', 'Поддержка текущей фигуры'], {
    required_error: 'Пожалуйста, выберите вашу цель',
  }),
});

export type ILoginFormData = z.infer<typeof loginFormSchema>;
