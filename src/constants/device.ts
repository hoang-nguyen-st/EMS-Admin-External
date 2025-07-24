import { t, TFunction } from 'i18next';

import { VoltageUnitEnum } from './voltage';

export enum DeviceType {
  DEFAULT = 'default',
  ELECTRIC = 'electric',
  WATER = 'water',
  GAS = 'gas',
  TOTAL = 'total',
}

export const deviceTypeOptionsEnum = [
  {
    key: DeviceType.ELECTRIC,
    value: DeviceType.ELECTRIC,
    label: 'DEVICE_MANAGEMENT.ELECTRIC',
    className: 'border-[#12B76A] text-[#12B76A] border-1',
  },
  {
    key: DeviceType.WATER,
    value: DeviceType.WATER,
    label: 'DEVICE_MANAGEMENT.WATER',
    className: 'border-[#10239E] text-[#10239E] border-1',
  },
  {
    key: DeviceType.GAS,
    value: DeviceType.GAS,
    label: 'DEVICE_MANAGEMENT.GAS',
    className: 'border-[#667085] text-[#667085] border-1',
  },
];

export const getNameDeviceType = (deviceType: DeviceType, t: TFunction) => {
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
export const enum TimestampEnum {
  BY_DAY = 'BY_DAY',
  BY_WEEK = 'BY_WEEK',
  BY_MONTH = 'BY_MONTH',
  BY_QUARTER = 'BY_QUARTER',
}
