import { GetListParams } from './common.interface';
import { DeviceLocationResponseProps } from './location.interface';
import { DeviceType, VoltageUnitEnum } from '@app/constants';

export interface DeviceProps extends GetListParams {
  status?: boolean | null;
  deviceType?: DeviceType | null;
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
  locationName: string;
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

// New interfaces for detailed device response
export interface LocationDevice {
  id: string;
  initialIndex: string;
  currentIndex: string;
  location: {
    id: string;
    name: string;
    status: string;
    initialDate: string;
    description: string | null;
  };
}

export interface DetailedDeviceResponse {
  id: string;
  createdAt: string;
  createdBy: string | null;
  updatedAt: string;
  updatedBy: string | null;
  deletedAt: string | null;
  deletedBy: string | null;
  devEUI: string;
  name: string;
  deviceType: string;
  description: string;
  fieldCalculate: string;
  voltageUnit: string;
  voltageValue: string;
  status: boolean;
  meterType: string | null;
  locationDevices: LocationDevice[];
  locationName: string;
}

export interface TimeSeriesValue {
  ts: number;
  value: string;
}

export interface LatestTimeSeriesValue {
  [key: string]: TimeSeriesValue[];
}

export interface DetailDeviceResponse {
  data: {
    device: DetailedDeviceResponse;
    lastestTimeSeriesValue: LatestTimeSeriesValue;
  };
  message: string;
}
