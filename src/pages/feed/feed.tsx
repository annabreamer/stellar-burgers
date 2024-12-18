import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchOrders,
  getOrders,
  getIsLoading
} from '../../services/ordersSlice';
import { AppDispatch } from '../../services/store';

export const Feed: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const orders: TOrder[] = useSelector(getOrders);
  const isLoading = useSelector(getIsLoading);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <FeedUI orders={orders} handleGetFeeds={() => dispatch(fetchOrders())} />
  );
};
