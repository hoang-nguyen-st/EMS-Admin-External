import { useQuery } from '@tanstack/react-query';

import { QUERY_KEY } from '@app/constants';
import { LocationDto, LocationResponseDto } from '@app/interface/location.interface';
import { MetaProps } from '@app/interface/meta.interface';
import { getAllLocationAPI, getLocationAPI } from '@app/services/locationAPI';

export const useGetLocations = () =>
  useQuery<LocationDto[]>([QUERY_KEY.LOCATIONS], async () => {
    const { data } = await getLocationAPI();
    return data;
  });

export const useGetAllLocations = () =>
  useQuery<{ data: LocationResponseDto[]; meta: MetaProps }>(
    [QUERY_KEY.LOCATIONS],
    async () => {
      const { data } = await getAllLocationAPI();
      return data;
    },
    {
      refetchOnWindowFocus: false,
    },
  );
