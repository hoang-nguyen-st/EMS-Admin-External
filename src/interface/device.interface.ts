import { GetListParams } from './common.interface';
import { DeviceLocationResponseProps } from './location.interface';
import { DeviceMeterTypeResponseProps } from './meterType.interface';
import { DeviceType, MeterTypeEnum, VoltageUnitEnum } from '@app/constants';

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
  meterType: DeviceMeterTypeResponseProps;
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
  meterType?: {
    meterTypeEnum: MeterTypeEnum;
  };
}

export interface DeviceSettingProps {
  fieldCalculate: string;
  deviceType: string;
  meterType: string;
  voltageUnit: string;
  voltageValue: string;
}

export interface DeviceTelemetryEnergyImportInfo {
  data_active_energy_import: TelemetryTimeSeriesDto[];
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
  attributes: ExternalDeviceAttribute[];
  lastestTimeSeriesValue: TelemetryTimeSeriesResponse;
}
