import ingredientsSliceReducer, {
  fetchIngredients,
  IngredientsState
} from '../services/ingredientsSlice';
import { expect, test, describe } from '@jest/globals';

describe('ingredientsSlice extraReducers', () => {
  const initialState: IngredientsState = {
    isLoading: false,
    ingredients: [],
    error: null
  };

  test('fetchIngredients.pending', () => {
    const actualState = ingredientsSliceReducer(
      { ...initialState },
      fetchIngredients.pending('')
    );
    expect(actualState.isLoading).toBe(true);
  });

  test('fetchIngredients.rejected', () => {
    const errorMessage = 'Test error';
    const actualState = ingredientsSliceReducer(
      { ...initialState },
      fetchIngredients.rejected(new Error(errorMessage), '')
    );
    expect(actualState.isLoading).toBe(false);
    expect(actualState.error).toBe(errorMessage);
  });

  test('fetchIngredients.fulfilled', () => {
    const mockIngredients = [
      {
        _id: '102',
        id: '102',
        name: 'Сыр',
        type: 'main',
        proteins: 50,
        fat: 110,
        carbohydrates: 90,
        calories: 120,
        price: 30,
        image: 'cheese.png',
        image_mobile: 'cheese-mobile.png',
        image_large: 'cheese-large.png'
      }
    ];
    const actualState = ingredientsSliceReducer(
      {
        ...initialState
      },
      fetchIngredients.fulfilled(mockIngredients, '')
    );
    expect(actualState.isLoading).toBe(false);
    expect(actualState.error).toBeNull();
    expect(actualState.ingredients).toEqual(mockIngredients);
  });
});
