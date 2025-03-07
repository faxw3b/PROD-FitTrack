import { IUser } from '@/models/Stores/User/IUser';

export const MockUser: IUser = {
  name: '',
  sex: 'Мужской',
  goal: 'Набор мышечной массы',
  age: 0,
  height: 0,
  weight: 0,
  bodyType: 'Худое',
  level: 1,
  experience: 0,
  points: 0,
  appearance: {
    bodyType: 'skinny',
    hairStyle: 0,
    clothes: 0,
    hat: 0,
  },
  boughtCustomization: [0, 2, 4, 6, 8, 10],
};
