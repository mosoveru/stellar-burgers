import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { userSlice } from '../slices/UserSlice';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { orderSlice } from '../slices/OrdersSlice';
import { modalDataSlice } from '../slices/ModalDataSlice';
import { ingredientSlice } from '../slices/IngredientsSlice';
import { constructorOrderSlice } from '../slices/ConstructorSlice';
import { TIngredient } from '../../utils/types';

const rootReducer = combineSlices(
  userSlice,
  orderSlice,
  modalDataSlice,
  ingredientSlice,
  constructorOrderSlice
);

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export const searchIngredientModalData = (id: string) => (state: RootState) =>
  state.Ingredient.ingridients.find((ingredient) => {
    if (ingredient._id === id) {
      return ingredient;
    }
  }) as TIngredient;
export default store;
