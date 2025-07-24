import { Table, Popover, Card, Input, Button } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { debounce } from 'lodash';
import { Edit, Search, Trash } from 'lucide-react';
import { useEffect, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import LocationTypeSelect from '@app/components/commons/LocationTypeSelect/LocationTypeSelect';
import { NotificationTypeEnum, openNotificationWithIcon } from '@app/components/molecules';
import { NAVIGATE_URL } from '@app/constants';
import { useGetAllLocations } from '@app/hooks/useLocation';
import { LocationFilterProps, LocationResponseDto } from '@app/interface/location.interface';
import './index.css';

const LocationManagement = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [filter, setFilter] = useState<LocationFilterProps>({
    page: 1,
    take: 10,
    search: '',
    locationTypeId: '',
  });

  const { data: locations, isLoading, refetch } = useGetAllLocations(filter);

  useEffect(() => {
    refetch();
  }, [filter, refetch]);

  const handleSearch = useCallback(
    debounce((value: string) => {
      setFilter((prev) => ({ ...prev, search: value }));
    }, 400),
    [],
  );

  const columns: ColumnsType<LocationResponseDto> = [
    {
      title: t<string>('LOCATION.LOCATION_NAME'),
      dataIndex: 'name',
      key: 'name',
      width: 200,
    },
    {
      title: t<string>('LOCATION.TENANT_TYPE'),
      dataIndex: ['locationType', 'name'],
      key: 'locationType',
      width: 150,
    },
    {
      title: t<string>('LOCATION.USER'),
      dataIndex: ['user', 'name'],
      key: 'user',
      width: 150,
    },
    {
      title: t<string>('LOCATION.DEVICES'),
      dataIndex: 'device',
      key: 'device',
      width: 300,
      render: (_, record) => {
        const firstTwoDevices = record.devices.slice(0, 2);
        const remainingDevices = record.devices.slice(2);
        return (
          <div className='flex items-center gap-2'>
            {firstTwoDevices.map((device) => (
              <div key={device.id} className='text-sm text-black bg-[#D9D9D9] px-3 py-1 rounded-xl'>
                <div>{device.name}</div>
              </div>
            ))}
            {remainingDevices.length > 0 && (
              <Popover
                trigger='hover'
                content={
                  <div>
                    {remainingDevices.map((d) => (
                      <div key={d.id}>{d.name}</div>
                    ))}
                  </div>
                }
                placement='rightTop'
              >
                <div className='text-sm text-black bg-[#D9D9D9] px-3 py-1 rounded-xl cursor-pointer'>
                  +{remainingDevices.length}
                </div>
              </Popover>
            )}
          </div>
        );
      },
    },
    {
      title: t<string>('LOCATION.ACTION'),
      dataIndex: 'action',
      key: 'action',
      width: 120,
      fixed: 'right',
      render: (_, record) => {
        return (
          <div>
            <div className='flex items-center gap-4'>
              <Edit
                className='text-[#2E4258] cursor-pointer'
                onClick={() => navigate(`${NAVIGATE_URL.LOCATION}/edit/${record.id}`)}
              />
              <Trash
                className='text-[#D50707] cursor-pointer'
                onClick={() =>
                  openNotificationWithIcon(NotificationTypeEnum.WARNING, 'Chưa khả dụng')
                }
              />
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <div className='flex flex-col gap-4'>
        <p className='text-3xl font-bold'>{t('LOCATION.TITLE')}</p>
        <p className='text-base text-[#2E4258]'>{t('LOCATION.SUB_TITLE')}</p>
      </div>
      <Card className='mt-4'>
        <div className='flex flex-col gap-8'>
          <div className='flex flex-row gap-4 items-center justify-between'>
            <Input
              placeholder={t<string>('LOCATION.SEARCH_LOCATION')}
              className='w-full px-3 py-2 max-w-[300px]'
              prefix={<Search className='text-[#2E4258]' width={16} height={16} />}
              onChange={(e) => handleSearch(e.target.value)}
              allowClear
            />
            <div className='flex flex-row gap-4'>
              <LocationTypeSelect
                className='h-[40px] w-[170px]'
                onChange={(value) => {
                  setFilter({ ...filter, locationTypeId: value as string });
                }}
                allowClear
              />
              <Button
                className='h-[40px]'
                type='primary'
                onClick={() => navigate(NAVIGATE_URL.LOCATION_CREATE)}
              >
                {t('LOCATION.ADD_LOCATION')}
              </Button>
            </div>
          </div>
          <Table
            rowKey='id'
            loading={isLoading}
            className='custom-table-location'
            columns={columns}
            dataSource={locations?.data}
            scroll={{ x: 'max-content' }}
          />
        </div>
      </Card>
    </div>
  );
};

export default LocationManagement;
