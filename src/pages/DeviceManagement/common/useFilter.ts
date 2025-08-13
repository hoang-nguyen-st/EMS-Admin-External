import { debounce } from 'lodash';
import { Dispatch, SetStateAction } from 'react';

import { DeviceProps } from '@app/interface/device.interface';

export const handleSearchChange = (
  value: string,
  setFilters: Dispatch<SetStateAction<DeviceProps>>,
) => {
  setFilters((prev) => ({
    ...prev,
    search: value,
    page: 1,
  }));
};

export const handleFilterChange = <DeviceKey extends keyof DeviceProps>(
  key: DeviceKey,
  value: DeviceProps[DeviceKey],
  setFilters: Dispatch<SetStateAction<DeviceProps>>,
) => {
  setFilters((prev) => ({
    ...prev,
    [key]: value,
    ...(key !== 'page' && { page: 1 }),
  }));
};

export const handleSearchDevice = debounce(handleSearchChange, 500);
