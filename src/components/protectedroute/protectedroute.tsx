import { useSelector } from '../../services/store';
import { Navigate, useLocation } from 'react-router-dom';
import { selectUserState } from '../../services/userSlice';
import { Preloader } from '@ui';

type ProtectedRouteProps = {
  redirectTo?: string;
  children: React.ReactElement;
  onlyUnAuth?: boolean;
};

const ProtectedRoute = ({
  onlyUnAuth,
  redirectTo = '/login',
  children
}: ProtectedRouteProps) => {
  const location = useLocation();
  const { user, isLoading, isInit } = useSelector(selectUserState);

  if (!isInit || isLoading) {
    return <Preloader />;
  }

  if (onlyUnAuth && user) {
    return <Navigate to='/' state={{ from: location }} />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to={redirectTo} state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;
