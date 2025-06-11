export interface Project {
  id: string;
  name: string;
  image?: string;
  description?: string;
  projectType: string;
  status: string;
  creationTime: string;
}

export interface Pagination {
  page: number;
  take: number;
  itemCount: number;
  pageCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface ProjectFilters {
  search?: string;
  projectType: 'business' | 'production' | 'residential';
  page: number;
  startDate?: string;
  endDate?: string;
  take?: number;
}
