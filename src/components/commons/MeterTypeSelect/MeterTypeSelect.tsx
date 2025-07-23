import { Select, SelectProps } from 'antd';
import { useTranslation } from 'react-i18next';

import { useGetMeterTypes } from '@app/hooks/useMeterType';

const MeterTypeSelect = ({ ...props }: SelectProps) => {
  const { data: meterTypes } = useGetMeterTypes();
  const { t } = useTranslation();
  return (
    <Select
      placeholder={t<string>('LOCATION.LOCATION_TYPE_PLACEHOLDER')}
      options={meterTypes?.data.map((meterType) => ({
        label: meterType.name,
        value: meterType.id,
      }))}
      {...props}
    />
  );
};

export default MeterTypeSelect;
