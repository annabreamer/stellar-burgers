import { expect, test, describe } from '@jest/globals';
import orderSliceReducer, {
  fetchOrders,
  getOrderByNumberThunk,
  OrdersState
} from '../services/ordersSlice';

describe('orderSlice extraReducers', () => {
  const initialState: OrdersState = {
    isFeedLoading: false,
    isShownLoading: false,
    feedOrders: [],
    shownOrders: [],
    error: null,
    total: null,
    totalToday: null,
    orderStatus: ''
  };

  test('fetchOrders.pending', () => {
    const actualState = orderSliceReducer(
      { ...initialState },
      fetchOrders.pending('')
    );
    expect(actualState.isFeedLoading).toBe(true);
  });

  test('fetchOrders.rejected', () => {
    const errorMessage = 'Test error';
    const actualState = orderSliceReducer(
      { ...initialState },
      fetchOrders.rejected(new Error(errorMessage), '')
    );
    expect(actualState.isFeedLoading).toBe(false);
    expect(actualState.error).toBe(errorMessage);
  });

  test('fetchOrders.fulfilled', () => {
    const mockOrdersData = {
      orders: [
        {
          _id: 'order123',
          id: 'order123',
          name: 'Test Order',
          status: 'done',
          createdAt: '2023-01-01T00:00:00.000Z',
          updatedAt: '2023-01-01T00:00:00.000Z',
          number: 123,
          ingredients: ['103', '102', '103']
        }
      ],
      total: 178,
      totalToday: 65
    };
    const actualState = orderSliceReducer(
      {
        ...initialState
      },
      fetchOrders.fulfilled(mockOrdersData, '')
    );
    expect(actualState.isFeedLoading).toBe(false);
    expect(actualState.error).toBeNull();
    expect(actualState.feedOrders).toEqual(mockOrdersData.orders);
    expect(actualState.total).toEqual(mockOrdersData.total);
    expect(actualState.totalToday).toEqual(mockOrdersData.totalToday);
  });

  test('getOrderByNumberThunk.pending', () => {
    const actualState = orderSliceReducer(
      { ...initialState },
      getOrderByNumberThunk.pending('', 123)
    );
    expect(actualState.isShownLoading).toBe(true);
  });

  test('getOrderByNumberThunk.rejected', () => {
    const errorMessage = 'Test error';
    const actualState = orderSliceReducer(
      { ...initialState },
      getOrderByNumberThunk.rejected(new Error(errorMessage), '', 123)
    );
    expect(actualState.isShownLoading).toBe(false);
    expect(actualState.error).toBe(errorMessage);
  });

  test('getOrderByNumberThunk.fulfilled', () => {
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
    const actualState = orderSliceReducer(
      {
        ...initialState
      },
      getOrderByNumberThunk.fulfilled([mockOrder], '', 123)
    );
    expect(actualState.isShownLoading).toBe(false);
    expect(actualState.error).toBeNull();
    expect(actualState.shownOrders).toEqual([mockOrder]);
    expect(actualState.orderStatus).toEqual(mockOrder.status);
  });
});
