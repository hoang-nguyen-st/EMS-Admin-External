import { GetListParams } from './common.interface';
import { DeviceResponseProps, DeviceWithInitDto } from './device.interface';
import { LocationTypeEnum } from './location-type.interface';
import { MeterType } from './meter-type.interface';
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
  devices: DeviceWithInitDto[];
}

export interface DeviceLocationResponseProps {
  name: string;
}

export interface LocationType {
  id: string;
  name: string;
  description: string;
  isTariffTier: boolean;
  locationTypeEnum: LocationTypeEnum;
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
  meterType: MeterType;
  initialDate: string;
}

export interface LocationFilterProps extends GetListParams {
  search?: string;
  locationTypeId?: string;
}
