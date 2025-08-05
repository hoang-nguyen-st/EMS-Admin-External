import { GetListParams } from './common.interface';
import {
  DeviceResponseProps,
  DeviceWithInitDto,
  EditDeviceResponseProps,
} from './device.interface';
import { LocationTypeEnum } from './location-type.interface';
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
  priceTypeId: string;
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

export interface PriceType {
  id: string;
  name: string;
  priceTypeEnum: string;
  description: string | null;
}

export interface Workspace {
  id: string;
  name: string;
}

export interface LocationDevice {
  id: string;
  initialIndex: string;
  currentIndex: string | null;
  device: {
    id: string;
    name: string;
    devEUI: string;
    deviceType: string;
    description: string;
    fieldCalculate: string;
    voltageUnit: string;
    voltageValue: string;
    status: boolean;
    priceType: any;
  };
}

export interface DeviceWithLatestValue {
  device: {
    id: string;
    name: string;
    devEUI: string;
    deviceType: string;
    description: string;
    fieldCalculate: string;
    voltageUnit: string;
    voltageValue: string;
    status: boolean;
    priceType: any;
  };
  lastestTimeSeriesValue: string;
}

export interface LocationResponseDto {
  id: string;
  name: string;
  status: string;
  initialDate: string | null;
  description: string | null;
  locationType: LocationType;
  workspace: Workspace;
  user: UserDetail;
  priceType: PriceType | null;
  locationDevices: LocationDevice[];
}

export interface EditLocationResponseDto {
  id: string;
  createdAt: string;
  createdBy: string | null;
  updatedAt: string;
  updatedBy: string | null;
  deletedAt: string | null;
  deletedBy: string | null;
  name: string;
  status: string;
  initialDate: string;
  description: string | null;
  locationType: LocationType;
  user: UserDetail;
  priceType: PriceType | null;
  locationDevices: LocationDevice[];
  devices: DeviceWithLatestValue[];
}

export interface LocationFilterProps extends GetListParams {
  search?: string;
  locationTypeId?: string;
}
