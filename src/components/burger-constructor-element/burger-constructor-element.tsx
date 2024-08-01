import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { useDispatch } from '../../services/store/store';
import {
  moveIngredient,
  removeIngredient
} from '../../services/slices/UserSlice';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch();
    const handleMoveDown = () => {
      dispatch(moveIngredient({ number: index, direction: 'down' }));
    };

    const handleMoveUp = () => {
      dispatch(moveIngredient({ number: index, direction: 'up' }));
    };

    const handleClose = () => {
      dispatch(removeIngredient(String(index)));
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
