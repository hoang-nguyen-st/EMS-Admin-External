import { DeviceLocationResponseProps } from './location.interface';
import { DeviceMeterTypeResponseProps } from './meterType.interface';
import { DeviceType, VoltageUnitEnum } from '@app/constants';

export interface DeviceProps {
  search?: string;
  status?: boolean;
  deviceType?: DeviceType;
  page: number;
  take: number;
  location?: string;
}

export interface DeviceTotalTypeProps {
  type: string;
  count: number;
}

export interface DeviceResponseProps {
  id: string;
  devEUI: string;
  name: string;
  deviceType: DeviceType;
  fieldCalculate: string;
  status: boolean | string;
  meterType: DeviceMeterTypeResponseProps;
  voltageUnit: VoltageUnitEnum;
  voltageValue: string;
  location: DeviceLocationResponseProps;
}

export interface DeviceModalData {
  id: string;
  name: string;
  devEUI?: string;
  deviceType?: string;
  fieldCalculate?: string;
  voltageUnit?: string;
  voltageValue?: string;
  meterType?: {
    meterTypeEnum: string;
  };
}
