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
  initialDate?: string;
  locationDevice?: LocationDeviceResponseProps;
}

export interface EditDeviceResponseProps {
  device: DeviceResponseProps;
  lastestTimeSeriesValue?: string;
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

export interface DeviceTelemetryEnergyImportInfo {
  data: TelemetryTimeSeriesDto[];
}

export interface TelemetryTimeSeriesDto {
  ts: number;
  value: string;
}

export interface ExternalDeviceAttribute {
  key: string;
  value: string;
  lastUpdateTs: number;
}

export type TelemetryTimeSeriesResponse = {
  [key: string]: TelemetryTimeSeriesDto[];
};

export interface DetailDeviceProps {
  device: DeviceResponseProps;
  lastestTimeSeriesValue: string;
}

export interface DetailDeviceSettingProps {
  device: DeviceResponseProps;
  lastestTimeSeriesValue: TelemetryTimeSeriesResponse;
}

export interface DeviceWithInitDto {
  deviceId: string;
  initialIndex: number;
}

export interface LocationDeviceResponseProps {
  id: string;
  initialIndex: number;
}
