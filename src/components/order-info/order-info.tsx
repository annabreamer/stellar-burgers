import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient, TOrder } from '@utils-types';
import { useDispatch, useSelector } from '../../services/store';
import { useParams } from 'react-router-dom';
import {
  getOrderByNumberThunk,
  getShownOrders,
  getIsShownLoading,
  getOrderStatus
} from '../../services/ordersSlice';
import { AppDispatch } from '../../services/store';
import { getIngredients } from '../../services/ingredientsSlice';

export const OrderInfo: FC = () => {
  const dispatch = useDispatch();
  const { number } = useParams<{ number: string }>();

  const orders = useSelector(getShownOrders);
  const isShownLoading = useSelector(getIsShownLoading);

  useEffect(() => {
    if (number) {
      dispatch(getOrderByNumberThunk(Number(number)));
    }
  }, [dispatch, number]);

  const orderData = orders.find((order) => order.number === Number(number));

  const status = useSelector(getOrderStatus);

  const ingredients = useSelector(getIngredients);

  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      status,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (isShownLoading || !orderData || !orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
