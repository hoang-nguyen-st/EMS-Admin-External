import { GetListParams } from './common.interface';
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

export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export interface GetUsersParams extends GetListParams {
  search: string;
  status?: UserStatus;
  startDate?: string | null;
  endDate?: string | null;
}

export interface UserDetailProject {
  id: string;
  createdAt: string;
  createdBy: string | null;
  updatedAt: string;
  updatedBy: string | null;
  deletedAt: string | null;
  deletedBy: string | null;
  email: string;
  phone: string;
  password: string | null;
  status: 'inactive' | string;
  name: string;
  dateOfBirth: string | null;
  address: string | null;
  identityId: string | null;
  refreshToken: string | null;
  avatar: string | null;
  projectUsers: ProjectUserDetail[];
  projectsCount: number;
}
