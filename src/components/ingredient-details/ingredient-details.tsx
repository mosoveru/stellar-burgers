import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  searchIngredientModalData,
  useSelector
} from '../../services/store/store';
import { ingredientsSelector } from '../../services/slices/IngredientsSlice';
import { setIngredientModalData } from '../../services/slices/ModalDataSlice';

type Params = {
  id: string;
};

export const IngredientDetails: FC = () => {
  const dispatch = useDispatch();
  const params = useParams<Params>() as Params;
  const ingredients = useSelector(ingredientsSelector);
  const ingredientData = useSelector(searchIngredientModalData(params.id));

  if (ingredients.length !== 0) {
    dispatch(setIngredientModalData(ingredientData));
  }

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
