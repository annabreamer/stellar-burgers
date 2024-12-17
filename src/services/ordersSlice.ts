import { TOrder } from '../utils/types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getFeedsApi } from '../utils/burger-api';

export interface OrdersState {
  isLoading: boolean;
  orders: TOrder[];
  error: string | null;
}

const initialState: OrdersState = {
  isLoading: false,
  orders: [],
  error: null
};

export const fetchOrders = createAsyncThunk<TOrder[]>(
  'orders/fetchOrders',
  async () => {
    const orders = await getFeedsApi();
    return orders.orders;
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
        state.orders = action.payload;
        state.error = null;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Не удалось загрузить заказы';
      });
  },
  selectors: {
    getOrders: (state) => state.orders
  }
});

export default ordersSlice.reducer;
export const { getOrders } = ordersSlice.selectors;
