import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from 'react-redux';
import { selectUserState } from '../../services/userSlice';

export const AppHeader: FC = () => {
  const { user } = useSelector(selectUserState);
  return <AppHeaderUI userName={user?.name} />;
};
