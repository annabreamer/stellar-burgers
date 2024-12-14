import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData
} from '@api';
import { deleteCookie, setCookie } from '../utils/cookie';
import { TUser } from '../utils/types';

export const loginUserThunk = createAsyncThunk(
  'user/loginUserApi',
  async ({ email, password }: TLoginData, { rejectWithValue }) => {
    const data = await loginUserApi({ email, password });
    if (!data?.success) {
      return rejectWithValue(data);
    }
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data.user;
  }
);

export const getUserThunk = createAsyncThunk('users/getUserApi', () =>
  getUserApi()
);

export const registerUserThunk = createAsyncThunk(
  'user/registerUserApi',
  async ({ name, email, password }: TRegisterData, { rejectWithValue }) => {
    const data = await registerUserApi({ name, email, password });
    if (!data?.success) {
      return rejectWithValue(data);
    }
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data.user;
  }
);

export const logoutUserThunk = createAsyncThunk(
  'user/logoutApi',
  async (_, { rejectWithValue }) => {
    const data = await logoutApi();
    if (!data?.success) {
      return rejectWithValue(data);
    }
    deleteCookie('accessToken');
    localStorage.removeItem('refreshToken');
    return data;
  }
);

export interface UserState {
  isInit: boolean;
  isLoading: boolean;
  user: TUser | null;
  loginError: string | undefined;
  registrationError: string | undefined;
}

const initialState: UserState = {
  isInit: false,
  isLoading: false,
  user: null,
  loginError: undefined,
  registrationError: undefined
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    init: (state) => {
      state.isInit = true;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(loginUserThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(loginUserThunk.rejected, (state, { error }) => {
      state.isLoading = false;
      if (error.message) {
        state.loginError = error.message;
      }
    });
    builder.addCase(loginUserThunk.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.user = payload;
      state.loginError = undefined;
    });

    builder.addCase(getUserThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getUserThunk.rejected, (state, { error }) => {
      state.isInit = true;
      state.isLoading = false;
      if (error.message) {
        state.loginError = error.message;
      }
    });
    builder.addCase(getUserThunk.fulfilled, (state, { payload }) => {
      state.isInit = true;
      state.isLoading = false;
      state.user = payload.user;
      state.loginError = undefined;
    });

    builder.addCase(registerUserThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(registerUserThunk.rejected, (state, { error }) => {
      state.isLoading = false;
      if (error.message) {
        state.registrationError = error.message;
      }
    });
    builder.addCase(registerUserThunk.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.user = payload;
      state.registrationError = undefined;
    });
    builder.addCase(logoutUserThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(logoutUserThunk.rejected, (state, { error }) => {
      state.isLoading = false;
      if (error.message) {
        state.loginError = error.message;
      }
    });
    builder.addCase(logoutUserThunk.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.user = null;
      state.loginError = undefined;
    });
  },
  selectors: {
    selectUserState: (state) => state
  }
});

export const { init } = userSlice.actions;

export const { selectUserState } = userSlice.selectors;

export default userSlice.reducer;
