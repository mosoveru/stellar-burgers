import { configureStore } from '@reduxjs/toolkit';
import reducer, { getOrders, initialState } from './OrdersSlice';
import { feed } from './TestingData';

beforeAll(() => {
  global.fetch = jest.fn(() => {
    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve(feed)
    });
  }) as jest.Mock;
});

afterAll(() => {
  jest.resetAllMocks();
});

describe('Тест OrdersSlice', () => {
  test('Тест вызова экшена getOrders', () => {
    const store = configureStore({
      reducer: {
        orders: reducer
      }
    });

    store.dispatch(getOrders());

    expect(store.getState().orders).toEqual({
      ...initialState,
      isGettingOrders: true
    });
  });

  test('Тест заполнения слайса с помощью getOrders', async () => {
    const store = configureStore({
      reducer: {
        orders: reducer
      }
    });

    await store.dispatch(getOrders());

    expect(store.getState().orders).toEqual({
      feedOrders: [feed.orders[0]],
      total: 1,
      totalToday: 1,
      isGettingOrders: false
    });
  });

  test('Тест rejected экшена getOrders', async () => {
    global.fetch = jest.fn(() => {
      return Promise.resolve({
        ok: false,
        json: () => Promise.resolve({})
      });
    }) as jest.Mock;

    const store = configureStore({
      reducer: {
        orders: reducer
      }
    });

    await store.dispatch(getOrders());

    expect(store.getState().orders).toEqual(initialState);
  });
});
