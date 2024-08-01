import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC } from 'react';
import { useSelector } from '../../services/store/store';
import { userOrdersSelector } from '../../services/slices/UserSlice';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const orders: TOrder[] = useSelector(userOrdersSelector);

  return <ProfileOrdersUI orders={orders} />;
};
