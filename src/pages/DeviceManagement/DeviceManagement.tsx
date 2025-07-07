import { SearchOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Input, Select, Table, Pagination } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { debounce } from 'lodash';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { DeviceType } from '@app/constants';
import { useGetDevices } from '@app/hooks/useDevice';
import { deviceProps, DeviceResponseProps } from '@app/interface/device.interface';

import './DeviceManagement.scss';

const DeviceManagement = () => {
  const { t } = useTranslation();
  const [filters, setFilters] = useState<deviceProps>({
    search: '',
    deviceType: DeviceType.DEFAULT,
    page: 1,
    take: 10,
  });

  const { data, refetch, isLoading } = useGetDevices(filters);

  const { data: devicesResponse, meta } = data || {};

  const devices =
    devicesResponse?.map((device: DeviceResponseProps) => ({
      ...device,
      key: device.id,
    })) ?? [];

  const handleSearchChange = (value: string) => {
    setFilters((prev) => ({
      ...prev,
      search: value,
      page: 1,
    }));
  };

  const handleDeviceChange = (deviceType: DeviceType) => {
    setFilters((prev) => ({
      ...prev,
      deviceType,
      page: 1,
    }));
  };

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({
      ...prev,
      page,
    }));
  };

  useEffect(() => {
    refetch();
  }, [filters]);

  const getNameDeviceType = (deviceType: string) => {
    switch (deviceType) {
      case DeviceType.WATER:
        return t<string>('DEVICE_MANAGEMENT.WATER');
      case DeviceType.ELECTRIC:
        return t<string>('DEVICE_MANAGEMENT.ELECTRIC');
      case DeviceType.GAS:
        return t<string>('DEVICE_MANAGEMENT.GAS');
      default:
        return t<string>('DEVICE_MANAGEMENT.DEFAULT');
    }
  };

  const columns: ColumnsType<DeviceResponseProps> = [
    {
      title: t('DEVICE_MANAGEMENT.NO'),
      dataIndex: 'no',
      key: 'no',
      render: (_, record, index) => index + 1,
    },
    {
      title: t('DEVICE_MANAGEMENT.NAME'),
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: t('DEVICE_MANAGEMENT.DEVICE_ID'),
      dataIndex: 'devUI',
      key: 'devUI',
      render: (_, record) => record.devEUI,
    },
    {
      title: t('DEVICE_MANAGEMENT.ZONE'),
      dataIndex: 'location',
      key: 'location',
      render: (_, record) => {
        if (record.zone) {
          return record.zone.name;
        }
        return 'no';
      },
    },
    {
      title: t('DEVICE_MANAGEMENT.FIELD'),
      dataIndex: 'field',
      key: 'field',
      render: (_, record) =>
        `${record.fieldCalculate ? record.fieldCalculate : t('DEVICE_MANAGEMENT.NO_FIELD')}`,
    },
    {
      title: t('DEVICE_MANAGEMENT.DEVICE_TYPE'),
      dataIndex: 'deviceType',
      key: 'deviceType',
      render: (_, record) => <span>{getNameDeviceType(record.deviceType)}</span>,
    },
    {
      title: t('DEVICE_MANAGEMENT.STATUS'),
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <span
          className={`px-4 py-2 rounded-2xl text-white ${
            status ? 'bg-[#28a745]' : 'bg-[#ff513a1c] text-red-500'
          }`}
        >
          {status ? t('DEVICE_MANAGEMENT.ACTIVE') : t('DEVICE_MANAGEMENT.INACTIVE')}
        </span>
      ),
    },
    {
      title: t('DEVICE_MANAGEMENT.ACTION'),
      key: 'actions',
      render: (_) => (
        <Button className='text-center !bg-transparent shadow-none border-none'>
          <EditOutlined className='text-lg' />
        </Button>
      ),
      className: '!text-center',
      fixed: 'right',
    },
  ];

  const handleSearchProject = debounce((value: string) => {
    handleSearchChange(value);
  }, 500);

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
                    onChange={(e) => handleSearchProject(e.currentTarget.value)}
                    placeholder={t<string>('DEVICE_MANAGEMENT.SEARCH')}
                    className='h-10 bg-white rounded-lg'
                    prefix={<SearchOutlined className='text-gray-500 text-2xl mr-2' />}
                  />
                </div>
                <div className='flex flex-col sm:flex-row items-center gap-4 justify-end'>
                  <Select
                    allowClear
                    className='h-10 w-full sm:w-48'
                    placeholder={t<string>('DEVICE_MANAGEMENT.ZONE')}
                  />
                  <Select
                    allowClear
                    onChange={handleDeviceChange}
                    className='h-10 w-full sm:w-48'
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
              loading={isLoading}
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
                onChange={handlePageChange}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeviceManagement;
