import { Button, Input, Modal, Pagination, Table, Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { TableRowSelection } from 'antd/es/table/interface';
import { debounce } from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import './AddDeviceModal.css';
import DeviceTypeSelectCustom from '@app/components/commons/DeviceTypeSelect/DeviceTypeSelectCustom';
import StatusSelectCustom from '@app/components/commons/StatusSelect/StatusSelectCustom';
import { DeviceType, deviceTypeOptionsEnum } from '@app/constants';
import { useGetUnassignedDevices } from '@app/hooks/useDevice';
import { DeviceProps, DeviceResponseProps } from '@app/interface/device.interface';

interface AddDiviceModalProps {
  open: boolean;
  onCancel: () => void;
  onSelect: (selectedRowKeys: React.Key[]) => void;
  selectedDeviceKeys: React.Key[];
}

const AddDiviceModal = ({ open, onCancel, onSelect, selectedDeviceKeys }: AddDiviceModalProps) => {
  const { t } = useTranslation();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [filter, setFilter] = useState<DeviceProps>({
    page: 1,
    take: 10,
    search: '',
  });

  useEffect(() => {
    setSelectedRowKeys(selectedDeviceKeys);
  }, [selectedDeviceKeys]);

  const { data: devices, isLoading, refetch } = useGetUnassignedDevices(filter);

  useEffect(() => {
    if (open || filter.search !== '') {
      refetch();
    }
  }, [open, filter, refetch]);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const handleSearch = useCallback(
    debounce((value: string) => {
      setFilter((prev) => ({ ...prev, search: value }));
    }, 300),
    [],
  );

  const handleClickSave = () => {
    onSelect(selectedRowKeys);
    onCancel();
  };

  const rowSelection: TableRowSelection<DeviceResponseProps> = {
    selectedRowKeys,
    onChange: onSelectChange,
    getCheckboxProps: (record) => ({
      disabled: !record.fieldCalculate,
    }),
  };

  const columns: ColumnsType<DeviceResponseProps> = [
    {
      title: t('LOCATION.DEVICE_NAME'),
      dataIndex: 'name',
      key: 'name',
      width: 180,
    },
    {
      title: t('LOCATION.DEVICE_EUI'),
      dataIndex: 'devEUI',
      key: 'devEUI',
      width: 180,
    },
    {
      title: t('LOCATION.FIELD_CACULATE'),
      dataIndex: 'fieldCalculate',
      key: 'fieldCalculate',
      width: 180,
    },
    {
      title: t('LOCATION.DEVICE_TYPE'),
      dataIndex: 'deviceType',
      key: 'deviceType',
      width: 120,
      render: (value) => {
        const deviceTypeOption = deviceTypeOptionsEnum.find((item) => item.key === value);
        return (
          value && (
            <Tag className={`${deviceTypeOption?.className} px-2 py-1 rounded-xl`}>
              {deviceTypeOption && t(`${deviceTypeOption?.label}`)}
            </Tag>
          )
        );
      },
    },
    {
      title: t('LOCATION.STATUS'),
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (_, record) => {
        return (
          <Tag className='px-2 py-1 rounded-xl' color={record.status ? '#28A745' : 'red'}>
            {record.status ? t('LOCATION.ACTIVE') : t('LOCATION.INACTIVE')}
          </Tag>
        );
      },
    },
  ];

  return (
    <Modal
      centered
      open={open}
      onCancel={onCancel}
      footer={null}
      width={1000}
      height={600}
      className='custom-add-device-modal'
    >
      <p className='font-semibold text-2xl text-center'>{t('LOCATION.ADD_DEVICE')}</p>
      <div className='flex flex-col gap-2 p-6'>
        <p className='text-sm text-gray-500'>{t('LOCATION.ADD_DEVICE_DESCRIPTION')}</p>
        <div className='mt-4'>
          <div className='flex flex-row items-center justify-between gap-2'>
            <div className='flex flex-row gap-2 items-center justify-'>
              <p className='w-[100px]'>{t('LOCATION.SEARCH_DEVICE')}:</p>
              <Input
                className='h-[40px]'
                placeholder={t<string>('LOCATION.SEARCH_DEVICE_PLACEHOLDER')}
                allowClear
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
            <div className='flex flex-row gap-2 items-center justify-between'>
              <StatusSelectCustom
                className='h-[40px] w-[180px]'
                allowClear
                onChange={(value) =>
                  setFilter((prev) => ({
                    ...prev,
                    status: value ? (value === 1 ? true : false) : null,
                  }))
                }
              />
              <DeviceTypeSelectCustom
                className='h-[40px] w-[180px]'
                allowClear
                onChange={(value) =>
                  setFilter((prev) => ({ ...prev, deviceType: value as DeviceType }))
                }
              />
            </div>
          </div>
        </div>
        <Table<DeviceResponseProps>
          className='mt-4 custom-table-select-device'
          columns={columns}
          rowSelection={rowSelection}
          dataSource={devices?.data}
          loading={isLoading}
          pagination={false}
          rowKey='id'
          scroll={{ x: 'max-content' }}
        />
        <div className='flex justify-end items-center'>
          <Pagination
            total={devices?.meta?.itemCount}
            showSizeChanger
            showQuickJumper
            showTotal={(total) => t<string>('TABLE.TOTAL_ITEMS', { item: total })}
          />
        </div>
        <div className='flex justify-end items-center gap-2 mt-4'>
          <Button onClick={onCancel} className='px-6' type='default'>
            {t('LOCATION.CANCEL')}
          </Button>
          <Button onClick={handleClickSave} type='primary' className='px-6'>
            {t('LOCATION.OK')}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default AddDiviceModal;
