import { expect, test, describe } from '@jest/globals';
import userSliceReducer, {
  forgotPasswordThunk,
  getUserThunk,
  loginUserThunk,
  logoutUserThunk,
  registerUserThunk,
  resetPasswordThunk,
  updateUserThunk,
  UserState
} from '../services/userSlice';

describe('userSlice extraReducers', () => {
  const initialState: UserState = {
    isInit: false,
    isLoading: false,
    user: null,
    loginError: undefined,
    registrationError: undefined
  };

  test('loginUserThunk.pending', () => {
    const actualState = userSliceReducer(
      { ...initialState },
      loginUserThunk.pending('', { email: '', password: '' })
    );
    expect(actualState.isLoading).toBe(true);
  });

  test('loginUserThunk.rejected', () => {
    const errorMessage = 'Test error';
    const actualState = userSliceReducer(
      { ...initialState },
      loginUserThunk.rejected(new Error(errorMessage), '', {
        email: '',
        password: ''
      })
    );
    expect(actualState.isLoading).toBe(false);
    expect(actualState.loginError).toBe(errorMessage);
  });

  test('loginUserThunk.fulfilled', () => {
    const mockUser = {
      email: 'test@gmail.com',
      name: 'Иван Иванов'
    };
    const actualState = userSliceReducer(
      {
        ...initialState
      },
      loginUserThunk.fulfilled(mockUser, '', { email: '', password: '' })
    );
    expect(actualState.isLoading).toBe(false);
    expect(actualState.loginError).toBeUndefined();
    expect(actualState.user).toEqual(mockUser);
  });

  test('getUserThunk.pending', () => {
    const actualState = userSliceReducer(
      { ...initialState },
      getUserThunk.pending('')
    );
    expect(actualState.isLoading).toBe(true);
  });

  test('getUserThunk.rejected', () => {
    const errorMessage = 'Test error';
    const actualState = userSliceReducer(
      { ...initialState },
      getUserThunk.rejected(new Error(errorMessage), '')
    );
    expect(actualState.isLoading).toBe(false);
    expect(actualState.isInit).toBe(true);
    expect(actualState.loginError).toBe(errorMessage);
  });

  test('getUserThunk.fulfilled', () => {
    const mockUserResponse = {
      user: {
        email: 'test@gmail.com',
        name: 'Иван Иванов'
      },
      success: true
    };
    const actualState = userSliceReducer(
      {
        ...initialState
      },
      getUserThunk.fulfilled(mockUserResponse, '')
    );
    expect(actualState.isLoading).toBe(false);
    expect(actualState.isInit).toBe(true);
    expect(actualState.loginError).toBeUndefined();
    expect(actualState.user).toEqual(mockUserResponse.user);
  });

  test('registerUserThunk.pending', () => {
    const actualState = userSliceReducer(
      { ...initialState },
      registerUserThunk.pending('', { email: '', name: '', password: '' })
    );
    expect(actualState.isLoading).toBe(true);
  });

  test('registerUserThunk.rejected', () => {
    const errorMessage = 'Test error';
    const actualState = userSliceReducer(
      { ...initialState },
      registerUserThunk.rejected(new Error(errorMessage), '', {
        email: '',
        name: '',
        password: ''
      })
    );
    expect(actualState.isLoading).toBe(false);
    expect(actualState.registrationError).toBe(errorMessage);
  });

  test('registerUserThunk.fulfilled', () => {
    const mockUser = {
      email: 'test@gmail.com',
      name: 'Иван Иванов'
    };
    const actualState = userSliceReducer(
      {
        ...initialState
      },
      registerUserThunk.fulfilled(mockUser, '', {
        email: '',
        name: '',
        password: ''
      })
    );
    expect(actualState.isLoading).toBe(false);
    expect(actualState.registrationError).toBeUndefined();
    expect(actualState.user).toEqual(mockUser);
  });

  test('logoutUserThunk.pending', () => {
    const actualState = userSliceReducer(
      { ...initialState },
      logoutUserThunk.pending('')
    );
    expect(actualState.isLoading).toBe(true);
  });

  test('logoutUserThunk.rejected', () => {
    const errorMessage = 'Test error';
    const actualState = userSliceReducer(
      { ...initialState },
      logoutUserThunk.rejected(new Error(errorMessage), '')
    );
    expect(actualState.isLoading).toBe(false);
    expect(actualState.loginError).toBe(errorMessage);
  });

  test('logoutUserThunk.fulfilled', () => {
    const actualState = userSliceReducer(
      {
        ...initialState
      },
      logoutUserThunk.fulfilled({ success: true }, '')
    );
    expect(actualState.isLoading).toBe(false);
    expect(actualState.loginError).toBeUndefined();
    expect(actualState.user).toEqual(null);
  });

  test('forgotPasswordThunk.pending', () => {
    const actualState = userSliceReducer(
      { ...initialState },
      forgotPasswordThunk.pending('', { email: '', password: '' })
    );
    expect(actualState.isLoading).toBe(true);
  });

  test('forgotPasswordThunk.rejected', () => {
    const errorMessage = 'Test error';
    const actualState = userSliceReducer(
      { ...initialState },
      forgotPasswordThunk.rejected(new Error(errorMessage), '', {
        email: '',
        password: ''
      })
    );
    expect(actualState.isLoading).toBe(false);
    expect(actualState.loginError).toBe(errorMessage);
  });

  test('forgotPasswordThunk.fulfilled', () => {
    const actualState = userSliceReducer(
      {
        ...initialState
      },
      forgotPasswordThunk.fulfilled({ success: true }, '', {
        email: '',
        password: ''
      })
    );
    expect(actualState.isLoading).toBe(false);
    expect(actualState.loginError).toBeUndefined();
  });

  test('resetPasswordThunk.pending', () => {
    const actualState = userSliceReducer(
      { ...initialState },
      resetPasswordThunk.pending('', { token: '', password: '' })
    );
    expect(actualState.isLoading).toBe(true);
  });

  test('resetPasswordThunk.rejected', () => {
    const errorMessage = 'Test error';
    const actualState = userSliceReducer(
      { ...initialState },
      resetPasswordThunk.rejected(new Error(errorMessage), '', {
        token: '',
        password: ''
      })
    );
    expect(actualState.isLoading).toBe(false);
    expect(actualState.loginError).toBe(errorMessage);
  });

  test('resetPasswordThunk.fulfilled', () => {
    const actualState = userSliceReducer(
      {
        ...initialState
      },
      resetPasswordThunk.fulfilled({ success: true }, '', {
        token: '',
        password: ''
      })
    );
    expect(actualState.isLoading).toBe(false);
    expect(actualState.loginError).toBeUndefined();
  });

  test('updateUserThunk.pending', () => {
    const actualState = userSliceReducer(
      { ...initialState },
      updateUserThunk.pending('', { email: '', name: '', password: '' })
    );
    expect(actualState.isLoading).toBe(true);
  });

  test('updateUserThunk.rejected', () => {
    const errorMessage = 'Test error';
    const actualState = userSliceReducer(
      { ...initialState },
      updateUserThunk.rejected(new Error(errorMessage), '', {
        email: '',
        name: '',
        password: ''
      })
    );
    expect(actualState.isLoading).toBe(false);
    expect(actualState.isInit).toBe(true);
    expect(actualState.loginError).toBe(errorMessage);
  });

  test('updateUserThunk.fulfilled', () => {
    const mockUser = {
      email: 'test@gmail.com',
      name: 'Иван Иванов'
    };
    const actualState = userSliceReducer(
      {
        ...initialState
      },
      updateUserThunk.fulfilled(mockUser, '', {
        email: '',
        name: '',
        password: ''
      })
    );
    expect(actualState.isLoading).toBe(false);
    expect(actualState.isInit).toBe(true);
    expect(actualState.user).toBe(mockUser);
    expect(actualState.loginError).toBeUndefined();
  });
});
