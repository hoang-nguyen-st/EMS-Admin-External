import { SearchOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Input, Select, Table, Pagination, TableProps } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { debounce } from 'lodash';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { ResourceType } from '@app/constants';
import { UserColumns } from '@app/interface/user.interface';

export interface DeviceTableProps extends TableProps {
  onSearchChange: (value: string) => void;
  onDeviceChange: (deviceType: ResourceType) => void;
}

const DeviceTable: FC<DeviceTableProps> = ({ onSearchChange, onDeviceChange }) => {
  const { t } = useTranslation();

  const handleSearchProject = debounce((value: string) => {
    onSearchChange(value);
  }, 500);

  const getNameResourceType = (status: ResourceType) => {
    switch (status) {
      case ResourceType.WATER:
        return t<string>('DEVICE_MANAGEMENT.WATER');
      case ResourceType.ELECTRIC:
        return t<string>('DEVICE_MANAGEMENT.ELECTRIC');
      case ResourceType.GAS:
        return t<string>('DEVICE_MANAGEMENT.GAS');
    }
  };

  const columns: ColumnsType<UserColumns> = [
    {
      title: t('DEVICE_MANAGEMENT.NO'),
      dataIndex: 'no',
      key: 'no',
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
    },
    {
      title: t('DEVICE_MANAGEMENT.SENSOR_ID'),
      dataIndex: 'sensorID',
      key: 'sensorID',
    },
    {
      title: t('DEVICE_MANAGEMENT.LOCATION'),
      dataIndex: 'location',
      key: 'location',
    },
    {
      title: t('DEVICE_MANAGEMENT.FIELD'),
      dataIndex: 'field',
      key: 'field',
    },
    {
      title: t('DEVICE_MANAGEMENT.DEVICE_TYPE'),
      dataIndex: 'deviceType',
      key: 'deviceType',
    },
    {
      title: t('DEVICE_MANAGEMENT.ACTION'),
      key: 'actions',
      render: (_, record) => (
        <Button
          className='text-center !bg-transparent shadow-none border-none'
          // onClick={() => {
          // }}
        >
          <EditOutlined className='text-lg' />
        </Button>
      ),
      className: '!text-center',
    },
  ];

  return (
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
              // onChange={onStatusChange}
              className='h-10 w-full sm:w-48'
              placeholder={t<string>('DEVICE_MANAGEMENT.LOCATION')}
            />
            <Select
              allowClear
              onChange={onDeviceChange}
              className='h-10 w-full sm:w-48'
              placeholder={t<string>('DEVICE_MANAGEMENT.DEVICE_TYPE')}
              options={[
                { value: ResourceType.ELECTRIC, label: t<string>('DEVICE_MANAGEMENT.ELECTRIC') },
                { value: ResourceType.GAS, label: t<string>('DEVICE_MANAGEMENT.GAS') },
                { value: ResourceType.WATER, label: t<string>('DEVICE_MANAGEMENT.WATER') },
              ]}
            />
          </div>
        </div>
      </div>
      <Table
        id='device-management-table'
        columns={columns}
        // dataSource={users}
        pagination={false}
        scroll={{ x: 'max-content' }}
      />
    </div>
  );
};

export default DeviceTable;
