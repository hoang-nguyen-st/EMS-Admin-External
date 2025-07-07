import { Zone } from './zone.interface';
import { DeviceType } from '@app/constants';

export interface deviceProps {
  search?: string;
  status?: boolean;
  deviceType?: DeviceType;
  page: number;
  take: number;
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
  zone: Zone;
}
