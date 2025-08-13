import { useQuery } from '@tanstack/react-query';

import { QUERY_KEY } from '@app/constants';
import { MeterType } from '@app/interface/meter-type.interface';
import { getMeterTypesAPI } from '@app/services/meterTypeAPI';

export const useGetMeterTypes = () =>
  useQuery<{ data: MeterType[] }>(
    [QUERY_KEY.METER_TYPES],
    async () => {
      const { data } = await getMeterTypesAPI();
      return data;
    },
    {
      refetchOnWindowFocus: false,
    },
  );
