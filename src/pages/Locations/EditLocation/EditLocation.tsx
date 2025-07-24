import { Button, Card, DatePicker, Form, Input, Table } from 'antd';
import { DefaultOptionType } from 'antd/es/select';
import { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import { Plus, Trash } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';

import AddDiviceModal from '../components/Modal/AddDeviceModal';
import LocationTypeSelect from '@app/components/commons/LocationTypeSelect/LocationTypeSelect';
import MeterTypeSelect from '@app/components/commons/MeterTypeSelect/MeterTypeSelect';
import UserSelectCustom from '@app/components/commons/UserSelectCustom/UserSelectCustom';
import { deviceTypeOptionsEnum, NAVIGATE_URL } from '@app/constants';
import { useCreateLocation, useGetLocationById } from '@app/hooks/useLocation';
import { DeviceResponseProps } from '@app/interface/device.interface';
import { LocationTypeEnum, LocationTypeNames } from '@app/interface/location-type.interface';

import './EditLocation.css';

const EditLocation = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { mutate: createLocation } = useCreateLocation();
  const [form] = Form.useForm();
  const [locationTypeEnum, setLocationTypeEnum] = useState<LocationTypeEnum>();
  const [openDeviceModal, setOpenDeviceModal] = useState(false);
  const [selectedDeviceKeys, setSelectedDeviceKeys] = useState<React.Key[]>([]);
  const { data: locationData } = useGetLocationById(id as string);

  // const { data: devicesData } = useGetDeviceByIds(
  //   selectedDeviceKeys.map((key) => String(key)),
  //   !openDeviceModal && selectedDeviceKeys.length > 0,
  // );

  console.log(locationData);

  useEffect(() => {
    if (locationTypeEnum === LocationTypeEnum.RESIDENTIAL) {
      form.setFieldsValue({
        meterType: null,
      });
    }
  }, [locationTypeEnum, form]);

  useEffect(() => {
    if (locationData) {
      form.setFieldsValue({
        name: locationData.name,
        locationType: locationData.locationType?.id,
        meterType: locationData.meterType?.id,
        startDate: locationData.initialDate ? dayjs(locationData.initialDate) : undefined,
        description: locationData.description,
        user: locationData.user?.id,
      });

      if (locationData.locationType?.locationTypeEnum) {
        setLocationTypeEnum(locationData.locationType.locationTypeEnum);
      }
    }
  }, [locationData, form]);

  const handleDeleteDevice = (id: string) => {
    setSelectedDeviceKeys(selectedDeviceKeys.filter((key) => key !== id));
  };

  // const handleSubmit = () => {
  //   if (selectedDeviceKeys.length === 0) {
  //     openNotificationWithIcon(NotificationTypeEnum.ERROR, t<string>('LOCATION.EDIT_LOCATION'));
  //   } else {
  //     const locationData: CreateLocationDto = {
  //       name: form.getFieldValue('name'),
  //       locationTypeId: form.getFieldValue('locationType'),
  //       meterTypeId: form.getFieldValue('meterType'),
  //       initialDate: dayjs(form.getFieldValue('startDate')).format('YYYY-MM-DD'),
  //       description: form.getFieldValue('description'),
  //       userId: form.getFieldValue('user'),
  //       // deviceIds: selectedDeviceKeys.map((key) => String(key)),
  //     };
  //     createLocation(locationData);
  //   }
  // };

  const columns: ColumnsType<DeviceResponseProps> = [
    {
      title: t('LOCATION.DEVICE_NAME'),
      dataIndex: ['device', 'name'],
      key: 'device.name',
      width: 180,
    },
    {
      title: t('LOCATION.DEVICE_EUI'),
      dataIndex: ['device', 'devEUI'],
      key: 'devEUI',
      width: 180,
    },
    {
      title: t('LOCATION.DEVICE_TYPE'),
      dataIndex: ['device', 'deviceType'],
      key: 'device.deviceType',
      width: 120,
      render: (value) => {
        const deviceTypeOption = deviceTypeOptionsEnum.find((item) => item.key === value);
        return deviceTypeOption && t(`${deviceTypeOption?.label}`);
      },
    },
    {
      title: t('LOCATION.INITIAL_ENERGY_IMPORT'),
      dataIndex: ['device', 'locationDevice', 'initialIndex'],
      key: 'initialIndex',
      width: 150,
    },
    {
      title: t('LOCATION.ACTIVE_ENERGY_IMPORT'),
      dataIndex: 'lastestTimeSeriesValue',
      key: 'lastestTimeSeriesValue',
      width: 150,
    },
    {
      title: t('LOCATION.ACTION'),
      dataIndex: 'action',
      key: 'action',
      width: 120,
      render: (_, record) => (
        <Trash
          className='w-6 h-6 text-red-500 cursor-pointer'
          onClick={() => handleDeleteDevice(record.id)}
        />
      ),
      fixed: 'right',
      align: 'center',
    },
  ];

  return (
    <div>
      <Card>
        <Form form={form} layout='vertical'>
          <p className='text-3xl font-bold'>{t('LOCATION.EDIT_LOCATION')}</p>
          <div className='grid grid-cols-2 gap-4 mt-4'>
            <Form.Item
              label={t('LOCATION.LOCATION_NAME')}
              name='name'
              rules={[{ required: true, message: t<string>('LOCATION.LOCATION_NAME_REQUIRED') }]}
            >
              <Input
                className='h-[40px]'
                placeholder={t<string>('LOCATION.LOCATION_NAME_PLACEHOLDER')}
              />
            </Form.Item>

            <Form.Item
              label={t('LOCATION.LOCATION_TYPE')}
              name='locationType'
              rules={[{ required: true, message: t<string>('LOCATION.LOCATION_TYPE_REQUIRED') }]}
            >
              <LocationTypeSelect
                className='h-[40px]'
                onChange={(_, option) => {
                  setLocationTypeEnum(
                    (option as DefaultOptionType & LocationTypeNames)?.locationTypeEnum,
                  );
                }}
              />
            </Form.Item>

            <Form.Item
              label={t('LOCATION.METER_TYPE')}
              name='meterType'
              required={true}
              dependencies={['locationType']}
              rules={[
                {
                  required: true,
                  validator: (_, value) => {
                    if (locationTypeEnum === LocationTypeEnum.RESIDENTIAL) {
                      return Promise.resolve();
                    }
                    if (!value) {
                      return Promise.reject(new Error(t<string>('LOCATION.METER_TYPE_REQUIRED')));
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <MeterTypeSelect
                disabled={locationTypeEnum === LocationTypeEnum.RESIDENTIAL}
                className='h-[40px]'
              />
            </Form.Item>

            <Form.Item
              label={t('LOCATION.START_DATE')}
              name='startDate'
              rules={[{ required: true, message: t<string>('LOCATION.START_DATE_REQUIRED') }]}
            >
              <DatePicker
                placeholder={t<string>('LOCATION.START_DATE_PLACEHOLDER')}
                needConfirm
                className='h-[40px] w-full'
              />
            </Form.Item>

            <Form.Item
              className='col-span-2'
              label={t('LOCATION.USER')}
              name='user'
              rules={[{ required: true, message: t<string>('LOCATION.USER_REQUIRED') }]}
            >
              <UserSelectCustom
                className='h-[40px]'
                placeholder={t<string>('LOCATION.USER_PLACEHOLDER')}
              />
            </Form.Item>

            <div className='col-span-2 w-full'>
              <div className='flex flex-row gap-4 w-full items-center'>
                <Form.Item
                  className='col-span-2 w-full'
                  label={t('LOCATION.DESCRIPTION')}
                  name='description'
                >
                  <Input.TextArea
                    rows={3}
                    placeholder={t<string>('LOCATION.DESCRIPTION_PLACEHOLDER')}
                  />
                </Form.Item>

                <Button
                  type='primary'
                  className='flex h-[80px] bg-[#cddefb]'
                  onClick={() => setOpenDeviceModal(true)}
                >
                  <div className='flex flex-col gap-2 items-center p-2 text-black'>
                    <Plus className='w-6 h-6' />
                    {t('LOCATION.ADD_DEVICE')}
                  </div>
                </Button>
              </div>
            </div>

            <div className='col-span-2'>
              <Table
                rowKey='id'
                className='custom-device-table shadow-md !rounded-lg'
                dataSource={locationData?.devices}
                columns={columns}
                scroll={{ x: 'max-content' }}
              />
            </div>
          </div>
          <div className='flex justify-end items-center gap-2 mt-4'>
            <Button className='px-6' type='default' onClick={() => navigate(NAVIGATE_URL.LOCATION)}>
              {t('LOCATION.CANCEL')}
            </Button>
            {/* <Button type='primary' className='px-6' htmlType='submit' onClick={handleSubmit}>
              {t('LOCATION.SAVE')}
            </Button> */}
          </div>
        </Form>
      </Card>

      <AddDiviceModal
        open={openDeviceModal}
        onCancel={() => setOpenDeviceModal(false)}
        onSelect={setSelectedDeviceKeys}
        selectedDeviceKeys={selectedDeviceKeys}
      />
    </div>
  );
};

export default EditLocation;
