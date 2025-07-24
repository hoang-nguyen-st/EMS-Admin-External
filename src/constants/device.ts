import { TFunction } from 'i18next';

import { VoltageUnitEnum } from './voltage';

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

export const getOptionsDeviceType = (t: TFunction) => {
  return [
    {
      value: DeviceType.ELECTRIC,
      label: t<string>('DEVICE_MANAGEMENT.ELECTRIC'),
    },
    { value: DeviceType.GAS, label: t<string>('DEVICE_MANAGEMENT.GAS') },
    { value: DeviceType.WATER, label: t<string>('DEVICE_MANAGEMENT.WATER') },
  ];
};

export const deviceTypeOptions = [
  { value: DeviceType.ELECTRIC, label: 'DEVICE_MANAGEMENT.ELECTRIC' },
  { value: DeviceType.WATER, label: 'DEVICE_MANAGEMENT.WATER' },
  { value: DeviceType.GAS, label: 'DEVICE_MANAGEMENT.GAS' },
];

export const voltageUnitOptions = [
  { value: VoltageUnitEnum.VOLT, label: 'DEVICE_MANAGEMENT.VOLT' },
  { value: VoltageUnitEnum.KILOVOLT, label: 'DEVICE_MANAGEMENT.KILOVOLT' },
  { value: VoltageUnitEnum.MEGAVOLT, label: 'DEVICE_MANAGEMENT.MEGAVOLT' },
];
