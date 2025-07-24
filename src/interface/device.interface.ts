import { LocationDto } from './location.interface';
import { DeviceType } from '@app/constants';

export interface DeviceProps {
  search?: string;
  status?: boolean;
  deviceType?: DeviceType;
  page: number;
  take: number;
  location?: string;
}

export interface DeviceTotalTypeProps {
  deviceType: string;
  count: number;
}

export interface DeviceResponseProps {
  id: string;
  devEUI: string;
  name: string;
  type: string;
  createdTime: string;
  deviceType: string;
  description: string;
  fieldCalculate: string;
  status: boolean;
  location: LocationDto;
}
