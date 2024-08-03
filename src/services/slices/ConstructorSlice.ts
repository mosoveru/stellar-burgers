import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient, TConstructorIngredient } from '../../utils/types';

type TConstructorOrder = {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
};

type TConstructorSlice = {
  constructorOrder: TConstructorOrder;
};

const initialState: TConstructorSlice = {
  constructorOrder: {
    bun: null,
    ingredients: []
  }
};

const correctIndexes = (array: TConstructorIngredient[]) => {
  array.map((ingridient, index) => {
    ingridient.id = String(index);
  });
};

export const constructorOrderSlice = createSlice({
  name: 'order-constructor',
  initialState,
  reducers: {
    addIngredient: (state, action: PayloadAction<TIngredient>) => {
      if (action.payload.type === 'bun') {
        state.constructorOrder.bun = action.payload;
      } else {
        state.constructorOrder.ingredients.push({
          ...action.payload,
          id: String(state.constructorOrder.ingredients.length)
        });
      }
    },
    moveIngredient: (
      state,
      action: PayloadAction<{ number: number; direction: 'up' | 'down' }>
    ) => {
      let indexToMove;
      if (action.payload.direction === 'up') {
        indexToMove = action.payload.number - 1;
      } else {
        indexToMove = action.payload.number + 1;
      }

      const ingredientsArray = state.constructorOrder.ingredients;
      const ingridientToMove = ingredientsArray[action.payload.number];
      ingredientsArray.splice(action.payload.number, 1);
      ingredientsArray.splice(indexToMove, 0, ingridientToMove);

      correctIndexes(ingredientsArray);

      state.constructorOrder.ingredients = ingredientsArray;
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      const ingredientsArray = state.constructorOrder.ingredients.filter(
        (ingridient) => {
          if (ingridient.id !== action.payload) {
            return ingridient;
          }
        }
      );

      correctIndexes(ingredientsArray);

      state.constructorOrder.ingredients = ingredientsArray;
    },
    clearConstructor: (state) => {
      state.constructorOrder.bun = null;
      state.constructorOrder.ingredients = [];
    }
  },
  selectors: {
    constructorOrderSelector: (state) => state.constructorOrder,
    ingredientsIDSelector: (state) => {
      const ingredientsIDs = [];
      if (state.constructorOrder.bun) {
        ingredientsIDs.push(state.constructorOrder.bun._id);
        state.constructorOrder.ingredients.forEach((ingredient) => {
          ingredientsIDs.push(ingredient._id);
        });
        ingredientsIDs.push(state.constructorOrder.bun._id);
      }
      return ingredientsIDs;
    }
  }
});

export default constructorOrderSlice.reducer;
export const {
  addIngredient,
  moveIngredient,
  removeIngredient,
  clearConstructor
} = constructorOrderSlice.actions;
export const { constructorOrderSelector, ingredientsIDSelector } =
  constructorOrderSlice.selectors;
