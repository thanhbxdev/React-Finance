export enum CategoryFeeTypes {
  PERCENT = 'PERCENT',
  AMOUNT = 'AMOUNT',
}

export enum CategoryType {
  INCOME = 'INCOME',
  EXPENSES = 'EXPENSE',
}

export interface Category {
  _id: string;
  name: string;
  fee: number;
  feeType: CategoryFeeTypes;
  type: CategoryType;
  estimate: number;
  total: number;
  difference: number;
}
