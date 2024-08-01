import { Outlet, useLocation } from 'react-router-dom';
import { isRequestPending, getUserData } from '../../services/slices/UserSlice';
import { useSelector } from '../../services/store/store';
import { Preloader } from '@ui';
import { Navigate } from 'react-router-dom';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
};

export const ProtectedRoute = ({ onlyUnAuth }: ProtectedRouteProps) => {
  const isChecking = useSelector(isRequestPending);
  const user = useSelector(getUserData);
  const location = useLocation();

  if (isChecking) {
    return <Preloader />;
  }

  if (!user.email && !onlyUnAuth) {
    return <Navigate to={'/login'} replace state={{ from: location }} />;
  }

  if (onlyUnAuth && user.email) {
    const from = location.state?.from || { pathname: '/feed' };
    return <Navigate to={from} replace />;
  }

  return <Outlet />;
};
