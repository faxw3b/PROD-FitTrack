export interface ICustomizationOption {
  id: number;
  url: string;
  price: number;
}

export interface ICustomizationOptions {
  hairStyle: {
    Мужской: ICustomizationOption[];
    Женский: ICustomizationOption[];
  };
  clothes: {
    Мужской: ICustomizationOption[];
    Женский: ICustomizationOption[];
  };
  hat: {
    Мужской: ICustomizationOption[];
    Женский: ICustomizationOption[];
  };
}

export const customizationOptions: ICustomizationOptions = {
  hairStyle: {
    Мужской: [
      { id: 0, url: '/assets/character-customization/none.svg', price: 0 },
      { id: 1, url: '/assets/character-customization/hairm1.png', price: 300 },
    ],
    Женский: [
      { id: 2, url: '/assets/character-customization/hairw0.png', price: 0 },
      { id: 3, url: '/assets/character-customization/hairw1.png', price: 300 },
    ],
  },
  clothes: {
    Мужской: [
      { id: 4, url: '/assets/character-customization/clothesm0.png', price: 0 },
      { id: 5, url: '/assets/character-customization/clothesm1.png', price: 600 },
    ],
    Женский: [
      { id: 6, url: '/assets/character-customization/clothesw0.png', price: 0 },
      { id: 7, url: '/assets/character-customization/clothesw1.png', price: 600 },
    ],
  },
  hat: {
    Мужской: [
      { id: 8, url: '/assets/character-customization/none.svg', price: 0 },
      { id: 9, url: '/assets/character-customization/hatm1.png', price: 1000 },
    ],
    Женский: [
      { id: 10, url: '/assets/character-customization/none.svg', price: 0 },
      { id: 11, url: '/assets/character-customization/hatw1.png', price: 1000 },
    ],
  },
};
