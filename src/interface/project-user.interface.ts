import { ProjectDetail } from '@app/interface/project.interface';

export interface ProjectUserDetail {
  id: string;
  role: string;
  project: ProjectDetail;
}
