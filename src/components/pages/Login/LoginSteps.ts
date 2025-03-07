import { UseFormReturn } from 'react-hook-form';
import { AgeField } from '@/components/shared/AgeField';
import { BodyTypeField } from '@/components/shared/BodyTypeField';
import { GoalField } from '@/components/shared/GoalField';
import { HeightField } from '@/components/shared/HeightField';
import { NameField } from '@/components/shared/NameField';
import { SexField } from '@/components/shared/SexField';
import { WeightField } from '@/components/shared/WeightField';
import { ILoginFormData } from '@/models/Schemas/LoginFormSchema';

interface ILoginStep {
  title: string;
  description: string;
  Component: React.ComponentType<{ form: UseFormReturn<ILoginFormData> }>;
}

export const loginSteps: ILoginStep[] = [
  {
    title: 'Имя',
    description: 'Введите ваше имя',
    Component: NameField,
  },
  {
    title: 'Пол',
    description: 'Выберите ваш пол',
    Component: SexField,
  },
  {
    title: 'Возраст',
    description: 'Введите ваш возраст',
    Component: AgeField,
  },
  {
    title: 'Рост',
    description: 'Введите ваш рост в сантиметрах',
    Component: HeightField,
  },
  {
    title: 'Вес',
    description: 'Введите ваш вес в килограммах',
    Component: WeightField,
  },
  {
    title: 'Телосложение',
    description: 'Выберите тип вашего телосложения',
    Component: BodyTypeField,
  },
  {
    title: 'Цель',
    description: 'Какая у вас основная цель в занятиях спортом?',
    Component: GoalField,
  },
];
