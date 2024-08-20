import { configureStore } from '@reduxjs/toolkit';
import reducer, {
  getUserThunk,
  register,
  refreshLoginData,
  logoutUser,
  loginIntoAccount,
  getUserOrders,
  orderBurger,
  setOrderRequest,
  clearCurrentOrder
} from './UserSlice';
import { user, registeredUser, feed, newOrder } from './TestingData';
import { getCookie, setCookie } from '../../utils/cookie';

describe('Тест UserSlice', () => {
  const initialState = {
    currentOrder: null,
    user: {},
    orders: [],
    isOrderRequestPending: false,
    isGettingOrders: false,
    isGettingUser: false
  };

  test('Тест вызова getUserThunk', () => {
    global.fetch = jest.fn(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(user)
      });
    }) as jest.Mock;

    const store = configureStore({
      reducer: {
        user: reducer
      }
    });

    store.dispatch(getUserThunk());

    expect(store.getState().user).toEqual({
      ...initialState,
      isGettingUser: true
    });
  });

  test('Тест вызова register', () => {
    global.fetch = jest.fn(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(registeredUser)
      });
    }) as jest.Mock;

    const store = configureStore({
      reducer: {
        user: reducer
      }
    });

    store.dispatch(
      register({
        name: 'TheBigBoss',
        email: 'thebigboss@bigboss.ru',
        password: 'abcdefg'
      })
    );

    expect(store.getState().user).toEqual({
      ...initialState,
      isGettingUser: true
    });
  });

  test('Тест вызова refreshLoginData', () => {
    global.fetch = jest.fn(() => {
      return Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            success: true,
            user: {
              name: 'TheBiiigBooos',
              email: 'thebiiigbooos@bigboss.ru'
            }
          })
      });
    }) as jest.Mock;

    const store = configureStore({
      reducer: {
        user: reducer
      }
    });

    store.dispatch(
      refreshLoginData({
        name: 'TheBiiigBooos',
        email: 'thebiiigbooos@bigboss.ru',
        password: '12345678'
      })
    );

    expect(store.getState().user).toEqual({
      ...initialState,
      isGettingUser: true
    });
  });

  test('Тест вызова logoutUser', () => {
    global.fetch = jest.fn(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ success: true })
      });
    }) as jest.Mock;

    const store = configureStore({
      reducer: {
        user: reducer
      }
    });

    store.dispatch(logoutUser());

    expect(store.getState().user).toEqual({
      ...initialState,
      isGettingUser: true
    });
  });

  test('Тест вызова loginIntoAccount', () => {
    global.fetch = jest.fn(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(registeredUser)
      });
    }) as jest.Mock;

    const store = configureStore({
      reducer: {
        user: reducer
      }
    });

    store.dispatch(
      loginIntoAccount({ email: 'thebigboss@bigboss.ru', password: 'abcdefg' })
    );

    expect(store.getState().user).toEqual({
      ...initialState,
      isGettingUser: true
    });
  });

  test('Тест вызова getUserOrders', () => {
    global.fetch = jest.fn(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(feed)
      });
    }) as jest.Mock;

    const store = configureStore({
      reducer: {
        user: reducer
      }
    });

    store.dispatch(getUserOrders());

    expect(store.getState().user).toEqual({
      ...initialState,
      isGettingOrders: true
    });
  });

  test('Тест вызова orderBurger', () => {
    global.fetch = jest.fn(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(newOrder)
      });
    }) as jest.Mock;

    const store = configureStore({
      reducer: {
        user: reducer
      }
    });

    store.dispatch(
      orderBurger([
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa0942',
        '643d69a5c3f7b9001cfa093c'
      ])
    );

    expect(store.getState().user).toEqual({
      ...initialState,
      isOrderRequestPending: true
    });
  });

  test('Тест rejected getUserThunk', async () => {
    global.fetch = jest.fn(() => {
      return Promise.resolve({
        ok: false,
        json: () => Promise.resolve(user)
      });
    }) as jest.Mock;

    const store = configureStore({
      reducer: {
        user: reducer
      }
    });

    await store.dispatch(getUserThunk());

    expect(store.getState().user).toEqual({
      ...initialState,
      isGettingUser: false
    });
  });

  test('Тест rejected register', async () => {
    global.fetch = jest.fn(() => {
      return Promise.resolve({
        ok: false,
        json: () => Promise.resolve(registeredUser)
      });
    }) as jest.Mock;

    const store = configureStore({
      reducer: {
        user: reducer
      }
    });

    await store.dispatch(
      register({
        name: 'TheBigBoss',
        email: 'thebigboss@bigboss.ru',
        password: 'abcdefg'
      })
    );

    expect(store.getState().user).toEqual({
      ...initialState,
      isGettingUser: false
    });
  });

  test('Тест rejected refreshLoginData', async () => {
    global.fetch = jest.fn(() => {
      return Promise.resolve({
        ok: false,
        json: () =>
          Promise.resolve({
            success: true,
            user: {
              name: 'TheBiiigBooos',
              email: 'thebiiigbooos@bigboss.ru'
            }
          })
      });
    }) as jest.Mock;

    const store = configureStore({
      reducer: {
        user: reducer
      }
    });

    await store.dispatch(
      refreshLoginData({
        name: 'TheBiiigBooos',
        email: 'thebiiigbooos@bigboss.ru',
        password: '12345678'
      })
    );

    expect(store.getState().user).toEqual({
      ...initialState,
      isGettingUser: false
    });
  });

  test('Тест rejected logoutUser', async () => {
    global.fetch = jest.fn(() => {
      return Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ success: true })
      });
    }) as jest.Mock;

    const store = configureStore({
      reducer: {
        user: reducer
      }
    });

    await store.dispatch(logoutUser());

    expect(store.getState().user).toEqual({
      ...initialState,
      isGettingUser: false
    });
  });

  test('Тест loginIntoAccount', async () => {
    global.fetch = jest.fn(() => {
      return Promise.resolve({
        ok: false,
        json: () => Promise.resolve(registeredUser)
      });
    }) as jest.Mock;

    const store = configureStore({
      reducer: {
        user: reducer
      }
    });

    await store.dispatch(
      loginIntoAccount({ email: 'thebigboss@bigboss.ru', password: 'abcdefg' })
    );

    expect(store.getState().user).toEqual({
      ...initialState,
      isGettingUser: false
    });
  });

  test('Тест rejected getUserOrders', async () => {
    global.fetch = jest.fn(() => {
      return Promise.resolve({
        ok: false,
        json: () => Promise.resolve(feed)
      });
    }) as jest.Mock;

    const store = configureStore({
      reducer: {
        user: reducer
      }
    });

    await store.dispatch(getUserOrders());

    expect(store.getState().user).toEqual({
      ...initialState,
      isGettingOrders: false
    });
  });

  test('Тест rejected orderBurger', async () => {
    global.fetch = jest.fn(() => {
      return Promise.resolve({
        ok: false,
        json: () => Promise.resolve(newOrder)
      });
    }) as jest.Mock;

    const store = configureStore({
      reducer: {
        user: reducer
      }
    });

    await store.dispatch(
      orderBurger([
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa0942',
        '643d69a5c3f7b9001cfa093c'
      ])
    );

    expect(store.getState().user).toEqual({
      ...initialState,
      isOrderRequestPending: false
    });
  });

  test('Тест экшена getUserThunk', async () => {
    global.fetch = jest.fn(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(user)
      });
    }) as jest.Mock;

    const store = configureStore({
      reducer: {
        user: reducer
      }
    });

    await store.dispatch(getUserThunk());

    expect(store.getState().user).toEqual({
      ...initialState,
      user: {
        name: 'TheBigBoss',
        email: 'thebigboss@bigboss.ru'
      }
    });
  });

  test('Тест экшена register', async () => {
    global.fetch = jest.fn(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(registeredUser)
      });
    }) as jest.Mock;

    const store = configureStore({
      reducer: {
        user: reducer
      }
    });

    await store.dispatch(
      register({
        name: 'TheBigBoss',
        email: 'thebigboss@bigboss.ru',
        password: 'abcdefg'
      })
    );

    expect(store.getState().user).toEqual({
      ...initialState,
      user: {
        name: 'TheBigBoss',
        email: 'thebigboss@bigboss.ru'
      }
    });

    expect(localStorage.getItem('refreshToken')).toBe('abcdefg');
    expect(getCookie('accessToken')).toBe('abcdefg');
  });

  test('Тест экшена refreshLoginData', async () => {
    global.fetch = jest.fn(() => {
      return Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            success: true,
            user: {
              name: 'TheBiiigBooos',
              email: 'thebiiigbooos@bigboss.ru'
            }
          })
      });
    }) as jest.Mock;

    const store = configureStore({
      reducer: {
        user: reducer
      }
    });

    await store.dispatch(
      refreshLoginData({
        name: 'TheBiiigBooos',
        email: 'thebiiigbooos@bigboss.ru',
        password: '12345678'
      })
    );

    expect(store.getState().user).toEqual({
      ...initialState,
      user: {
        name: 'TheBiiigBooos',
        email: 'thebiiigbooos@bigboss.ru'
      }
    });
  });

  test('Тест экшена logoutUser', async () => {
    global.fetch = jest.fn(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ success: true })
      });
    }) as jest.Mock;

    setCookie('accessToken', 'abcdefg');
    localStorage.setItem('refreshToken', 'abcdefg');

    const store = configureStore({
      reducer: {
        user: reducer
      }
    });

    await store.dispatch(logoutUser());

    expect(localStorage.getItem('refreshToken')).toBe(null);
    expect(getCookie('accessToken')).toBe(undefined);
  });

  test('Тест экшена loginIntoAccount', async () => {
    global.fetch = jest.fn(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(registeredUser)
      });
    }) as jest.Mock;

    const store = configureStore({
      reducer: {
        user: reducer
      }
    });

    await store.dispatch(
      loginIntoAccount({ email: 'thebigboss@bigboss.ru', password: 'abcdefg' })
    );

    expect(store.getState().user).toEqual({
      ...initialState,
      user: {
        name: 'TheBigBoss',
        email: 'thebigboss@bigboss.ru'
      }
    });
    expect(localStorage.getItem('refreshToken')).toBe('abcdefg');
    expect(getCookie('accessToken')).toBe('abcdefg');
  });

  test('Тест экшена getUserOrders', async () => {
    global.fetch = jest.fn(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(feed)
      });
    }) as jest.Mock;

    const store = configureStore({
      reducer: {
        user: reducer
      }
    });

    await store.dispatch(getUserOrders());

    expect(store.getState().user).toEqual({
      ...initialState,
      orders: [feed.orders[0]]
    });
  });

  test('Тест экшена orderBurger', async () => {
    global.fetch = jest.fn(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(newOrder)
      });
    }) as jest.Mock;

    const store = configureStore({
      reducer: {
        user: reducer
      }
    });

    await store.dispatch(
      orderBurger([
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa0942',
        '643d69a5c3f7b9001cfa093c'
      ])
    );

    expect(store.getState().user).toEqual({
      ...initialState,
      currentOrder: newOrder.order
    });
  });

  test('Тест редьюсера setOrderRequet', () => {
    const newState = reducer(
      { ...initialState, isOrderRequestPending: true },
      setOrderRequest(false)
    );

    expect(newState).toEqual(initialState);
  });

  test('Тест редьюсера clearCurrentOrder', () => {
    const newState = reducer(
      { ...initialState, currentOrder: feed.orders[0] },
      clearCurrentOrder()
    );

    expect(newState).toEqual(initialState);
  });
});
