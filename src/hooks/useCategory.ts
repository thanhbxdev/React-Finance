import { CategoryReducer, loadCategoriesReducer } from '../redux/reducer/category.reducer';
import { useDispatch, useSelector } from 'react-redux';
import { AppReducer } from '../redux/reducer';
import { useCallback, useEffect } from 'react';
import CategoryService from '../services/category.service';

interface UseCategory extends CategoryReducer {
  loadCategories(): void;
}

export default function useCategory(): UseCategory {
  const { categories, expenseCategories, incomeCategories } = useSelector((state: AppReducer) => state.category);
  const { monthSelected } = useSelector((state: AppReducer) => state.time);
  const dispatch = useDispatch();

  const loadCategories = useCallback(() => {
    CategoryService.all(monthSelected).then(res => {
      dispatch(loadCategoriesReducer(res || []));
    });
    // eslint-disable-next-line
  }, [monthSelected]);

  useEffect(() => {
    loadCategories();
    // eslint-disable-next-line
  }, []);
  return { categories, incomeCategories, expenseCategories, loadCategories };
}
