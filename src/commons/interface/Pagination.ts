export interface PaginationResponse<T> {
  data: T[];
  page: number;
  lastPage: number;
  perPage: number;
  total: number;
}
