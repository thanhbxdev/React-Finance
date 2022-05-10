import { Category } from './Category';

export enum StreamType {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE',
}

export interface Stream {
  _id: string;
  time: number | null;
  amount: number;
  fee: number;
  title: string | null;
  description: string | null;
  category: Category;
  type: StreamType;
  createdAt: number;
  updatedAt: number | null;
}
