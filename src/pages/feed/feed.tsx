import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchOrders,
  getFeedOrders,
  getIsFeedLoading
} from '../../services/ordersSlice';
import { AppDispatch } from '../../services/store';

export const Feed: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const orders: TOrder[] = useSelector(getFeedOrders);
  const isFeedLoading = useSelector(getIsFeedLoading);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  if (isFeedLoading) {
    return <Preloader />;
  }

  return (
    <FeedUI orders={orders} handleGetFeeds={() => dispatch(fetchOrders())} />
  );
};
