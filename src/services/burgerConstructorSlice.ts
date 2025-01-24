import { orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';
import { getCookie } from '../utils/cookie';
import { v4 as uuidv4 } from 'uuid';

export interface BurgerConstructorState {
  constructorItems: {
    bun: TIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  orderRequest: boolean;
  orderModalData: TOrder | null;
  error: string | null;
}

export const initialState: BurgerConstructorState = {
  constructorItems: {
    bun: null,
    ingredients: []
  },
  orderRequest: false,
  orderModalData: null,
  error: null
};

export const orderBurgerThunk = createAsyncThunk(
  'orders/orderBurgerApi',
  async (ingredients: string[], { rejectWithValue }) => {
    const accessToken = getCookie('accessToken');
    if (!accessToken) {
      return rejectWithValue({ message: 'User is not authorized' });
    }
    const response = await orderBurgerApi(ingredients);
    if (!response?.success) {
      return rejectWithValue(response);
    }
    return response.order;
  }
);

const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    setBun(state, action: PayloadAction<TIngredient>) {
      state.constructorItems.bun = action.payload;
    },
    addIngredient: {
      reducer(state, action: PayloadAction<TConstructorIngredient>) {
        state.constructorItems.ingredients.push(action.payload);
      },
      prepare(ingredient: TIngredient) {
        return { payload: { ...ingredient, id: uuidv4() } };
      }
    },
    removeIngredient(state, action: PayloadAction<string>) {
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (ingredient) => ingredient.id !== action.payload
        );
    },
    setOrderModalData(state, action: PayloadAction<TOrder | null>) {
      state.orderModalData = action.payload;
    },
    moveIngredientUp(state, action: PayloadAction<string>) {
      const index = state.constructorItems.ingredients.findIndex(
        (ingredient) => ingredient.id === action.payload
      );
      if (index > 0) {
        const [item] = state.constructorItems.ingredients.splice(index, 1);
        state.constructorItems.ingredients.splice(index - 1, 0, item);
      }
    },
    moveIngredientDown(state, action: PayloadAction<string>) {
      const index = state.constructorItems.ingredients.findIndex(
        (ingredient) => ingredient.id === action.payload
      );
      if (index < state.constructorItems.ingredients.length - 1) {
        const [item] = state.constructorItems.ingredients.splice(index, 1);
        state.constructorItems.ingredients.splice(index + 1, 0, item);
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(orderBurgerThunk.pending, (state) => {
      state.orderRequest = true;
      state.error = null;
    });
    builder.addCase(orderBurgerThunk.rejected, (state, { error }) => {
      state.orderRequest = false;
      if (error.message) {
        state.error = error.message;
      }
    });
    builder.addCase(orderBurgerThunk.fulfilled, (state, { payload }) => {
      state.orderRequest = false;
      state.orderModalData = payload;
      state.error = null;
      state.constructorItems.bun = null;
      state.constructorItems.ingredients = [];
    });
  },
  selectors: {
    selectBun: (state) => state.constructorItems.bun,
    selectIngredients: (state) => state.constructorItems.ingredients,
    selectOrderRequest: (state) => state.orderRequest,
    selectOrderModalData: (state) => state.orderModalData
  }
});

export const {
  setBun,
  addIngredient,
  removeIngredient,
  setOrderModalData,
  moveIngredientDown,
  moveIngredientUp
} = burgerConstructorSlice.actions;

export const {
  selectBun,
  selectIngredients,
  selectOrderRequest,
  selectOrderModalData
} = burgerConstructorSlice.selectors;

export default burgerConstructorSlice.reducer;
