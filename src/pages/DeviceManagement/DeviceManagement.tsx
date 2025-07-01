import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { DeviceTable } from './components';
import './DeviceManagement.scss';
import { ResourceType } from '@app/constants';

const DeviceManagement = () => {
  const { t } = useTranslation();
  const [filters, setFilters] = useState({
    search: '',
    deviceType: ResourceType.DEFAULT,
    page: 1,
    take: 10,
  });

  const handleSearchChange = (value: string) => {
    setFilters((prev) => ({
      ...prev,
      search: value,
      page: 1,
    }));
  };

  const handleDeviceChange = (deviceType: ResourceType) => {
    setFilters((prev) => ({
      ...prev,
      deviceType,
      page: 1,
    }));
  };

  return (
    <div className='device-management'>
      <h1>{t<string>('DEVICE_MANAGEMENT.TITLE')}</h1>
      <p className='my-4'>{t('DEVICE_MANAGEMENT.ALL')}</p>
      <div className='bg-white rounded-xl p-8 shadow'>
        <div className='space-y-4'>
          <DeviceTable onSearchChange={handleSearchChange} onDeviceChange={handleDeviceChange} />
        </div>
      </div>
    </div>
  );
};

export default DeviceManagement;
