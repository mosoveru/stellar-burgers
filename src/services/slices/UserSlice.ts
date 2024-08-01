import {
  getOrderByNumberApi,
  getOrdersApi,
  getUserApi,
  loginUserApi,
  orderBurgerApi,
  TLoginData,
  registerUserApi,
  TRegisterData,
  updateUserApi,
  logoutApi,
  getFeedsApi,
  getIngredientsApi
} from '@api';
import {
  CaseReducer,
  createAsyncThunk,
  createSlice,
  PayloadAction,
  SerializedError
} from '@reduxjs/toolkit';
import {
  TUser,
  TOrder,
  TIngredient,
  TConstructorIngredient
} from '@utils-types';
import { setCookie } from '../../utils/cookie';

type TConstructorOrder = {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
};

type TUserSlice = {
  user: Partial<TUser>;
  orders: TOrder[];
  constructorOrder: TConstructorOrder;
  orderModalData: TOrder | null;
  ingredientModalData: TIngredient | undefined;
  isOrderRequestPending: boolean;
  isPending: boolean;
  feedOrders: TOrder[];
  currentOrder: TOrder | undefined;
  total: number;
  totalToday: number;
  ingridients: TIngredient[];
  bun: TIngredient[];
  sauce: TIngredient[];
  main: TIngredient[];
};

type TIngredientType = 'bun' | 'main' | 'sauce';

const initialState: TUserSlice = {
  constructorOrder: {
    bun: null,
    ingredients: []
  },
  user: {},
  orders: [],
  orderModalData: null,
  ingredientModalData: undefined,
  currentOrder: undefined,
  isOrderRequestPending: false,
  isPending: false,
  feedOrders: [],
  total: 0,
  totalToday: 0,
  ingridients: [],
  bun: [],
  sauce: [],
  main: []
};

const correctIndexes = (array: TConstructorIngredient[]) => {
  array.map((ingridient, index) => {
    ingridient.id = String(index);
  });
};

const processPendingAction: CaseReducer<
  TUserSlice,
  PayloadAction<undefined, string, never, never>
> = (state) => {
  state.isPending = true;
};

const processRejectedAction: CaseReducer<
  TUserSlice,
  PayloadAction<unknown, string, never, SerializedError>
> = (state, action) => {
  state.isPending = false;
  console.log(action.error);
};

export const getUserThunk = createAsyncThunk('user/info', async () =>
  getUserApi()
);

export const getUserOrders = createAsyncThunk('user/orders', async () =>
  getOrdersApi()
);

export const getOrderByNumber = createAsyncThunk(
  'user/orderInfo',
  async (number: number) => getOrderByNumberApi(number)
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

export const getOrders = createAsyncThunk('public/orders', async () =>
  getFeedsApi()
);

export const getIngridients = createAsyncThunk('ingridients', async () =>
  getIngredientsApi()
);

export const userSlice = createSlice({
  name: 'user',
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
    removeModalData: (state) => {
      state.orderModalData = null;
      state.currentOrder = undefined;
      state.ingredientModalData = undefined;
    },
    setOrderRequest: (state, action: PayloadAction<boolean>) => {
      state.isOrderRequestPending = action.payload;
    },
    searchIngredientModalData: (state, action: PayloadAction<string>) => {
      state.ingredientModalData = state.ingridients.find((ingredient) => {
        if (ingredient._id === action.payload) {
          return ingredient;
        }
      });
    }
  },
  selectors: {
    getUserName: (state) => state.user.name,
    getUserEmail: (state) => state.user.email,
    getUserData: (state) => state.user,
    constructorOrderSelector: (state) => state.constructorOrder,
    isRequestPending: (state) => state.isPending,
    userOrdersSelector: (state) => state.orders,
    orderModalDataSelector: (state) => state.orderModalData,
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
    },
    isOrderRequestPendingSelector: (state) => state.isOrderRequestPending,
    ordersSelector: (state) => state.feedOrders,
    totalTodaySelector: (state) => state.totalToday,
    totalSelector: (state) => state.total,
    getCurrentOrder: (state) => state.currentOrder,
    ingridientsSelector: (state) => state.ingridients,
    bunsSelector: (state) => state.bun,
    saucesSelector: (state) => state.sauce,
    mainsSelector: (state) => state.main,
    ingredientModalDataSelector: (state) => state.ingredientModalData
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserThunk.fulfilled, (state, action) => {
        state.isPending = false;
        state.user.email = action.payload.user.email;
        state.user.name = action.payload.user.name;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isPending = false;
        setCookie('accessToken', action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
        state.user.email = action.payload.user.email;
        state.user.name = action.payload.user.name;
      })
      .addCase(refreshLoginData.fulfilled, (state, action) => {
        state.user.email = action.payload.user.email;
        state.user.name = action.payload.user.name;
        state.isPending = false;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.orders = [];
        state.user.email = undefined;
        state.user.name = undefined;
        state.isPending = false;
      })
      .addCase(loginIntoAccount.fulfilled, (state, action) => {
        state.user.name = action.payload.user.name;
        state.user.email = action.payload.user.email;
        state.isPending = false;
        setCookie('accessToken', action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
      })
      .addCase(orderBurger.pending, (state, action) => {
        state.isOrderRequestPending = true;
      })
      .addCase(orderBurger.fulfilled, (state, action) => {
        state.orderModalData = action.payload.order;
        state.isOrderRequestPending = false;
      })
      .addCase(orderBurger.rejected, (state, action) => {
        state.isOrderRequestPending = false;
        console.log(action.error);
      })
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.isPending = false;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.feedOrders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
        state.isPending = false;
      })
      .addCase(getIngridients.fulfilled, (state, action) => {
        state.ingridients = action.payload;
        action.payload.forEach((ingridient) => {
          state[ingridient.type as TIngredientType].push(ingridient);
        });
        state.isPending = false;
      })
      .addCase(getOrderByNumber.pending, (state, action) => {
        state.isOrderRequestPending = true;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.isOrderRequestPending = false;
        state.currentOrder = action.payload.orders[0];
      })
      .addCase(getOrderByNumber.rejected, (state, action) => {
        state.isOrderRequestPending = false;
        console.log(action.error);
      })
      .addCase(getUserThunk.pending, processPendingAction)
      .addCase(register.pending, processPendingAction)
      .addCase(refreshLoginData.pending, processPendingAction)
      .addCase(logoutUser.pending, processPendingAction)
      .addCase(loginIntoAccount.pending, processPendingAction)
      .addCase(getUserOrders.pending, processPendingAction)
      .addCase(getUserThunk.rejected, processRejectedAction)
      .addCase(register.rejected, processRejectedAction)
      .addCase(refreshLoginData.rejected, processRejectedAction)
      .addCase(logoutUser.rejected, processRejectedAction)
      .addCase(loginIntoAccount.rejected, processRejectedAction)
      .addCase(getUserOrders.rejected, processRejectedAction);
  }
});

//TODO: Посмотреть обновление в реальном времени ленты заказов и заказов пользователя

export const {
  addIngredient,
  moveIngredient,
  removeIngredient,
  removeModalData,
  setOrderRequest,
  searchIngredientModalData
} = userSlice.actions;
export const {
  constructorOrderSelector,
  isRequestPending,
  getUserData,
  getUserEmail,
  getUserName,
  userOrdersSelector,
  orderModalDataSelector,
  ingredientsIDSelector,
  isOrderRequestPendingSelector,
  ingridientsSelector,
  bunsSelector,
  saucesSelector,
  mainsSelector,
  totalSelector,
  totalTodaySelector,
  ordersSelector,
  getCurrentOrder,
  ingredientModalDataSelector
} = userSlice.selectors;
