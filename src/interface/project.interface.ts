export interface ProjectDetail {
  id: string;
  name: string;
  projectType: 'business' | string;
  status: 'active' | string;
  image: string | null;
  creationTime: string;
  description: string | null;
}
