import axios from 'axios';

import { API_URL } from '@app/constants';
import { DeviceProps } from '@app/interface/device.interface';

export const getDeviceAPI = async (params: DeviceProps) =>
  await axios.get(API_URL.DEVICES, { params });

export const getDeviceSummarizeAPI = async () => await axios.get(API_URL.DEVICES_SUMMARIZE);
