import { Select, SelectProps } from 'antd';
import { useTranslation } from 'react-i18next';

const StatusSelectCustom = ({ ...props }: SelectProps) => {
  const { t } = useTranslation();

  return (
    <Select
      placeholder={t<string>('DEVICE_MANAGEMENT.STATUS')}
      options={[
        { value: 1, label: t<string>('DEVICE_MANAGEMENT.ACTIVE') },
        { value: 0, label: t<string>('DEVICE_MANAGEMENT.INACTIVE') },
      ]}
      {...props}
    />
  );
};

export default StatusSelectCustom;
