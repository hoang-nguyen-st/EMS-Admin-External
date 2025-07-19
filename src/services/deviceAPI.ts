import axios from 'axios';

import { API_URL } from '@app/constants';
import { DeviceProps } from '@app/interface/device.interface';

export const getDeviceAPI = async (params: DeviceProps) =>
  await axios.get(API_URL.DEVICES, { params });

export const getDeviceSummarizeAPI = async () => await axios.get(API_URL.DEVICES_SUMMARIZE);

export const getDeviceTelemetryKeysAPI = async (deviceId: string) =>
  await axios.get(`${API_URL.DEVICES}/${deviceId}/telemetry-keys`);

export const updateDeviceSettingsAPI = async (
  deviceId: string,
  settings: {
    fieldCalculate: string;
    deviceType: string;
    meterType: string;
    voltageUnit: string;
    voltageValue: string;
  },
) => await axios.post(`${API_URL.DEVICES}/${deviceId}/setting-device`, settings);
