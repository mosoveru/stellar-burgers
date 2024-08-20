import { RootState } from './store';
import store from './store';

describe('rootReducer тест', () => {
  const initialRootState: RootState = {
    user: {
      currentOrder: null,
      user: {},
      orders: [],
      isOrderRequestPending: false,
      isGettingOrders: false,
      isGettingUser: false
    },
    orders: {
      feedOrders: [],
      total: 0,
      totalToday: 0,
      isGettingOrders: false
    },
    modal: {
      orderModalData: null,
      ingredientModalData: undefined,
      isGettingOrder: false
    },
    ingredient: {
      ingredients: [],
      bun: [],
      sauce: [],
      main: [],
      isGettingIngredients: false
    },
    'order-constructor': {
      constructorOrder: {
        bun: null,
        ingredients: []
      }
    }
  };
  test('Проверка правильной инициализации', () => {
    expect(store.getState()).toEqual(initialRootState);
  });
  test('Проверка неизвестного экшена', () => {
    store.dispatch({ type: 'UNKNOWN_ACTION' });
    expect(store.getState()).toEqual(initialRootState);
  });
});
