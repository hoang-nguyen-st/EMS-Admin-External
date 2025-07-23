import { GetListParams } from './common.interface';
import { DeviceResponseProps } from './device.interface';
import { LocationType } from './location-type.interface';
import { UserDetail } from './user.interface';

export interface LocationDto {
  id: string;
  name: string;
  status: string;
  locationType: string;
}

export interface CreateLocationDto {
  name: string;
  locationTypeId: string;
  meterTypeId: string;
  initialDate: string;
  description?: string;
  userId: string;
  deviceIds: string[];
}

export interface DeviceLocationResponseProps {
  name: string;
}

export interface LocationResponseDto {
  id: string;
  name: string;
  locationType: LocationType;
  description: string;
  createdAt: string;
  updatedAt: string;
  user: UserDetail;
  devices: DeviceResponseProps[];
}

export interface LocationFilterProps extends GetListParams {
  search?: string;
  locationTypeId?: string;
}
