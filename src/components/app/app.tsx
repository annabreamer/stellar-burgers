import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import ProtectedRoute from '../protectedroute/protectedroute';
import { useEffect, useState } from 'react';
import { AppDispatch, useDispatch } from '../../services/store';
import { getUserThunk, init } from '../../services/userSlice';
import { getCookie } from '../../utils/cookie';
import { fetchIngredients } from '../../services/ingredientsSlice';

const App = () => {
  const location = useLocation();
  const background = location.state?.background;
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    const token = getCookie('accessToken');
    if (token) {
      dispatch(getUserThunk());
    } else {
      dispatch(init());
    }
  }, []);

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  return (
    // <BrowserRouter>
    <div className={styles.app}>
      <AppHeader />
      <Routes location={background || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/feed/:number' element={<OrderInfo />} />
        <Route path='/ingredients/:id' element={<IngredientDetails />} />
        <Route path='*' element={<NotFound404 />} />
        <Route
          path='/login'
          element={
            <ProtectedRoute onlyUnAuth>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRoute onlyUnAuth>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders/:number'
          element={
            <ProtectedRoute>
              <OrderInfo />
            </ProtectedRoute>
          }
        />
      </Routes>
      {/* ОТДЕЛЬНЫЕ НОВЫЕ МАРШРУТЫ ДЛЯ МОДАЛОК */}

      {background && (
        <Routes>
          <Route
            path='/feed/:number'
            element={
              <Modal title='Номер заказа' onClose={() => window.history.back()}>
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/ingredients/:id'
            element={
              <Modal
                title='Детали ингредиента'
                onClose={() => window.history.back()}
              >
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <ProtectedRoute>
                <Modal
                  title='Информация о заказе'
                  onClose={() => window.history.back()}
                >
                  <OrderInfo />
                </Modal>
              </ProtectedRoute>
            }
          />
        </Routes>
      )}
    </div>
    // {/* </BrowserRouter> */}
  );
};

export default App;
