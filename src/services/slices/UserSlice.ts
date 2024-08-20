import {
  getOrdersApi,
  getUserApi,
  loginUserApi,
  orderBurgerApi,
  TLoginData,
  registerUserApi,
  TRegisterData,
  updateUserApi,
  logoutApi
} from '@api';
import {
  CaseReducer,
  createAsyncThunk,
  createSlice,
  PayloadAction,
  SerializedError
} from '@reduxjs/toolkit';
import { TUser, TOrder } from '@utils-types';
import { deleteCookie, setCookie } from '../../utils/cookie';

type TUserSlice = {
  user: Partial<TUser>;
  orders: TOrder[];
  currentOrder: TOrder | null;
  isOrderRequestPending: boolean;
  isGettingOrders: boolean;
  isGettingUser: boolean;
};

const processUserPendingThunk: CaseReducer<
  TUserSlice,
  PayloadAction<undefined, string, never, never>
> = (state) => {
  state.isGettingUser = true;
};

const processOrderPendingThunk: CaseReducer<
  TUserSlice,
  PayloadAction<undefined, string, never, never>
> = (state) => {
  state.isGettingOrders = true;
};

const processUserRejectedThunk: CaseReducer<
  TUserSlice,
  PayloadAction<unknown, string, never, SerializedError>
> = (state, action) => {
  state.isGettingUser = false;
  console.log(action.error);
};

const processOrderRejectedThunk: CaseReducer<
  TUserSlice,
  PayloadAction<unknown, string, never, SerializedError>
> = (state, action) => {
  state.isGettingOrders = false;
  console.log(action.error);
};

export const initialState: TUserSlice = {
  currentOrder: null,
  user: {},
  orders: [],
  isOrderRequestPending: false,
  isGettingOrders: false,
  isGettingUser: false
};

export const getUserThunk = createAsyncThunk('user/info', async () =>
  getUserApi()
);

export const getUserOrders = createAsyncThunk('user/orders', async () =>
  getOrdersApi()
);

export const orderBurger = createAsyncThunk(
  'user/orderBurger',
  async (data: string[]) => orderBurgerApi(data)
);

export const loginIntoAccount = createAsyncThunk(
  'login',
  async (data: TLoginData) => loginUserApi(data)
);

export const register = createAsyncThunk(
  'register',
  async (data: TRegisterData) => registerUserApi(data)
);

export const refreshLoginData = createAsyncThunk(
  'login/refresh',
  async (data: Partial<TRegisterData>) => updateUserApi(data)
);

export const logoutUser = createAsyncThunk('logout', async () => logoutApi());

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setOrderRequest: (state, action: PayloadAction<boolean>) => {
      state.isOrderRequestPending = action.payload;
    },
    clearCurrentOrder: (state) => {
      state.currentOrder = null;
    }
  },
  selectors: {
    getUserName: (state) => state.user.name,
    getUserEmail: (state) => state.user.email,
    getUserData: (state) => state.user,
    isGettingUserSelector: (state) => state.isGettingUser,
    isGettingOrdersSelector: (state) => state.isGettingOrders,
    userOrdersSelector: (state) => state.orders,
    isOrderRequestPendingSelector: (state) => state.isOrderRequestPending,
    currentOrderSelector: (state) => state.currentOrder
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserThunk.fulfilled, (state, action) => {
        state.isGettingUser = false;
        state.user.email = action.payload.user.email;
        state.user.name = action.payload.user.name;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isGettingUser = false;
        setCookie('accessToken', action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
        state.user.email = action.payload.user.email;
        state.user.name = action.payload.user.name;
      })
      .addCase(refreshLoginData.fulfilled, (state, action) => {
        state.user.email = action.payload.user.email;
        state.user.name = action.payload.user.name;
        state.isGettingUser = false;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.orders = [];
        state.user.email = undefined;
        state.user.name = undefined;
        deleteCookie('accessToken');
        localStorage.removeItem('refreshToken');
        state.isGettingUser = false;
      })
      .addCase(loginIntoAccount.fulfilled, (state, action) => {
        state.user.name = action.payload.user.name;
        state.user.email = action.payload.user.email;
        state.isGettingUser = false;
        setCookie('accessToken', action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
      })
      .addCase(orderBurger.pending, (state) => {
        state.isOrderRequestPending = true;
      })
      .addCase(orderBurger.fulfilled, (state, action) => {
        state.currentOrder = action.payload.order;
        state.isOrderRequestPending = false;
      })
      .addCase(orderBurger.rejected, (state, action) => {
        state.isOrderRequestPending = false;
        console.log(action.error);
      })
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.isGettingOrders = false;
      })
      .addCase(getUserThunk.pending, processUserPendingThunk)
      .addCase(register.pending, processUserPendingThunk)
      .addCase(refreshLoginData.pending, processUserPendingThunk)
      .addCase(logoutUser.pending, processUserPendingThunk)
      .addCase(loginIntoAccount.pending, processUserPendingThunk)
      .addCase(getUserOrders.pending, processOrderPendingThunk)
      .addCase(getUserThunk.rejected, processUserRejectedThunk)
      .addCase(register.rejected, processUserRejectedThunk)
      .addCase(refreshLoginData.rejected, processUserRejectedThunk)
      .addCase(logoutUser.rejected, processUserRejectedThunk)
      .addCase(loginIntoAccount.rejected, processUserRejectedThunk)
      .addCase(getUserOrders.rejected, processOrderRejectedThunk);
  }
});

export const { setOrderRequest, clearCurrentOrder } = userSlice.actions;
export const {
  getUserData,
  getUserEmail,
  getUserName,
  userOrdersSelector,
  isOrderRequestPendingSelector,
  isGettingOrdersSelector,
  isGettingUserSelector,
  currentOrderSelector
} = userSlice.selectors;
export default userSlice.reducer;
