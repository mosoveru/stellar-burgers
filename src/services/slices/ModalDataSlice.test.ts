import { configureStore } from '@reduxjs/toolkit';
import reducer, {
  getOrderByNumber,
  removeModalData,
  setIngredientModalData,
  setOrderModalData
} from './ModalDataSlice';
import { order, ingredient } from './TestingData';

afterAll(() => {
  jest.resetAllMocks();
});

describe('Тест ModalDataSlice', () => {
  const initialState = {
    orderModalData: null,
    ingredientModalData: undefined,
    isGettingOrder: false
  };

  test('Тест вызова getOrderByNumber', () => {
    global.fetch = jest.fn(() => {
      return Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            success: true,
            orders: [order]
          })
      });
    }) as jest.Mock;

    const store = configureStore({
      reducer: {
        modal: reducer
      }
    });

    store.dispatch(getOrderByNumber(777));

    expect(store.getState().modal).toEqual({
      ...initialState,
      isGettingOrder: true
    });
  });

  test('Тест getOrderByNumber', async () => {
    global.fetch = jest.fn(() => {
      return Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            success: true,
            orders: [order]
          })
      });
    }) as jest.Mock;

    const store = configureStore({
      reducer: {
        modal: reducer
      }
    });

    await store.dispatch(getOrderByNumber(777));

    expect(store.getState().modal).toEqual({
      ...initialState,
      orderModalData: order
    });
  });

  test('Тест rejected экшена getOrderByNumber', async () => {
    global.fetch = jest.fn(() => {
      return Promise.resolve({
        ok: false,
        json: () =>
          Promise.resolve({
            error: 'Error'
          })
      });
    }) as jest.Mock;

    const store = configureStore({
      reducer: {
        modal: reducer
      }
    });

    await store.dispatch(getOrderByNumber(777));

    expect(store.getState().modal).toEqual({
      ...initialState,
      isGettingOrder: false
    });
  });

  test('Тест removeModalData', () => {
    const newState = reducer(
      {
        isGettingOrder: false,
        orderModalData: order.orders[0],
        ingredientModalData: ingredient
      },
      removeModalData()
    );

    expect(newState).toEqual(initialState);
  });

  test('Тест setIngredientModalData', () => {
    const newState = reducer(initialState, setIngredientModalData(ingredient));

    expect(newState).toEqual({
      isGettingOrder: false,
      orderModalData: null,
      ingredientModalData: ingredient
    });
  });

  test('Тест setOrderModalData', () => {
    const newState = reducer(initialState, setOrderModalData(order.orders[0]));

    expect(newState).toEqual({
      isGettingOrder: false,
      orderModalData: order.orders[0],
      ingredientModalData: undefined
    });
  });
});
