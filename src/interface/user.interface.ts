import { Dayjs } from 'dayjs';

import { GetListParams } from './common.interface';
import { UserStatus } from '@app/constants';
import { ProjectUserDetail } from '@app/interface/project-user.interface';

export interface UserColumns {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: string;
  address: string;
  avatar?: string;
  dateOfBirth: string;
  identityId: string;
  createdAt: string;
}

export interface Credentials {
  email: string;
  password: string;
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  address: string;
  gender: string;
  identityId: string;
  avatar: string;
  permissions: string[];
}

export interface UserDetail {
  id: number;
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  address: string;
  gender: string;
  identityId: string;
  avatar: string;
}

export interface ChangePassword {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface UserCreateParams {
  name: string;
  password: string;
  email: string;
  phone: string;
  address: string;
  gender: string;
  identityId: string;
  dateOfBirth: string;
}

export interface AssignPermissionParams {
  id: number;
  role: number;
  permissions: number[];
}

export interface GetUsersParams extends GetListParams {
  search: string;
  status?: UserStatus;
  startDate?: string;
  endDate?: string;
}

export interface UserDetailProject {
  id: string;
  createdAt: string;
  createdBy?: string;
  updatedAt: string;
  updatedBy?: string;
  deletedAt?: string;
  deletedBy?: string;
  email: string;
  phone: string;
  status: UserStatus;
  name: string;
  dateOfBirth?: string;
  address?: string;
  identityId?: string;
  avatar?: string;
  projectUsers: ProjectUserDetail[];
  projectsCount: number;
}
