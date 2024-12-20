import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchUserOrders,
  getIsLoading,
  getUserOrders
} from '../../services/userOrderSlice';
import { AppDispatch } from '../../services/store';
import { Preloader } from '@ui';

export const ProfileOrders: FC = () => {
  const orders: TOrder[] = useSelector(getUserOrders);
  const isLoading = useSelector(getIsLoading);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch]);

  if (isLoading) {
    return <Preloader />;
  }

  return <ProfileOrdersUI orders={orders} />;
};
