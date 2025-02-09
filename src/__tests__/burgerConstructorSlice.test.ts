import { TConstructorIngredient, TIngredient } from '@utils-types';
import burgerConstructorSliceReducer, {
  addIngredient,
  BurgerConstructorState,
  moveIngredientDown,
  moveIngredientUp,
  orderBurgerThunk,
  removeIngredient,
  setBun
} from '../services/burgerConstructorSlice';
import { expect, test, describe } from '@jest/globals';

describe('burgerConstructorSlice', () => {
  const ingredient1: TConstructorIngredient = {
    _id: '101',
    id: '101',
    name: 'Котлета',
    type: 'main',
    proteins: 101,
    fat: 99,
    carbohydrates: 100,
    calories: 100,
    price: 200,
    image: 'cutlet.png',
    image_mobile: 'cutlet-mobile.png',
    image_large: 'cutlet-large.png'
  };

  const ingredient2: TConstructorIngredient = {
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
  };

  const bun: TIngredient | null = {
    _id: '103',
    name: 'Булочка',
    type: 'bun',
    proteins: 10,
    fat: 140,
    carbohydrates: 190,
    calories: 320,
    price: 50,
    image: 'bun.png',
    image_mobile: 'bun-mobile.png',
    image_large: 'bun-large.png'
  };

  const initialState: BurgerConstructorState = {
    constructorItems: {
      bun: null,
      ingredients: []
    },
    orderRequest: false,
    orderModalData: null,
    error: null
  };

  test('добавление ингредиента', () => {
    const newState = burgerConstructorSliceReducer(
      initialState,
      addIngredient(ingredient1)
    );
    expect(newState.constructorItems.ingredients).toHaveLength(1);
    expect(newState.constructorItems.ingredients[0]).toEqual({
      ...ingredient1,
      id: expect.any(String)
    });
  });

  test('выбор булочки', () => {
    const newState = burgerConstructorSliceReducer(initialState, setBun(bun));
    expect(newState.constructorItems.bun).toEqual({
      ...bun
    });
  });

  test('удаление ингредиента', () => {
    const initialState: BurgerConstructorState = {
      constructorItems: {
        bun: null,
        ingredients: [ingredient1]
      },
      orderRequest: false,
      orderModalData: null,
      error: null
    };
    const newState = burgerConstructorSliceReducer(
      initialState,
      removeIngredient(ingredient1.id)
    );
    expect(newState.constructorItems.ingredients).toHaveLength(0);
  });

  test('перемещение ингредиента вверх', () => {
    const initialState: BurgerConstructorState = {
      constructorItems: {
        bun: null,
        ingredients: [ingredient1, ingredient2]
      },
      orderRequest: false,
      orderModalData: null,
      error: null
    };
    const newState = burgerConstructorSliceReducer(
      initialState,
      moveIngredientUp(ingredient2.id)
    );
    expect(newState.constructorItems.ingredients).toEqual([
      ingredient2,
      ingredient1
    ]);
  });

  test('перемещение ингредиента вниз', () => {
    const initialState: BurgerConstructorState = {
      constructorItems: {
        bun: null,
        ingredients: [ingredient1, ingredient2]
      },
      orderRequest: false,
      orderModalData: null,
      error: null
    };
    const newState = burgerConstructorSliceReducer(
      initialState,
      moveIngredientDown(ingredient1.id)
    );
    expect(newState.constructorItems.ingredients).toEqual([
      ingredient2,
      ingredient1
    ]);
  });
});

describe('burgerConstructorSlice extraReducers', () => {
  const initialState: BurgerConstructorState = {
    constructorItems: {
      bun: {
        _id: '103',
        name: 'Булочка',
        type: 'bun',
        proteins: 10,
        fat: 140,
        carbohydrates: 190,
        calories: 320,
        price: 50,
        image: 'bun.png',
        image_mobile: 'bun-mobile.png',
        image_large: 'bun-large.png'
      },
      ingredients: [
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
      ]
    },
    orderRequest: false,
    orderModalData: null,
    error: null
  };

  test('orderBurgerThunk.pending', () => {
    const actualState = burgerConstructorSliceReducer(
      { ...initialState },
      orderBurgerThunk.pending('', [])
    );
    expect(actualState.orderRequest).toBe(true);
    expect(actualState.error).toBeNull();
  });

  test('orderBurgerThunk.rejected', () => {
    const errorMessage = 'Test error';
    const actualState = burgerConstructorSliceReducer(
      { ...initialState },
      orderBurgerThunk.rejected(new Error(errorMessage), '', [])
    );
    expect(actualState.orderRequest).toBe(false);
    expect(actualState.error).toBe(errorMessage);
  });

  test('orderBurgerThunk.fulfilled', () => {
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
    const actualState = burgerConstructorSliceReducer(
      {
        ...initialState,
        orderRequest: true
      },
      orderBurgerThunk.fulfilled(mockOrder, '', [])
    );
    expect(actualState.orderRequest).toBe(false);
    expect(actualState.error).toBeNull();
    expect(actualState.orderModalData).toEqual(mockOrder);
    expect(actualState.constructorItems.bun).toBeNull();
    expect(actualState.constructorItems.ingredients).toHaveLength(0);
  });
});
