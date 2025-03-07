export interface IUser {
  name: string;
  sex: 'Мужской' | 'Женский';
  age: number;
  height: number;
  weight: number;
  bodyType: 'Худое' | 'Атлетичное' | 'Среднее' | 'Полное';
  goal: 'Набор мышечной массы' | 'Похудение' | 'Поддержка текущей фигуры';

  level: number;
  experience: number;
  points: number;
  appearance: {
    bodyType: 'skinny' | 'athletic' | 'skinny-fat' | 'fat';
    hairStyle: 0 | 1;
    clothes: 0 | 1;
    hat: 0 | 1;
  };
  boughtCustomization: number[];
}

export type ICharacter = Pick<IUser, 'sex'> &
  Pick<IUser['appearance'], 'bodyType' | 'hairStyle' | 'clothes' | 'hat'> & {
    modelPath: string;
  };
