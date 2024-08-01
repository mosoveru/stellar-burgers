import {
  Feed,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ConstructorPage,
  ProfileOrders,
  NotFound404
} from '@pages';
import {
  ProtectedRoute,
  Modal,
  OrderInfo,
  IngredientDetails
} from '@components';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader } from '@components';
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams
} from 'react-router-dom';
import { useEffect } from 'react';
import { getOrders, removeModalData } from '../../services/slices/UserSlice';
import { getIngridients } from '../../services/slices/UserSlice';
import { getUserOrders, getUserThunk } from '../../services/slices/UserSlice';
import { useDispatch } from '../../services/store/store';
import { ModalWrapper } from '../modal-wrapper/modal-wrapper';
import { ModalPage } from '../../pages/modal-page/modal-page';

const App = () => {
  const dispatch = useDispatch();
  let firstInit = true;
  useEffect(() => {
    if (firstInit) {
      dispatch(getOrders());
      dispatch(getIngridients());
      dispatch(getUserThunk());
      dispatch(getUserOrders());
      firstInit = false;
    }
  }, []);
  const navigate = useNavigate();
  const location = useLocation();
  const background = location.state?.background;
  const closeModal = () => {
    navigate(location.state?.background.pathname || '/');
    dispatch(removeModalData());
  };
  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={background || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/login' element={<ProtectedRoute onlyUnAuth />}>
          <Route index element={<Login />} />
        </Route>
        <Route path='/register' element={<ProtectedRoute onlyUnAuth />}>
          <Route index element={<Register />} />
        </Route>
        <Route path='/forgot-password' element={<ProtectedRoute onlyUnAuth />}>
          <Route index element={<ForgotPassword />} />
        </Route>
        <Route path='/reset-password' element={<ProtectedRoute onlyUnAuth />}>
          <Route index element={<ResetPassword />} />
        </Route>
        <Route path='profile' element={<ProtectedRoute />}>
          <Route index element={<Profile />} />
        </Route>
        <Route path='/profile/orders' element={<ProtectedRoute />}>
          <Route index element={<ProfileOrders />} />
        </Route>
        <Route path='*' element={<NotFound404 />} />
        <Route
          path='/feed/:number'
          element={
            <ModalPage>
              <OrderInfo />
            </ModalPage>
          }
        />
        <Route
          path='ingredients/:id'
          element={
            <ModalPage>
              <IngredientDetails />
            </ModalPage>
          }
        />
        <Route path='profile/orders/:number' element={<ProtectedRoute />}>
          <Route
            index
            element={
              <ModalPage>
                <OrderInfo />
              </ModalPage>
            }
          />
        </Route>
      </Routes>
      {background && (
        <Routes>
          <Route
            path='/feed/:number'
            element={<ModalWrapper onClose={closeModal} />}
          >
            <Route index element={<OrderInfo />} />
          </Route>
          <Route
            path='ingredients/:id'
            element={
              <Modal title='Детали ингридиента' onClose={closeModal}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route path='profile/orders/:number' element={<ProtectedRoute />}>
            <Route
              index
              element={
                <ModalWrapper onClose={closeModal}>
                  <OrderInfo />
                </ModalWrapper>
              }
            />
          </Route>
        </Routes>
      )}
    </div>
  );
};

export default App;
