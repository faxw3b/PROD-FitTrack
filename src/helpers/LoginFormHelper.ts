import { ILoginFormData } from '@/models/Schemas/LoginFormSchema';

export const getFieldsForStep = (step: number): (keyof ILoginFormData)[] => {
  switch (step) {
    case 1:
      return ['name'];
    case 2:
      return ['sex'];
    case 3:
      return ['age'];
    case 4:
      return ['height'];
    case 5:
      return ['weight'];
    case 6:
      return ['bodyType'];
    case 7:
      return ['goal'];
    default:
      return [];
  }
};

export const defaultLoginFormValues = {
  name: '',
  sex: undefined,
  age: undefined,
  height: undefined,
  weight: undefined,
  bodyType: undefined,
  goal: undefined,
};
