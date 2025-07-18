import { useQuery } from '@tanstack/react-query';

import { QUERY_KEY } from '@app/constants';
import { ZoneDto } from '@app/interface/zone.interface';
import { getZoneAPI } from '@app/services/zoneAPI';

export const useGetZones = () =>
  useQuery<ZoneDto[]>([QUERY_KEY.ZONES], async () => {
    const { data } = await getZoneAPI();
    return data;
  });
