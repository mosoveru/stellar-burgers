import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../services/store/store';
import { getUserName } from '../../services/slices/UserSlice';

export const AppHeader: FC = () => {
  const name = useSelector(getUserName);

  return <AppHeaderUI userName={name || ''} />;
};
