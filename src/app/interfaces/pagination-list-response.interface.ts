export interface PaginationListResponse<T, C> {
  elements: T[];
  total: number;
  qp: C;
}
