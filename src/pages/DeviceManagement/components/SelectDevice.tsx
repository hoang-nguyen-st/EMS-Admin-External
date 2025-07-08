import { Select } from 'antd';

import { DeviceProps } from '@app/interface/device.interface';
import { ZoneDto } from '@app/interface/zone.interface';

interface OptionDeviceProps {
  value: string;
  label: string;
}

interface SelectDeviceProps {
  handleDeviceChange: (
    value: string,
    setFilters: React.Dispatch<React.SetStateAction<DeviceProps>>,
  ) => void;
  setFilters: React.Dispatch<React.SetStateAction<DeviceProps>>;
  placeholder: string;
  options: OptionDeviceProps[];
  className?: string;
  devices?: DeviceProps[];
  zones?: ZoneDto[];
}

const SelectDevice = ({ ...props }: SelectDeviceProps) => {
  const { handleDeviceChange, setFilters, placeholder, className, options } = props;

  return (
    <Select
      allowClear
      className={`h-10 w-full sm:w-48 ${className}`}
      placeholder={placeholder}
      options={options}
      onChange={(value) => handleDeviceChange(value, setFilters)}
    />
  );
};

export default SelectDevice;
