import axios from 'axios';

import { API_URL, TimestampEnum } from '@app/constants';
import { DeviceProps, DeviceSettingProps } from '@app/interface/device.interface';

export const getDeviceAPI = async (params: DeviceProps) =>
  await axios.get(API_URL.DEVICES, { params });

export const getDeviceSummarizeAPI = async () => await axios.get(API_URL.DEVICES_SUMMARIZE);

export const getDeviceTelemetryKeysAPI = async (deviceId: string) =>
  await axios.get(`${API_URL.DEVICES}/${deviceId}/telemetry-keys`);

export const updateDeviceSettingsAPI = async (deviceId: string, settings: DeviceSettingProps) =>
  await axios.post(`${API_URL.DEVICES}/${deviceId}/setting-device`, settings);

export const getElectricityConsumptionAPI = async (
  deviceThingsboardId: string,
  interval: TimestampEnum,
) =>
  await axios.get(`${API_URL.ELECTRICITY_CONSUMPTION}/${deviceThingsboardId}`, {
    params: {
      interval,
    },
  });

export const getDetailDeviceAPI = async (deviceThingsboardId: string) =>
  await axios.get(`${API_URL.DETAIL_DEVICE}/${deviceThingsboardId}`);

export const getDeviceByIdsAPI = async (deviceIds: string[]) => {
  const query = deviceIds.join(',');
  return await axios.get(`${API_URL.DEVICE_BY_IDS}?ids=${query}`);
};

export const getUnassignedDevices = async (params: DeviceProps) => {
  return await axios.get(`${API_URL.UNASSIGNED_DEVICES}`, { params });
};
