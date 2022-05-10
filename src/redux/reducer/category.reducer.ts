import { Category, CategoryType } from '../../commons/interface/schemas/Category';
import { AnyAction } from 'redux';

const CATEGORY_TYPES = {
  LOAD: '[Category] load',
};

export interface CategoryReducer {
  categories: Category[];
  incomeCategories: Category[];
  expenseCategories: Category[];
}

const initialState: CategoryReducer = {
  categories: [],
  incomeCategories: [],
  expenseCategories: [],
};

export const loadCategoriesReducer = (categories: Category[]) => ({
  type: CATEGORY_TYPES.LOAD,
  payload: categories,
});

export default function categoryReducer(state = initialState, action: AnyAction) {
  const { type, payload } = action;

  switch (type) {
    case CATEGORY_TYPES.LOAD: {
      const incomeCategories = payload.filter((i: Category) => i.type === CategoryType.INCOME);
      const expenseCategories = payload.filter((i: Category) => i.type === CategoryType.EXPENSES);
      return {
        categories: payload,
        incomeCategories,
        expenseCategories,
      };
    }
    default:
      return state;
  }
}
