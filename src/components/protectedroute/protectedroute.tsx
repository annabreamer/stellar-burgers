import { Navigate, useLocation } from 'react-router-dom';

type ProtectedRouteProps = {
  isAuth: boolean;
  redirectTo?: string;
  children: React.ReactElement;
};

const ProtectedRoute = ({
  isAuth,
  redirectTo = '/login',
  children
}: ProtectedRouteProps) => {
  const location = useLocation();
  return isAuth ? (
    children
  ) : (
    <Navigate to={redirectTo} state={{ from: location }} />
  );
};

export default ProtectedRoute;
