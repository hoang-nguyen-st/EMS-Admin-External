import { useQuery } from '@tanstack/react-query';

import { QUERY_KEY } from '@app/constants';
import { LocationTypeNames } from '@app/interface/location-type.interface';
import { getLocationTypeNamesAPI } from '@app/services/locationTypeAPI';

export const useGetLocationTypeNames = () =>
  useQuery<{ data: LocationTypeNames[] }>(
    [QUERY_KEY.LOCATION_TYPES],
    async () => {
      const { data } = await getLocationTypeNamesAPI();
      return data;
    },
    {
      refetchOnWindowFocus: false,
    },
  );
