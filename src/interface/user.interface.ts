import { GetListParams } from './common.interface';
import { UserStatus } from '@app/constants';

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
  unassigned: boolean;
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

export interface CreateUserDto {
  name: string;
  email: string;
  address: string;
  phone: string;
  dateOfBirth: string;
}

export interface UserTotalStatus {
  status: string;
  count: number;
}

export interface UserSummarizeResponse {
  message: string;
  data: UserTotalStatus[];
  total: number;
}
