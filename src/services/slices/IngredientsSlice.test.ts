import { configureStore } from '@reduxjs/toolkit';
import { bunIngredient, sause, ingredient } from './TestingData';
import reducer, { getIngredients, initialState } from './IngredientsSlice';
import { error } from 'console';

beforeAll(() => {
  global.fetch = jest.fn(() => {
    return Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve({
          success: true,
          data: [bunIngredient, sause, ingredient]
        })
    });
  }) as jest.Mock;
});

afterAll(() => {
  jest.resetAllMocks();
});

describe('Тест IngredientsSlice', () => {
  const expectedResult = {
    ingredients: [bunIngredient, sause, ingredient],
    bun: [bunIngredient],
    sauce: [sause],
    main: [ingredient],
    isGettingIngredients: false
  };

  test('Тест вызова экшена getIngredients', () => {
    const store = configureStore({
      reducer: {
        ingredient: reducer
      }
    });

    store.dispatch(getIngredients());

    expect(store.getState().ingredient).toEqual({
      ...initialState,
      isGettingIngredients: true
    });
  });

  test('Тест заполнения слайса с помощью экшена getIngredients', async () => {
    const store = configureStore({
      reducer: {
        ingredient: reducer
      }
    });

    await store.dispatch(getIngredients());

    expect(store.getState().ingredient).toEqual(expectedResult);
  });

  test('Тест rejected экшена getIngredients', async () => {
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
        ingredient: reducer
      }
    });

    await store.dispatch(getIngredients());

    expect(store.getState().ingredient).toEqual({
      ...initialState,
      isGettingIngredients: false
    });
  });
});
