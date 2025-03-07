import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  ICustomizationOptions,
  customizationOptions,
} from '@/components/pages/Character/Customization/customizationOptions';
import { getBaseCharacterBodyType } from '@/helpers/CharacterHelper';
import { MockUser } from '@/mocks/MockUser';
import { ILoginFormData } from '@/models/Schemas/LoginFormSchema';
import { IUser } from '@/models/Stores/User/IUser';
import { IUserStore } from '@/models/Stores/User/IUserStore';

export const useUserStore = create<IUserStore>()(
  persist(
    (set) => ({
      user: MockUser,

      resetUser: () => set({ user: MockUser }),

      updateUser: (data: Partial<IUser>) => set((state) => ({ user: { ...state.user, ...data } })),

      loginUser: (data: ILoginFormData) =>
        set((state) => ({
          user: {
            ...state.user,
            ...data,
            appearance: {
              ...state.user.appearance,
              bodyType: getBaseCharacterBodyType(data.bodyType),
            },
          },
        })),

      addTrainingBonus: (points: number, experience: number) =>
        set((state) => ({
          user: {
            ...state.user,
            points: state.user.points + points,
            level: state.user.level + Math.floor((state.user.experience + experience) / 100),
            experience: (state.user.experience + experience) % 100,
          },
        })),

      buyCustomization: (type: keyof ICustomizationOptions, id: number) =>
        set((state) => ({
          user: {
            ...state.user,
            points: state.user.points - customizationOptions[type][state.user.sex][id % 2].price,
            boughtCustomization: [...state.user.boughtCustomization, id],
          },
        })),

      setUserAppearance: (type: keyof ICustomizationOptions, id: number) =>
        set((state) => ({
          user: { ...state.user, appearance: { ...state.user.appearance, [type]: id % 2 } },
        })),
    }),
    {
      name: 'user-storage',
    }
  )
);
