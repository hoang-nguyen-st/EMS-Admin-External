export interface ProjectDetail {
  id: string;
  name: string;
  projectType: 'business' | string;
  status: 'active' | string;
  image?: string;
  creationTime: string;
  description?: string;
}
