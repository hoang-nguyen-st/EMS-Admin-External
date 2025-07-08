import { debounce } from 'lodash';
import { Dispatch, SetStateAction } from 'react';

import { DeviceType } from '@app/constants';
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

export const handleZoneChange = (
  zone: string,
  setFilters: Dispatch<SetStateAction<DeviceProps>>,
) => {
  setFilters((prev) => ({
    ...prev,
    zone,
    page: 1,
  }));
};

export const handleDeviceChange = (
  deviceType: DeviceType,
  setFilters: Dispatch<SetStateAction<DeviceProps>>,
) => {
  setFilters((prev) => ({
    ...prev,
    deviceType,
    page: 1,
  }));
};

export const handlePageChange = (
  page: number,
  setFilters: Dispatch<SetStateAction<DeviceProps>>,
) => {
  setFilters((prev) => ({
    ...prev,
    page,
  }));
};

export const handleSearchProject = debounce(handleSearchChange, 500);
