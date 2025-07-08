import { SearchOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Input, Table, Pagination } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { TFunction } from 'i18next';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import {
  handlePageChange,
  handleSearchProject,
  handleDeviceChange,
  handleZoneChange,
} from './common/useFilter';
import SelectDevice from './components/SelectDevice';
import { DeviceType, getNameDeviceType, NAVIGATE_URL } from '@app/constants';
import { useGetDevices } from '@app/hooks/useDevice';
import { useGetZones } from '@app/hooks/useZone';
import { DeviceResponseProps, DeviceProps } from '@app/interface/device.interface';
import { ZoneDto } from '@app/interface/zone.interface';

import './DeviceManagement.scss';

const DeviceManagement = () => {
  const { t } = useTranslation();
  const { data: zonesData } = useGetZones();
  const [filters, setFilters] = useState<DeviceProps>({
    search: '',
    deviceType: DeviceType.DEFAULT,
    page: 1,
    take: 10,
  });

  const {
    data: devicesData,
    refetch: refetchDevices,
    isLoading: isLoadingDevices,
  } = useGetDevices(filters);
  const { data: devicesResponse, meta } = devicesData || {};

  const devices =
    devicesResponse?.map((device: DeviceResponseProps) => ({
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
      title: t('DEVICE_MANAGEMENT.ZONE'),
      dataIndex: 'zone',
      key: 'zone',
      render: (_, record) => {
        return record.zone && record.zone.name;
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
        <Button className='text-center !bg-transparent shadow-none border-none'>
          <EditOutlined className='text-lg' />
        </Button>
      ),
      className: '!text-center',
      fixed: 'right',
    },
  ];

  return (
    <div className='device-management'>
      <h1>{t<string>('DEVICE_MANAGEMENT.TITLE')}</h1>
      <p className='my-4'>{t('DEVICE_MANAGEMENT.ALL')}</p>
      <div className='bg-white rounded-xl p-8 shadow'>
        <div className='space-y-4'>
          <div>
            <div className='user-filter mb-4'>
              <div className='flex flex-col md:grid md:grid-cols-2 gap-4'>
                <div className='w-full md:w-1/2'>
                  <Input
                    onChange={(e) => handleSearchProject(e.currentTarget.value, setFilters)}
                    placeholder={t<string>('DEVICE_MANAGEMENT.SEARCH')}
                    className='h-10 bg-white rounded-lg'
                    prefix={<SearchOutlined className='text-gray-500 text-2xl mr-2' />}
                  />
                </div>
                <div className='flex flex-col sm:flex-row items-center gap-4 justify-end'>
                  <SelectDevice
                    handleDeviceChange={handleZoneChange}
                    setFilters={setFilters}
                    placeholder={t<string>('DEVICE_MANAGEMENT.ZONE')}
                    options={
                      zonesData?.map((zone: ZoneDto) => ({
                        value: zone.id,
                        label: zone.name,
                      })) ?? []
                    }
                  />
                  <SelectDevice
                    handleDeviceChange={(value, setFilters) =>
                      handleDeviceChange(value as DeviceType, setFilters)
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
                onChange={(page) => handlePageChange(page, setFilters)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeviceManagement;
