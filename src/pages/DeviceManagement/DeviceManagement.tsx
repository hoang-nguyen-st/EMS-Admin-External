import { Button, Input, Table, Pagination } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { Edit, Search, Barcode, Flame, Droplet, Cable, SlidersHorizontal } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { handleFilterChange, handleSearchDevice } from './common/useFilter';
import { DeviceModal } from './components';
import SelectDevice from './components/SelectDevice';
import { DeviceType, getNameDeviceType, NAVIGATE_URL } from '@app/constants';
import { useGetDevices, useGetDeviceSummarize } from '@app/hooks/useDevice';
import { useGetLocations } from '@app/hooks/useLocation';
import { DeviceResponseProps, DeviceProps } from '@app/interface/device.interface';
import { LocationDto } from '@app/interface/location.interface';

import './DeviceManagement.scss';

const DeviceManagement = () => {
  const { t } = useTranslation();
  const { data: locationsData } = useGetLocations();
  const { data: deviceSummarize } = useGetDeviceSummarize();
  const [filters, setFilters] = useState<DeviceProps>({
    search: '',
    deviceType: DeviceType.DEFAULT,
    page: 1,
    take: 10,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    data: devicesResponse,
    refetch: refetchDevices,
    isLoading: isLoadingDevices,
  } = useGetDevices(filters);
  const { data: devicesData, meta } = devicesResponse || {};

  const devices =
    devicesData?.map((device: DeviceResponseProps) => ({
      ...device,
      key: device.id,
    })) ?? [];

  useEffect(() => {
    refetchDevices();
  }, [filters, refetchDevices]);

  const columns: ColumnsType<DeviceResponseProps> = [
    {
      title: t('DEVICE_MANAGEMENT.INDEX'),
      dataIndex: 'no',
      key: 'no',
      render: (_, __, index) => index + 1,
    },
    {
      title: t('DEVICE_MANAGEMENT.NAME'),
      dataIndex: 'name',
      key: 'name',
      render: (_, record) => {
        return (
          <Link
            className='underline underline-offset-2 text-primary hover:underline'
            to={`${NAVIGATE_URL.DEVICE_MANAGEMENT}/${record.id}`}
            replace={true}
          >
            {record.name}
          </Link>
        );
      },
    },
    {
      title: t('DEVICE_MANAGEMENT.DEVICE_ID'),
      dataIndex: 'devEUI',
      key: 'devEUI',
      render: (value: string) => value,
    },
    {
      title: t('DEVICE_MANAGEMENT.LOCATION'),
      dataIndex: 'location',
      key: 'location',
      render: (_, record) => {
        return record.location && record.location.name;
      },
    },
    {
      title: t('DEVICE_MANAGEMENT.FIELD'),
      dataIndex: 'fieldCalculate',
      key: 'fieldCalculate',
      render: (value: string) => value,
    },
    {
      title: t('DEVICE_MANAGEMENT.DEVICE_TYPE'),
      dataIndex: 'deviceType',
      key: 'deviceType',
      render: (value: string) => <span>{getNameDeviceType(value, t)}</span>,
    },
    {
      title: t('DEVICE_MANAGEMENT.STATUS'),
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <span
          className={`px-4 py-2 rounded-2xl ${
            status ? 'bg-[#28a745] text-white' : 'bg-[#ff41411e] text-red-500'
          }`}
        >
          {status ? t('DEVICE_MANAGEMENT.ACTIVE') : t('DEVICE_MANAGEMENT.INACTIVE')}
        </span>
      ),
    },
    {
      title: t('DEVICE_MANAGEMENT.ACTION'),
      key: 'actions',
      render: () => (
        <Button
          className='text-center !bg-transparent shadow-none border-none'
          onClick={() => setIsModalOpen(true)}
        >
          <SlidersHorizontal className='text-lg' />
        </Button>
      ),
      className: '!text-center',
      fixed: 'right',
    },
  ];

  const getCount = (type: string) => deviceSummarize?.find((d) => d.type === type)?.count || 0;

  const deviceStats = [
    {
      icon: <Barcode className='text-2xl text-black' />,
      title: t('DEVICE_MANAGEMENT.TOTAL_DEVICE'),
      count: getCount(DeviceType.TOTAL),
      bgColor: 'bg-[#F3F5F7]',
    },
    {
      icon: <Cable className='text-2xl text-[#FFD600]' />,
      title: t('DEVICE_MANAGEMENT.ELECTRICITY_DEVICE'),
      count: getCount(DeviceType.ELECTRIC),
      bgColor: 'bg-[#FFF7E0]',
    },
    {
      icon: <Droplet className='text-2xl text-[#6C8AE4]' />,
      title: t('DEVICE_MANAGEMENT.WATER_DEVICE'),
      count: getCount(DeviceType.WATER),
      bgColor: 'bg-[#EAF2FF]',
    },
    {
      icon: <Flame className='text-2xl text-[#FF4D4F]' />,
      title: t('DEVICE_MANAGEMENT.GAS_DEVICE'),
      count: getCount(DeviceType.GAS),
      bgColor: 'bg-[#FFEAEA]',
    },
  ];

  return (
    <div className='device-management'>
      <h1>{t<string>('DEVICE_MANAGEMENT.TITLE')}</h1>
      <p className='my-4'>{t('DEVICE_MANAGEMENT.ALL')}</p>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8'>
        {deviceStats.map((stat) => (
          <div
            key={stat.title}
            className='bg-white rounded-2xl shadow-sm px-6 py-5 pr-8 min-w-[180px] flex items-center gap-4 border border-[#ececec]'
          >
            <div
              className={`rounded-xl w-14 h-14 flex items-center justify-center ${stat.bgColor}`}
            >
              {stat.icon}
            </div>
            <div>
              <div className='text-[#5B6B7A] text-[15px] font-medium'>{stat.title}</div>
              <div className='text-[#1D3557] font-bold text-[28px] mt-0.5'>{stat.count}</div>
            </div>
          </div>
        ))}
      </div>
      <div className='bg-white rounded-xl p-8 shadow'>
        <div className='space-y-4'>
          <div>
            <div className='user-filter mb-4'>
              <div className='flex flex-col md:grid md:grid-cols-2 gap-4'>
                <div className='w-full md:w-2/3'>
                  <Input
                    onChange={(e) => handleSearchDevice(e.currentTarget.value, setFilters)}
                    placeholder={t<string>('DEVICE_MANAGEMENT.SEARCH')}
                    className='h-10 bg-white rounded-lg'
                    prefix={<Search className='text-gray-500 text-2xl mr-2' />}
                  />
                </div>
                <div className='flex flex-col sm:flex-row items-center gap-4 justify-end w-full md:w-3/3'>
                  <SelectDevice
                    handleDeviceChange={(value) =>
                      handleFilterChange('location', value, setFilters)
                    }
                    setFilters={setFilters}
                    placeholder={t<string>('DEVICE_MANAGEMENT.LOCATION')}
                    options={
                      locationsData?.map((location: LocationDto) => ({
                        value: location.id,
                        label: location.name,
                      })) ?? []
                    }
                  />
                  <SelectDevice
                    handleDeviceChange={(value) =>
                      handleFilterChange('deviceType', value as DeviceType, setFilters)
                    }
                    setFilters={setFilters}
                    placeholder={t<string>('DEVICE_MANAGEMENT.DEVICE_TYPE')}
                    options={[
                      {
                        value: DeviceType.ELECTRIC,
                        label: t<string>('DEVICE_MANAGEMENT.ELECTRIC'),
                      },
                      { value: DeviceType.GAS, label: t<string>('DEVICE_MANAGEMENT.GAS') },
                      { value: DeviceType.WATER, label: t<string>('DEVICE_MANAGEMENT.WATER') },
                    ]}
                  />
                </div>
              </div>
            </div>
            <Table
              id='device-management-table'
              dataSource={devices}
              loading={isLoadingDevices}
              columns={columns}
              pagination={false}
              scroll={{ x: 'max-content' }}
            />
            {meta && (
              <Pagination
                align='end'
                className='mt-6'
                showQuickJumper
                current={meta.page}
                pageSize={meta.take}
                total={meta.itemCount}
                onChange={(page) => handleFilterChange('', page, setFilters)}
              />
            )}
          </div>
        </div>
      </div>
      <DeviceModal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onSave={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default DeviceManagement;
