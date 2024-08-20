import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '../../utils/types';
import { getIngredientsApi } from '../../utils/burger-api';

type TIngredientsSlice = {
  ingredients: TIngredient[];
  bun: TIngredient[];
  sauce: TIngredient[];
  main: TIngredient[];
  isGettingIngredients: boolean;
};

type TIngredientType = 'bun' | 'main' | 'sauce';

export const initialState: TIngredientsSlice = {
  ingredients: [],
  bun: [],
  sauce: [],
  main: [],
  isGettingIngredients: false
};

export const getIngredients = createAsyncThunk('ingridients', async () =>
  getIngredientsApi()
);

export const ingredientSlice = createSlice({
  name: 'ingredient',
  initialState,
  reducers: {},
  selectors: {
    ingredientsSelector: (state) => state.ingredients,
    bunsSelector: (state) => state.bun,
    saucesSelector: (state) => state.sauce,
    mainsSelector: (state) => state.main,
    isGettingIngredientsSelector: (state) => state.isGettingIngredients
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.isGettingIngredients = true;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.ingredients = action.payload;
        action.payload.forEach((ingredient) => {
          state[ingredient.type as TIngredientType].push(ingredient);
        });
        state.isGettingIngredients = false;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.isGettingIngredients = false;
        console.log(action.error);
      });
  }
});

export default ingredientSlice.reducer;
export const {
  ingredientsSelector,
  bunsSelector,
  saucesSelector,
  mainsSelector,
  isGettingIngredientsSelector
} = ingredientSlice.selectors;
