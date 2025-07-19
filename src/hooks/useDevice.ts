import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

import { openNotificationWithIcon, NotificationTypeEnum } from '@app/components/molecules';
import { QUERY_KEY } from '@app/constants';
import {
  DeviceProps,
  DeviceResponseProps,
  DeviceTotalTypeProps,
} from '@app/interface/device.interface';
import { MetaProps } from '@app/interface/meta.interface';
import {
  getDeviceAPI,
  getDeviceSummarizeAPI,
  getDeviceTelemetryKeysAPI,
  updateDeviceSettingsAPI,
} from '@app/services/deviceAPI';

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
    mutationFn: ({
      deviceId,
      settings,
    }: {
      deviceId: string;
      settings: {
        fieldCalculate: string;
        deviceType: string;
        meterType: string;
        voltageUnit: string;
        voltageValue: string;
      };
    }) => updateDeviceSettingsAPI(deviceId, settings),
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
