import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { NotificationTypeEnum, openNotificationWithIcon } from '@app/components/molecules';
import { NAVIGATE_URL, QUERY_KEY } from '@app/constants';
import {
  CreateLocationDto,
  EditLocationResponseDto,
  LocationDto,
  LocationFilterProps,
  LocationResponseDto,
  PriceType,
} from '@app/interface/location.interface';
import { MetaProps } from '@app/interface/meta.interface';
import {
  createLocationAPI,
  getAllLocationAPI,
  getLocationAPI,
  getLocationByIdAPI,
  updateLocationAPI,
  getPriceTypesAPI,
} from '@app/services/locationAPI';

export const useGetLocations = () =>
  useQuery<LocationDto[]>([QUERY_KEY.LOCATIONS_ALL], async () => {
    const { data } = await getLocationAPI();
    return data;
  });

export const useGetAllLocations = (params: LocationFilterProps) =>
  useQuery<{ data: LocationResponseDto[]; meta: MetaProps }>(
    [QUERY_KEY.LOCATIONS],
    async () => {
      const { data } = await getAllLocationAPI(params);
      return data;
    },
    {
      refetchOnWindowFocus: false,
    },
  );
export const useCreateLocation = () => {
  const navigate = useNavigate();
  return useMutation(
    async (locationData: CreateLocationDto) => {
      const { data } = await createLocationAPI(locationData);
      return data;
    },
    {
      onSuccess: ({ message }) => {
        openNotificationWithIcon(NotificationTypeEnum.SUCCESS, message);
        navigate(NAVIGATE_URL.LOCATION);
      },
      onError({ response }) {
        openNotificationWithIcon(NotificationTypeEnum.ERROR, response.data.message);
      },
    },
  );
};

export const useGetLocationById = (id: string) =>
  useQuery<EditLocationResponseDto>([QUERY_KEY.LOCATIONS, id], async () => {
    const { data } = await getLocationByIdAPI(id);
    return data.data;
  });

export const useUpdateLocation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: { id: string; data: CreateLocationDto }) => {
      const { data } = await updateLocationAPI(params.id, params.data);
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries([QUERY_KEY.LOCATIONS]);
      openNotificationWithIcon(NotificationTypeEnum.SUCCESS, data.message);
    },
    onError({ response }) {
      openNotificationWithIcon(NotificationTypeEnum.ERROR, response.data.message);
    },
  });
};

export const useGetPriceTypes = () =>
  useQuery<PriceType[]>([QUERY_KEY.PRICE_TYPES], async () => {
    const { data } = await getPriceTypesAPI();
    return data.data;
  });
