import { Button, Card, DatePicker, Form, Input, Table } from 'antd';
import { DefaultOptionType } from 'antd/es/select';
import { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import { Edit, Plus, Trash } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import AddDiviceModal from '../components/Modal/AddDeviceModal';
import LocationTypeSelect from '@app/components/commons/LocationTypeSelect/LocationTypeSelect';
import MeterTypeSelect from '@app/components/commons/MeterTypeSelect/MeterTypeSelect';
import UserSelectCustom from '@app/components/commons/UserSelectCustom/UserSelectCustom';
import { NotificationTypeEnum, openNotificationWithIcon } from '@app/components/molecules';
import { deviceTypeOptionsEnum, NAVIGATE_URL } from '@app/constants';
import { useGetDeviceByIds } from '@app/hooks/useDevice';
import { useCreateLocation } from '@app/hooks/useLocation';
import { DetailDeviceProps } from '@app/interface/device.interface';
import { LocationTypeEnum, LocationTypeNames } from '@app/interface/location-type.interface';
import { CreateLocationDto } from '@app/interface/location.interface';

import './CreateLocationPage.css';

const CreateLocationPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { mutate: createLocation } = useCreateLocation();
  const [form] = Form.useForm();
  const [locationTypeEnum, setLocationTypeEnum] = useState<LocationTypeEnum>();
  const [openDeviceModal, setOpenDeviceModal] = useState(false);
  const [selectedDeviceKeys, setSelectedDeviceKeys] = useState<React.Key[]>([]);
  const [editingDeviceId, setEditingDeviceId] = useState<string | null>(null);
  const [editingValues, setEditingValues] = useState<Record<string, number>>({});

  const { data: devicesData } = useGetDeviceByIds(
    selectedDeviceKeys.map((key) => String(key)),
    !openDeviceModal && selectedDeviceKeys.length > 0,
  );

  useEffect(() => {
    if (locationTypeEnum === LocationTypeEnum.RESIDENTIAL) {
      form.setFieldsValue({
        meterType: null,
      });
    }
  }, [locationTypeEnum, form]);

  const handleDeleteDevice = (deviceId: string) => {
    setEditingValues((prev) => ({
      ...prev,
      [deviceId]: 0,
    }));
    setSelectedDeviceKeys(selectedDeviceKeys.filter((key) => key !== deviceId));
  };

  const handleEditDevice = (deviceId: string) => {
    setEditingDeviceId(deviceId);
    const device = devicesData?.data.find((d) => d.device.id === deviceId);

    if (editingValues[deviceId]) {
      setEditingValues((prev) => ({
        ...prev,
        [deviceId]: Number(editingValues[deviceId]) || 0,
      }));
    } else {
      setEditingValues((prev) => ({
        ...prev,
        [deviceId]: Number(device?.lastestTimeSeriesValue) || 0,
      }));
    }
  };

  const handleSaveEdit = (deviceId: string) => {
    const device = devicesData?.data.find((d) => d.device.id === deviceId);
    const currentValue = Number(device?.lastestTimeSeriesValue) || 0;
    const newValue = Number(editingValues[deviceId]) || 0;

    if (newValue > currentValue) {
      openNotificationWithIcon(
        NotificationTypeEnum.WARNING,
        t<string>('LOCATION.INITIAL_VALUE_CANNOT_EXCEED_CURRENT'),
      );
      return;
    }

    setEditingDeviceId(null);
    setEditingValues((prev) => ({
      ...prev,
      [deviceId]: newValue,
    }));
  };

  const handleCancelEdit = () => {
    if (editingDeviceId) {
      setEditingValues((prev) => {
        const newValues = { ...prev };
        delete newValues[editingDeviceId];
        return newValues;
      });
    }
    setEditingDeviceId(null);
  };

  const handleSubmit = () => {
    if (selectedDeviceKeys.length === 0) {
      openNotificationWithIcon(
        NotificationTypeEnum.ERROR,
        t<string>('LOCATION.ADD_DEVICE_REQUIRED'),
      );
      return;
    }

    form
      .validateFields()
      .then((values) => {
        const locationData: CreateLocationDto = {
          name: values.name,
          locationTypeId: values.locationType,
          meterTypeId: values.meterType,
          initialDate: dayjs(values.startDate).format('YYYY-MM-DD'),
          description: values.description,
          userId: values.user,
          devices:
            devicesData?.data.map((device) => ({
              deviceId: device.device.id,
              initialIndex:
                editingValues[device.device.id] || Number(device.lastestTimeSeriesValue),
            })) || [],
        };
        createLocation(locationData);
      })
      .catch((errorInfo) => {
        console.log('Validation failed:', errorInfo);
      });
  };

  const columns: ColumnsType<DetailDeviceProps> = [
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
      dataIndex: 'lastestTimeSeriesValue',
      key: 'initialCalculate',
      width: 150,
      render: (value, record) => {
        const deviceId = record.device.id;
        const isEditing = editingDeviceId === deviceId;

        if (isEditing) {
          return (
            <Input
              type='number'
              value={editingValues[deviceId] || value}
              onChange={(e) => {
                const newValue = Number(e.target.value) || 0;
                setEditingValues((prev) => ({
                  ...prev,
                  [deviceId]: newValue,
                }));
              }}
            />
          );
        }

        return editingValues[deviceId] || value;
      },
    },
    {
      title: t('LOCATION.ACTIVE_ENERGY_IMPORT'),
      dataIndex: 'lastestTimeSeriesValue',
      key: 'lastestTimeSeriesValue.data_active_energy_import.value',
      width: 150,
    },
    {
      title: t('LOCATION.ACTION'),
      dataIndex: 'action',
      key: 'action',
      fixed: 'right',
      width: 120,
      render: (_, record) => {
        const deviceId = record.device.id;
        const isEditing = editingDeviceId === deviceId;

        return (
          <div className='flex gap-2 items-center justify-center'>
            {isEditing ? (
              <>
                <Button
                  type='link'
                  size='small'
                  onClick={() => handleSaveEdit(deviceId)}
                  className='p-0 h-auto text-green-500'
                >
                  Save
                </Button>
                <Button
                  type='link'
                  size='small'
                  onClick={handleCancelEdit}
                  className='p-0 h-auto text-gray-500'
                >
                  Cancel
                </Button>
              </>
            ) : (
              <Edit
                className='w-5 h-5 text-[#2E4258] cursor-pointer'
                onClick={() => handleEditDevice(deviceId)}
              />
            )}
            <Trash
              className='w-5 h-5 text-red-500 cursor-pointer'
              onClick={() => handleDeleteDevice(deviceId)}
            />
          </div>
        );
      },
      align: 'center',
    },
  ];

  return (
    <div>
      <Card>
        <Form form={form} layout='vertical'>
          <p className='text-3xl font-bold'>{t('LOCATION.ADD_LOCATION')}</p>
          <div className='grid grid-cols-2 gap-4 mt-4'>
            <Form.Item
              label={t('LOCATION.LOCATION_NAME')}
              name='name'
              rules={[
                { required: true, message: t<string>('LOCATION.LOCATION_NAME_REQUIRED') },
                {
                  validator: (_, value) => {
                    if (value && value.trim() === '') {
                      return Promise.reject(
                        new Error(t<string>('LOCATION.LOCATION_NAME_REQUIRED')),
                      );
                    }
                    return Promise.resolve();
                  },
                },
              ]}
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
                  rules={[
                    {
                      validator: (_, value) => {
                        if (value && value.trim() === '') {
                          return Promise.reject(
                            new Error(t<string>('LOCATION.DESCRIPTION_CANNOT_BE_EMPTY')),
                          );
                        }
                        return Promise.resolve();
                      },
                    },
                  ]}
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
                rowKey={(record) => record.device.id}
                className='custom-device-table shadow-md !rounded-lg'
                dataSource={devicesData?.data}
                columns={columns}
                scroll={{ x: 'max-content' }}
              />
            </div>
          </div>
          <div className='flex justify-end items-center gap-2 mt-4'>
            <Button className='px-6' type='default' onClick={() => navigate(NAVIGATE_URL.LOCATION)}>
              {t('LOCATION.CANCEL')}
            </Button>
            <Button type='primary' className='px-6' htmlType='submit' onClick={handleSubmit}>
              {t('LOCATION.SAVE')}
            </Button>
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

export default CreateLocationPage;
