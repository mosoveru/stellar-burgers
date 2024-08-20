export const bunIngredient = {
  _id: '643d69a5c3f7b9001cfa093c',
  name: 'Краторная булка N-200i',
  type: 'bun',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
};
export const ingredient = {
  _id: '643d69a5c3f7b9001cfa0941',
  name: 'Биокотлета из марсианской Магнолии',
  type: 'main',
  proteins: 420,
  fat: 142,
  carbohydrates: 242,
  calories: 4242,
  price: 424,
  image: 'https://code.s3.yandex.net/react/code/meat-01.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
};
export const sause = {
  _id: '643d69a5c3f7b9001cfa0942',
  name: 'Соус Spicy-X',
  type: 'sauce',
  proteins: 30,
  fat: 20,
  carbohydrates: 40,
  calories: 30,
  price: 90,
  image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png'
};
export const order = {
  success: true,
  orders: [
    {
      _id: 'BigBossOrderID',
      status: 'Выполнен',
      name: 'Заказ для большого босса',
      createdAt: '2024-08-17T08:08:11.839Z',
      updatedAt: '2024-08-17T08:08:12.297Z',
      number: 777,
      ingredients: [
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa0942',
        '643d69a5c3f7b9001cfa093c'
      ]
    }
  ]
};

export const feed = {
  success: true,
  total: 1,
  totalToday: 1,
  orders: [
    {
      _id: 'BigBossOrderID',
      status: 'Выполнен',
      name: 'Заказ для большого босса',
      createdAt: '2024-08-17T08:08:11.839Z',
      updatedAt: '2024-08-17T08:08:12.297Z',
      number: 777,
      ingredients: [
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa0942',
        '643d69a5c3f7b9001cfa093c'
      ]
    }
  ]
};

export const user = {
  success: true,
  user: {
    name: 'TheBigBoss',
    email: 'thebigboss@bigboss.ru'
  }
};

export const registeredUser = {
  success: true,
  refreshToken: 'abcdefg',
  accessToken: 'abcdefg',
  user: {
    name: 'TheBigBoss',
    email: 'thebigboss@bigboss.ru'
  }
};

export const newOrder = {
  success: true,
  order: {
    _id: 'BigBossOrderID',
    status: 'Выполнен',
    name: 'Заказ для большого босса',
    createdAt: '2024-08-17T08:08:11.839Z',
    updatedAt: '2024-08-17T08:08:12.297Z',
    number: 777,
    ingredients: [
      '643d69a5c3f7b9001cfa093c',
      '643d69a5c3f7b9001cfa0941',
      '643d69a5c3f7b9001cfa0942',
      '643d69a5c3f7b9001cfa093c'
    ]
  },
  name: 'New Order'
};
