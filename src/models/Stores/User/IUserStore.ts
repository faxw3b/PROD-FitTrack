import { ICustomizationOptions } from '@/components/pages/Character/Customization/customizationOptions';
import { ILoginFormData } from '@/models/Schemas/LoginFormSchema';
import { IUser } from '../User/IUser';

export interface IUserStore {
  user: IUser;
  resetUser: () => void;
  updateUser: (data: Partial<IUser>) => void;
  loginUser: (data: ILoginFormData) => void;
  addTrainingBonus: (points: number, experience: number) => void;
  buyCustomization: (type: keyof ICustomizationOptions, id: number) => void;
  setUserAppearance: (type: keyof ICustomizationOptions, id: number) => void;
}
