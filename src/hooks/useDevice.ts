import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

import { openNotificationWithIcon, NotificationTypeEnum } from '@app/components/molecules';
import { QUERY_KEY, TimestampEnum } from '@app/constants';
import {
  DetailDeviceProps,
  DeviceProps,
  DeviceResponseProps,
  DeviceSettingProps,
  DeviceTelemetryEnergyImportInfo,
  DeviceTotalTypeProps,
  DeviceWithTimeSeries,
} from '@app/interface/device.interface';
import { MetaProps } from '@app/interface/meta.interface';
import {
  getDeviceTelemetryKeysAPI,
  updateDeviceSettingsAPI,
  getDetailDeviceAPI,
  getDeviceAPI,
  getDeviceSummarizeAPI,
  getElectricityConsumptionAPI,
  getDeviceByIdsAPI,
  getUnassignedDevices,
} from '@app/services/deviceAPI';

export const useGetDevices = (params: DeviceProps) =>
  useQuery<{ data: DeviceResponseProps[]; meta: MetaProps }>(
    [QUERY_KEY.DEVICES, params.search, params.status, params.deviceType],
    async () => {
      const { data } = await getDeviceAPI(params);
      return data;
    },
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  );

export const useGetDeviceSummarize = () =>
  useQuery<DeviceTotalTypeProps[]>([QUERY_KEY.DEVICES_SUMMARIZE], async () => {
    const { data } = await getDeviceSummarizeAPI();
    return data.data;
  });

export const useGetDeviceTelemetryKeys = (deviceId?: string, enabled = false) =>
  useQuery<string[]>(
    [QUERY_KEY.DEVICE_TELEMETRY_KEYS, deviceId],
    async () => {
      const { data } = await getDeviceTelemetryKeysAPI(deviceId!);
      return data.data;
    },
    {
      enabled: enabled && !!deviceId,
    },
  );

export const useUpdateDeviceSettings = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  return useMutation({
    mutationFn: ({ deviceId, settings }: { deviceId: string; settings: DeviceSettingProps }) =>
      updateDeviceSettingsAPI(deviceId, settings),
    onSuccess: ({ data }) => {
      openNotificationWithIcon(
        NotificationTypeEnum.SUCCESS,
        t(data.message || 'DEVICE_MANAGEMENT.UPDATE_DEVICE_SUCCESS'),
      );
      queryClient.invalidateQueries([QUERY_KEY.DEVICES]);
    },
    onError: () => {
      openNotificationWithIcon(
        NotificationTypeEnum.ERROR,
        t('DEVICE_MANAGEMENT.UPDATE_DEVICE_ERROR'),
      );
    },
  });
};
export const useGetElectricityConsumption = (
  deviceThingsboardId: string,
  interval: TimestampEnum,
) =>
  useQuery<DeviceTelemetryEnergyImportInfo>(
    [QUERY_KEY.ELECTRICITY_CONSUMPTION, deviceThingsboardId, interval],
    async () => {
      const { data } = await getElectricityConsumptionAPI(deviceThingsboardId, interval);
      return data;
    },
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  );

export const useGetDetailDevice = (deviceThingsboardId: string) =>
  useQuery<DetailDeviceProps>(
    [QUERY_KEY.DETAIL_DEVICE, deviceThingsboardId],
    async () => {
      const { data } = await getDetailDeviceAPI(deviceThingsboardId);
      return data.data;
    },
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  );

export const useGetUnassignedDevices = (params: DeviceProps) =>
  useQuery<{ data: DeviceResponseProps[]; meta: MetaProps }>(
    [QUERY_KEY.UNASSIGNED_DEVICES],
    async () => {
      const { data } = await getUnassignedDevices(params);
      return data;
    },
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  );
export const useGetDeviceByIds = (deviceIds: string[], enabled = false) =>
  useQuery<{ data: DeviceWithTimeSeries[]; meta: MetaProps }>(
    [QUERY_KEY.DEVICE_BY_IDS, deviceIds],
    async () => {
      const { data } = await getDeviceByIdsAPI(deviceIds);
      return data;
    },
    {
      enabled: enabled && deviceIds && deviceIds.length > 0,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  );
