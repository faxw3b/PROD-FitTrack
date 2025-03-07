import { mockCharacters } from '@/mocks/MockCharacters';
import { ICharacter, IUser } from '@/models/Stores/User/IUser';

export const getModelPath = ({ sex, bodyType, hairStyle, clothes, hat }: Omit<ICharacter, 'modelPath'>): string => {
  const model = mockCharacters.find(
    (m) =>
      m.sex === sex && m.bodyType === bodyType && m.hairStyle === hairStyle && m.clothes === clothes && m.hat === hat
  );

  return model?.modelPath || 'https://models.readyplayer.me/67b6f97cd79ba506880d78f1.glb';
};

export const getBaseCharacterBodyType = (bodyType: string) => {
  return bodyType === 'Худое'
    ? 'skinny'
    : bodyType === 'Атлетичное'
      ? 'athletic'
      : bodyType === 'Среднее'
        ? 'skinny-fat'
        : 'fat';
};

export const getCharacterBodyType = (user: IUser) => {
  const baseType: Pick<ICharacter, 'bodyType'> = {
    bodyType: getBaseCharacterBodyType(user.bodyType),
  };

  for (let i = 0; i < Math.floor(user.level / 5); i++) {
    switch (user.goal) {
      case 'Набор мышечной массы':
        switch (baseType.bodyType) {
          case 'skinny':
            baseType.bodyType = 'athletic';
            break;
          case 'skinny-fat':
            baseType.bodyType = 'athletic';
            break;
          case 'fat':
            baseType.bodyType = 'skinny-fat';
            break;
        }
        break;

      case 'Похудение':
        switch (baseType.bodyType) {
          case 'fat':
            baseType.bodyType = 'skinny-fat';
            break;
          case 'skinny-fat':
            baseType.bodyType = 'athletic';
            break;
          case 'athletic':
            baseType.bodyType = 'skinny';
            break;
        }
        break;
    }
  }

  return baseType.bodyType;
};
