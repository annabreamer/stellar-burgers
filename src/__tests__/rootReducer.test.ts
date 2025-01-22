import { combineReducers } from '@reduxjs/toolkit';
import ingredientsSliceReducer from '../services/ingredientsSlice';
import burgerConstructorSliceReducer from '../services/burgerConstructorSlice';
import ordersSliceReducer from '../services/ordersSlice';
import userOrderSliceReducer from '../services/userOrderSlice';
import userSliceReducer from '../services/userSlice';
import { expect, test, describe } from '@jest/globals';

const rootReducer = combineReducers({
  ingredients: ingredientsSliceReducer,
  burgerConstructor: burgerConstructorSliceReducer,
  orders: ordersSliceReducer,
  userOrders: userOrderSliceReducer,
  user: userSliceReducer
});

describe('rootReducer', () => {
  test('возвращение корректного начального состояния хранилища при undefined и unknown action', () => {
    const initialState = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });
    const expectedInitialState = {
      ingredients: ingredientsSliceReducer(undefined, {
        type: 'UNKNOWN_ACTION'
      }),
      burgerConstructor: burgerConstructorSliceReducer(undefined, {
        type: 'UNKNOWN_ACTION'
      }),
      orders: ordersSliceReducer(undefined, { type: 'UNKNOWN_ACTION' }),
      userOrders: userOrderSliceReducer(undefined, { type: 'UNKNOWN_ACTION' }),
      user: userSliceReducer(undefined, { type: 'UNKNOWN_ACTION' })
    };
    expect(initialState).toEqual(expectedInitialState);
  });
});
