import { TOrder, TOrdersData } from '../utils/types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getFeedsApi } from '../utils/burger-api';

export interface OrdersState {
  isLoading: boolean;
  orders: TOrder[];
  error: string | null;
  total: number | null;
  totalToday: number | null;
}

const initialState: OrdersState = {
  isLoading: false,
  orders: [],
  error: null,
  total: null,
  totalToday: null
};

export const fetchOrders = createAsyncThunk<TOrdersData>(
  'orders/fetchOrders',
  async () => {
    const result = await getFeedsApi();
    return result;
  }
);

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
        state.error = null;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Не удалось загрузить заказы';
      });
  },
  selectors: {
    getOrders: (state) => state.orders,
    getIsLoading: (state) => state.isLoading,
    getTotal: (state) => state.total,
    getTotalToday: (state) => state.totalToday
  }
});

export default ordersSlice.reducer;
export const { getOrders, getIsLoading, getTotal, getTotalToday } =
  ordersSlice.selectors;
