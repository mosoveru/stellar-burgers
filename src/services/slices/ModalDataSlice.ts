import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient, TOrder } from '../../utils/types';
import { getOrderByNumberApi } from '../../utils/burger-api';
import { createAsyncThunk } from '@reduxjs/toolkit';

type TModalDataSlice = {
  orderModalData: TOrder | null;
  ingredientModalData: TIngredient | undefined;
  isGettingOrder: boolean;
};

const initialState: TModalDataSlice = {
  orderModalData: null,
  ingredientModalData: undefined,
  isGettingOrder: false
};

export const getOrderByNumber = createAsyncThunk(
  'user/orderInfo',
  async (number: number) => getOrderByNumberApi(number)
);

export const modalDataSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    removeModalData: (state) => {
      state.orderModalData = null;
      state.ingredientModalData = undefined;
    },
    setIngredientModalData: (state, action: PayloadAction<TIngredient>) => {
      state.ingredientModalData = action.payload;
    },
    setOrderModalData: (state, action: PayloadAction<TOrder>) => {
      state.orderModalData = action.payload;
    }
  },
  selectors: {
    orderModalDataSelector: (state) => state.orderModalData,
    ingredientModalDataSelector: (state) => state.ingredientModalData
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrderByNumber.pending, (state, action) => {
        state.isGettingOrder = true;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.isGettingOrder = false;
        state.orderModalData = action.payload.orders[0];
      })
      .addCase(getOrderByNumber.rejected, (state, action) => {
        state.isGettingOrder = false;
        console.log(action.error);
      });
  }
});

export default modalDataSlice.reducer;
export const { removeModalData, setIngredientModalData, setOrderModalData } =
  modalDataSlice.actions;
export const { orderModalDataSelector, ingredientModalDataSelector } =
  modalDataSlice.selectors;
