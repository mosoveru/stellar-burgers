import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '../../utils/types';
import { getFeedsApi, getOrderByNumberApi } from '../../utils/burger-api';

type TOrdersSlice = {
  total: number;
  totalToday: number;
  feedOrders: TOrder[];
  isGettingOrders: boolean;
};

const initialState: TOrdersSlice = {
  feedOrders: [],
  total: 0,
  totalToday: 0,
  isGettingOrders: false
};

export const getOrders = createAsyncThunk('public/orders', async () =>
  getFeedsApi()
);

export const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  selectors: {
    ordersSelector: (state) => state.feedOrders,
    totalTodaySelector: (state) => state.totalToday,
    totalSelector: (state) => state.total,
    isGettingOrdersSelector: (state) => state.isGettingOrders
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.isGettingOrders = true;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.feedOrders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
        state.isGettingOrders = false;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.isGettingOrders = false;
        console.log(action.error);
      });
  }
});

export default orderSlice.reducer;
export const {
  ordersSelector,
  totalSelector,
  totalTodaySelector,
  isGettingOrdersSelector
} = orderSlice.selectors;
