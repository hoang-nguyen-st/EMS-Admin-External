import { GetListParams } from './common.interface';
import { DeviceLocationResponseProps } from './location.interface';
import { DeviceType, VoltageUnitEnum } from '@app/constants';

export interface DeviceProps extends GetListParams {
  status?: boolean;
  deviceType?: DeviceType;
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
  deviceType: DeviceType;
  fieldCalculate: string;
  status: boolean | string;
  voltageUnit: VoltageUnitEnum;
  voltageValue: string;
  location: DeviceLocationResponseProps;
}

export interface DeviceModalData {
  id: string;
  name: string;
  devEUI?: string;
  deviceType?: DeviceType;
  fieldCalculate?: string;
  voltageUnit?: VoltageUnitEnum;
  voltageValue?: string;
}

export interface DeviceSettingProps {
  fieldCalculate: string;
  deviceType: string;
  voltageUnit: string;
  voltageValue: string;
}
