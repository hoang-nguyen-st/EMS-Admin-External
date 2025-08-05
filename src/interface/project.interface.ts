import { UserStatus } from '@app/constants';
import { ProjectType } from '@app/constants/project';
export interface ProjectDetail {
  id: string;
  name: string;
  projectType: ProjectType;
  status: UserStatus;
  image?: string;
  creationTime: string;
  description?: string;
}
