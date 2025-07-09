import { useQuery } from '@tanstack/react-query';

import { QUERY_KEY } from '@app/constants';
import {
  DeviceProps,
  DeviceResponseProps,
  DeviceTotalTypeProps,
} from '@app/interface/device.interface';
import { MetaProps } from '@app/interface/meta.interface';
import { getDeviceAPI, getDeviceSummarizeAPI } from '@app/services/deviceAPI';

export const useGetDevices = (params: DeviceProps) =>
  useQuery<{ data: DeviceResponseProps[]; meta: MetaProps }>(
    [QUERY_KEY.DEVICES, params.search, params.status, params.deviceType],
    async () => {
      const { data } = await getDeviceAPI(params);
      return data;
    },
  );

export const useGetDeviceSummarize = () =>
  useQuery<DeviceTotalTypeProps[]>([QUERY_KEY.DEVICES_SUMMARIZE], async () => {
    const { data } = await getDeviceSummarizeAPI();
    return data.data;
  });
