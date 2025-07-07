import axios from 'axios';

import { API_URL } from '@app/constants';
import { deviceProps } from '@app/interface/device.interface';

export const getDeviceAPI = async (params: deviceProps) =>
  await axios.get(API_URL.DEVICES, { params });
