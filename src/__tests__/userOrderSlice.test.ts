import { expect, test, describe } from '@jest/globals';
import userOrderSliceReducer, {
  fetchUserOrders,
  userOrdersState
} from '../services/userOrderSlice';

describe('userOrderSlice extraReducers', () => {
  const initialState: userOrdersState = {
    isLoading: false,
    orders: [],
    error: null
  };

  test('fetchUserOrders.pending', () => {
    const actualState = userOrderSliceReducer(
      { ...initialState },
      fetchUserOrders.pending('')
    );
    expect(actualState.isLoading).toBe(true);
  });

  test('fetchUserOrders.rejected', () => {
    const errorMessage = 'Test error';
    const actualState = userOrderSliceReducer(
      { ...initialState },
      fetchUserOrders.rejected(new Error(errorMessage), '')
    );
    expect(actualState.isLoading).toBe(false);
    expect(actualState.error).toBe(errorMessage);
  });

  test('fetchUserOrders.fulfilled', () => {
    const mockOrder = {
      _id: 'order123',
      id: 'order123',
      name: 'Test Order',
      status: 'done',
      createdAt: '2023-01-01T00:00:00.000Z',
      updatedAt: '2023-01-01T00:00:00.000Z',
      number: 123,
      ingredients: ['103', '102', '103']
    };
    const actualState = userOrderSliceReducer(
      {
        ...initialState
      },
      fetchUserOrders.fulfilled([mockOrder], '')
    );
    expect(actualState.isLoading).toBe(false);
    expect(actualState.error).toBeNull();
    expect(actualState.orders).toEqual([mockOrder]);
  });
});
