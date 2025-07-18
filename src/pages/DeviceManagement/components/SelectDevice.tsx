import { Select } from 'antd';
import { Dispatch, FC, SetStateAction } from 'react';

import { DeviceProps } from '@app/interface/device.interface';

interface OptionDeviceProps {
  value: string;
  label: string;
}

interface SelectDeviceProps {
  handleDeviceChange: (value: string, setFilters: Dispatch<SetStateAction<DeviceProps>>) => void;
  setFilters: Dispatch<SetStateAction<DeviceProps>>;
  placeholder: string;
  options: OptionDeviceProps[];
  className?: string;
}

const SelectDevice: FC<SelectDeviceProps> = ({
  handleDeviceChange,
  setFilters,
  placeholder,
  className,
  options,
}) => {
  return (
    <Select
      allowClear
      className={`w-full h-10 ${className}`}
      placeholder={placeholder}
      options={options}
      onChange={(value) => handleDeviceChange(value, setFilters)}
    />
  );
};

export default SelectDevice;
