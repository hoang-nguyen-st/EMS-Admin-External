import { useQuery } from '@tanstack/react-query';

import { QUERY_KEY } from '@app/constants';
import { LocationDto } from '@app/interface/location.interface';
import { getLocationAPI } from '@app/services/locationAPI';

export const useGetLocations = () =>
  useQuery<LocationDto[]>([QUERY_KEY.LOCATIONS_ALL], async () => {
    const { data } = await getLocationAPI();
    return data;
  });
