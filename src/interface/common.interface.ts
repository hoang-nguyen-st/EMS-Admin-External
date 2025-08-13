export interface GetListParams {
  search?: string;
  page: number;
  take: number;
}

export interface ApiResponse<T> {
  data: T;
  message: string;
}
