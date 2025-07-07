import { useQuery } from '@tanstack/react-query';

import { QUERY_KEY } from '@app/constants';
import { deviceProps } from '@app/interface/device.interface';
import { getDeviceAPI } from '@app/services/deviceAPI';

export const useGetDevices = (params: deviceProps) =>
  useQuery([QUERY_KEY.DEVICES, params.search, params.status, params.deviceType], async () => {
    const { data } = await getDeviceAPI(params);
    return data;
  });
