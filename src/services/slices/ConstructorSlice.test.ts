import reducer from './ConstructorSlice';
import {
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor,
  initialState
} from './ConstructorSlice';
import { bunIngredient, sause, ingredient } from './TestingData';

describe('Тест ConstructorSlice', () => {
  test('Обработка экшена добавления ингридиента', () => {
    const newState = reducer(initialState, addIngredient(bunIngredient));

    expect(newState).toEqual({
      constructorOrder: {
        bun: bunIngredient,
        ingredients: []
      }
    });

    const stateWithMain = reducer(newState, addIngredient(ingredient));

    expect(stateWithMain).toEqual({
      constructorOrder: {
        bun: bunIngredient,
        ingredients: [{ ...ingredient, id: '0' }]
      }
    });
  });

  test('Обработка экшена изменения порядка игредиентов', () => {
    const newState = reducer(
      {
        constructorOrder: {
          bun: null,
          ingredients: [
            { ...ingredient, id: '0' },
            { ...sause, id: '1' }
          ]
        }
      },
      moveIngredient({ number: 1, direction: 'up' })
    );

    expect(newState).toEqual({
      constructorOrder: {
        bun: null,
        ingredients: [
          { ...sause, id: '0' },
          { ...ingredient, id: '1' }
        ]
      }
    });
  });

  test('Обработка экшена удаления ингредиента', () => {
    const newState = reducer(
      {
        constructorOrder: {
          bun: null,
          ingredients: [
            { ...ingredient, id: '0' },
            { ...sause, id: '1' }
          ]
        }
      },
      removeIngredient('0')
    );

    expect(newState).toEqual({
      constructorOrder: {
        bun: null,
        ingredients: [{ ...sause, id: '0' }]
      }
    });
  });

  test('Проверка очистки конструктора', () => {
    const newState = reducer(
      {
        constructorOrder: {
          bun: bunIngredient,
          ingredients: [
            { ...ingredient, id: '0' },
            { ...sause, id: '1' }
          ]
        }
      },
      clearConstructor()
    );

    expect(newState).toEqual(initialState);
  });
});
