import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '../../utils/types';
import { getIngredientsApi } from '../../utils/burger-api';

type TIngredientsSlice = {
  ingridients: TIngredient[];
  bun: TIngredient[];
  sauce: TIngredient[];
  main: TIngredient[];
  isGettingIngredients: boolean;
};

type TIngredientType = 'bun' | 'main' | 'sauce';

const initialState: TIngredientsSlice = {
  ingridients: [],
  bun: [],
  sauce: [],
  main: [],
  isGettingIngredients: false
};

export const getIngridients = createAsyncThunk('ingridients', async () =>
  getIngredientsApi()
);

export const ingredientSlice = createSlice({
  name: 'Ingredient',
  initialState,
  reducers: {},
  selectors: {
    ingredientsSelector: (state) => state.ingridients,
    bunsSelector: (state) => state.bun,
    saucesSelector: (state) => state.sauce,
    mainsSelector: (state) => state.main,
    isGettingIngredientsSelector: (state) => state.isGettingIngredients
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngridients.pending, (state) => {
        state.isGettingIngredients = true;
      })
      .addCase(getIngridients.fulfilled, (state, action) => {
        state.ingridients = action.payload;
        action.payload.forEach((ingridient) => {
          state[ingridient.type as TIngredientType].push(ingridient);
        });
        state.isGettingIngredients = false;
      })
      .addCase(getIngridients.rejected, (state, action) => {
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
