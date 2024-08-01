import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store/store';
import {
  constructorOrderSelector,
  getUserName,
  ingredientsIDSelector,
  isOrderRequestPendingSelector,
  orderBurger,
  orderModalDataSelector,
  removeModalData,
  setOrderRequest
} from '../../services/slices/UserSlice';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const constructorItems = useSelector(constructorOrderSelector);

  const orderRequest = useSelector(isOrderRequestPendingSelector);

  const orderModalData = useSelector(orderModalDataSelector);

  const ingredientsIDs = useSelector(ingredientsIDSelector);

  const userName = useSelector(getUserName);

  const dispatch = useDispatch();

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest || !userName) return;
    dispatch(orderBurger(ingredientsIDs));
  };
  const closeOrderModal = () => {
    if (orderRequest) {
      dispatch(setOrderRequest(false));
    } else {
      dispatch(removeModalData());
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
