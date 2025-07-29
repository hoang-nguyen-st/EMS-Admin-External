import { Button, Card, DatePicker, Form, Input, Table, Modal } from 'antd';
import { DefaultOptionType } from 'antd/es/select';
import { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import { Edit, Plus, Trash } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';

import AddDiviceModal from '../components/Modal/AddDeviceModal';
import LocationTypeSelect from '@app/components/commons/LocationTypeSelect/LocationTypeSelect';
import MeterTypeSelect from '@app/components/commons/MeterTypeSelect/MeterTypeSelect';
import UserSelectCustom from '@app/components/commons/UserSelectCustom/UserSelectCustom';
import { NotificationTypeEnum, openNotificationWithIcon } from '@app/components/molecules';
import { deviceTypeOptionsEnum, NAVIGATE_URL } from '@app/constants';
import { useGetDeviceByIds, useUnassignDeviceToLocation } from '@app/hooks/useDevice';
import { useGetLocationById, useUpdateLocation } from '@app/hooks/useLocation';
import { CreateLocationDto } from '@app/interface';
import { EditDeviceResponseProps } from '@app/interface/device.interface';
import { LocationTypeEnum, LocationTypeNames } from '@app/interface/location-type.interface';

import './EditLocation.css';

const EditLocation = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [locationTypeEnum, setLocationTypeEnum] = useState<LocationTypeEnum>();
  const [openDeviceModal, setOpenDeviceModal] = useState(false);
  const [selectedDeviceKeys, setSelectedDeviceKeys] = useState<React.Key[]>([]);
  const { data: locationData } = useGetLocationById(id as string);
  const [devices, setDevices] = useState<EditDeviceResponseProps[]>([]);
  const { mutate: updateLocation } = useUpdateLocation();
  const [editingDeviceId, setEditingDeviceId] = useState<string | null>(null);
  const [editingValues, setEditingValues] = useState<Record<string, number | undefined>>({});
  const { mutate: unassignDeviceToLocation } = useUnassignDeviceToLocation();
  const [deleteConfirmModal, setDeleteConfirmModal] = useState<{
    visible: boolean;
    deviceId: string | null;
    deviceName: string;
  }>({
    visible: false,
    deviceId: null,
    deviceName: '',
  });

  const { data: devicesSelectedData } = useGetDeviceByIds(
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

      setDevices(locationData.devices);

      if (locationData.locationType?.locationTypeEnum) {
        setLocationTypeEnum(locationData.locationType.locationTypeEnum);
      }
    }
  }, [locationData, form]);

  const handleDeleteDevice = (deviceId: string) => {
    const isFromSelectedData = devicesSelectedData?.data?.some((d) => d.device.id === deviceId);
    if (isFromSelectedData) {
      setEditingValues((prev) => ({
        ...prev,
        [deviceId]: undefined,
      }));
      setSelectedDeviceKeys(selectedDeviceKeys.filter((key) => key !== deviceId));
    } else {
      setDeleteConfirmModal({
        visible: true,
        deviceId,
        deviceName: devices.find((d) => d.device.id === deviceId)?.device.name || '',
      });
    }
  };

  const handleEditDevice = (deviceId: string) => {
    setEditingDeviceId(deviceId);
    const deviceFromLocation = locationData?.devices.find((d) => d.device.id === deviceId);
    const deviceFromSelected = devicesSelectedData?.data?.find((d) => d.device.id === deviceId);
    const device = deviceFromLocation || deviceFromSelected;

    if (editingValues[deviceId]) {
      setEditingValues((prev) => ({
        ...prev,
        [deviceId]: Number(editingValues[deviceId]) || 0,
      }));
    } else {
      setEditingValues((prev) => ({
        ...prev,
        [deviceId]:
          Number(
            device?.device.locationDevice?.initialIndex
              ? device?.device.locationDevice?.initialIndex
              : device?.lastestTimeSeriesValue,
          ) || 0,
      }));
    }
  };

  const handleSaveEdit = (deviceId: string) => {
    const deviceFromLocation = locationData?.devices.find((d) => d.device.id === deviceId);
    const deviceFromSelected = devicesSelectedData?.data?.find((d) => d.device.id === deviceId);
    const device = deviceFromLocation || deviceFromSelected;

    const currentValue = Number(device?.lastestTimeSeriesValue);

    const newValue = Number(editingValues[deviceId]) || 0;

    if (newValue > currentValue) {
      openNotificationWithIcon(
        NotificationTypeEnum.WARNING,
        t<string>('LOCATION.INITIAL_VALUE_CANNOT_EXCEED_CURRENT'),
      );
      return;
    }
    setEditingValues((prev) => ({
      ...prev,
      [deviceId]: newValue,
    }));

    setEditingDeviceId(null);
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

  const confirmDeleteDevice = () => {
    if (deleteConfirmModal.deviceId) {
      unassignDeviceToLocation(deleteConfirmModal.deviceId);
      setEditingValues((prev) => {
        const newValues = { ...prev };
        delete newValues[deleteConfirmModal.deviceId as string];
        return newValues;
      });
      setSelectedDeviceKeys(
        selectedDeviceKeys.filter((key) => key !== deleteConfirmModal.deviceId),
      );
      setDeleteConfirmModal({ visible: false, deviceId: null, deviceName: '' });
      setDevices(devices.filter((d) => d.device.id !== deleteConfirmModal.deviceId));
    }
  };

  const cancelDeleteDevice = () => {
    setDeleteConfirmModal({ visible: false, deviceId: null, deviceName: '' });
  };

  const handleSubmit = () => {
    const allDevices = [...(devices || []), ...(devicesSelectedData?.data || [])];

    const editLocationData: CreateLocationDto = {
      name: form.getFieldValue('name'),
      locationTypeId: form.getFieldValue('locationType'),
      meterTypeId: form.getFieldValue('meterType'),
      initialDate: dayjs(form.getFieldValue('startDate')).format('YYYY-MM-DD'),
      description: form.getFieldValue('description'),
      userId: form.getFieldValue('user'),
      devices: allDevices.map((deviceRecord) => {
        const deviceId = deviceRecord.device.id;
        return {
          deviceId: deviceId,
          initialIndex: Number(
            editingValues[deviceId] !== undefined
              ? editingValues[deviceId]
              : deviceRecord.device.locationDevice?.initialIndex ||
                  deviceRecord.lastestTimeSeriesValue ||
                  0,
          ),
        };
      }),
    };

    updateLocation({ id: locationData?.id as string, data: editLocationData });
    setSelectedDeviceKeys([]);
  };

  const columns: ColumnsType<EditDeviceResponseProps> = [
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
      render: (_, record) => {
        const deviceId = record.device.id;
        const isEditing = editingDeviceId === deviceId;

        const displayValue =
          editingValues[deviceId] !== undefined
            ? editingValues[deviceId]
            : record.device.locationDevice?.initialIndex || record.lastestTimeSeriesValue;

        if (isEditing) {
          return (
            <Input
              type='number'
              value={displayValue}
              onChange={(e) => {
                const newValue = Number(e.target.value) || undefined;
                setEditingValues((prev) => ({
                  ...prev,
                  [deviceId]: newValue,
                }));
              }}
            />
          );
        }

        return displayValue;
      },
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
                rowKey={(record) => record.device.id}
                className='custom-device-table shadow-md !rounded-lg'
                dataSource={[...(devicesSelectedData?.data || []), ...devices]}
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

      <Modal
        title={t('LOCATION.DELETE_DEVICE_CONFIRM')}
        open={deleteConfirmModal.visible}
        onOk={confirmDeleteDevice}
        onCancel={cancelDeleteDevice}
        okText={t('LOCATION.DELETE')}
        cancelText={t('LOCATION.CANCEL')}
        okButtonProps={{ danger: true }}
        centered
      >
        <p>
          {t('LOCATION.DELETE_DEVICE_MESSAGE', {
            deviceName: deleteConfirmModal.deviceName,
          })}
        </p>
      </Modal>
    </div>
  );
};

export default EditLocation;
