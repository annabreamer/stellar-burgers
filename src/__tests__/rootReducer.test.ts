import { rootReducer } from '../services/store';
import {
  initialState as ingredientsInitialState
} from '../services/ingredientsSlice';
import {
  initialState as burgerConstructorInitialState
} from '../services/burgerConstructorSlice';
import {
  initialState as ordersInitialState
} from '../services/ordersSlice';
import {
  initialState as userOrdersInitialState
} from '../services/userOrderSlice';
import {
  initialState as userInitialState
} from '../services/userSlice';
import { expect, test, describe } from '@jest/globals';

const expectedInitialState = {
  ingredients: ingredientsInitialState,
  burgerConstructor: burgerConstructorInitialState,
  orders: ordersInitialState,
  userOrders: userOrdersInitialState,
  user: userInitialState
};

describe('rootReducer', () => {
  test('возвращение корректного начального состояния хранилища при undefined и unknown action', () => {
    const initialState = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(initialState).toEqual(expectedInitialState);
  });
});
