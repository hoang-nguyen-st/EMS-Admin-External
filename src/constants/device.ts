import { TFunction } from 'i18next';

export enum DeviceType {
  DEFAULT = 'default',
  ELECTRIC = 'electric',
  WATER = 'water',
  GAS = 'gas',
  TOTAL = 'total',
}

export const getNameDeviceType = (deviceType: string, t: TFunction) => {
  switch (deviceType) {
    case DeviceType.WATER:
      return t('DEVICE_MANAGEMENT.WATER');
    case DeviceType.ELECTRIC:
      return t('DEVICE_MANAGEMENT.ELECTRIC');
    case DeviceType.GAS:
      return t('DEVICE_MANAGEMENT.GAS');
    default:
      return;
  }
};
