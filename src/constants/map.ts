import { t } from 'i18next';

import { MeterTypeEnum } from './enum';

export const timeUsageMap: { [key: string]: string } = {
  mid_peak: t('TIME_USAGE.MID_PEAK'),
  peak: t('TIME_USAGE.PEAK'),
  off_peak: t('TIME_USAGE.OFF_PEAK'),
};

export function formatMeterTypeName(meterTypeEnum: MeterTypeEnum, meterTypeName: string): string {
  if (meterTypeEnum === MeterTypeEnum.METER_TYPE_1) return t('METER_TYPE.METER_TYPE_1');
  if (meterTypeEnum === MeterTypeEnum.METER_TYPE_3) return t('METER_TYPE.METER_TYPE_3');
  return meterTypeName;
}
