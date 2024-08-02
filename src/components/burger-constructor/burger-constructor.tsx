import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store/store';
import {
  clearCurrentOrder,
  currentOrderSelector,
  getUserName,
  getUserOrders,
  isOrderRequestPendingSelector,
  orderBurger,
  setOrderRequest
} from '../../services/slices/UserSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  clearConstructor,
  constructorOrderSelector,
  ingredientsIDSelector
} from '../../services/slices/ConstructorSlice';
import { getOrders } from '../../services/slices/OrdersSlice';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const constructorItems = useSelector(constructorOrderSelector);
  const orderRequest = useSelector(isOrderRequestPendingSelector);
  const orderModalData = useSelector(currentOrderSelector);
  const ingredientsIDs = useSelector(ingredientsIDSelector);
  const userName = useSelector(getUserName);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  if (orderModalData) {
    dispatch(getOrders());
    dispatch(getUserOrders());
  }

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (!userName) navigate('/login', { state: { from: location } });
    dispatch(orderBurger(ingredientsIDs));
  };
  const closeOrderModal = () => {
    if (orderRequest) {
      dispatch(setOrderRequest(false));
    } else {
      dispatch(clearCurrentOrder());
      dispatch(clearConstructor());
    }
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
