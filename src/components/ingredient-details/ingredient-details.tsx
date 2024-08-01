import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  ingredientModalDataSelector,
  ingridientsSelector,
  searchIngredientModalData
} from '../../services/slices/UserSlice';
import { useSelector } from '../../services/store/store';

type Params = {
  id: string;
};

export const IngredientDetails: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();
  const params = useParams<Params>() as Params;
  const ingredients = useSelector(ingridientsSelector);
  const ingredientData = useSelector(ingredientModalDataSelector);

  if (ingredients.length !== 0) {
    dispatch(searchIngredientModalData(params.id));
  }

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
