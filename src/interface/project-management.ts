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

export enum ProjectType {
  BUSINESS = 'business',
  PRODUCTION = 'production',
  RESIDENTIAL = 'residential',
}

export interface ProjectFilters {
  search?: string;
  projectType: ProjectType;
  page: number;
  startDate?: string;
  endDate?: string;
  take?: number;
}
