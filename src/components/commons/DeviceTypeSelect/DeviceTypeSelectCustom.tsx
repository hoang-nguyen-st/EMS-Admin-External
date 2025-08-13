import { Select, SelectProps } from 'antd';
import { useTranslation } from 'react-i18next';

import { getOptionsDeviceType } from '@app/constants';

const DeviceTypeSelectCustom = ({ ...props }: SelectProps) => {
  const { t } = useTranslation();

  return (
    <Select
      placeholder={t<string>('DEVICE_MODAL.SELECT_STATUS')}
      options={getOptionsDeviceType(t)}
      {...props}
    />
  );
};

export default DeviceTypeSelectCustom;
