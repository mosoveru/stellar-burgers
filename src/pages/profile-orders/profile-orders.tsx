import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC } from 'react';
import { useDispatch, useSelector } from '../../services/store/store';
import {
  getUserOrders,
  userOrdersSelector
} from '../../services/slices/UserSlice';

export const ProfileOrders: FC = () => {
  const orders: TOrder[] = useSelector(userOrdersSelector);
  const dispatch = useDispatch();
  if (orders.length === 0) {
    dispatch(getUserOrders());
  }

  return <ProfileOrdersUI orders={orders} />;
};
