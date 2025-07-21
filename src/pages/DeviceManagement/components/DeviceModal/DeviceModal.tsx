import { CloseOutlined } from '@ant-design/icons';
import { Modal, Input, Select, Button, Form, Typography } from 'antd';
import { Rule } from 'antd/lib/form';
import { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { useDeviceModalSchema } from './DeviceModalSchema';
import { openNotificationWithIcon, NotificationTypeEnum } from '@app/components/molecules';
import { deviceTypeOptions, meterTypeOptions, voltageUnitOptions } from '@app/constants';
import { yupSync } from '@app/helpers/yupSync';
import { useGetDeviceTelemetryKeys, useUpdateDeviceSettings } from '@app/hooks/useDevice';
import { DeviceResponseProps } from '@app/interface/device.interface';

const { Title } = Typography;

interface SettingDeviceModalProps {
  open: boolean;
  deviceData: DeviceResponseProps | null;
  onCancel: () => void;
  onSave: (values: DeviceModalData) => void;
}

interface DeviceModalData {
  fieldCalculate: string;
  deviceType: string;
  meterType: string;
  voltageValue: string;
  voltageUnit: string;
}

const SettingDeviceModal: FC<SettingDeviceModalProps> = ({
  open,
  deviceData,
  onCancel,
  onSave,
}) => {
  const [form] = Form.useForm();
  const schema = useDeviceModalSchema();
  const validator = [yupSync(schema)] as unknown as Rule[];
  const { t } = useTranslation();

  const { data: telemetryKeys = [], isLoading: telemetryLoading } = useGetDeviceTelemetryKeys(
    deviceData?.id,
    open,
  );

  const { mutate: updateDeviceSettings, isLoading: loading } = useUpdateDeviceSettings();

  useEffect(() => {
    if (open && deviceData) {
      form.setFieldsValue({
        deviceName: deviceData.name,
        devEUI: deviceData.devEUI,
        fieldCalculate: deviceData.fieldCalculate || '',
        deviceType: deviceData.deviceType || '',
        meterType: deviceData.meterType?.meterTypeEnum || '',
        voltageValue: deviceData.voltageValue || '',
        voltageUnit: deviceData.voltageUnit || '',
      });
    } else if (!open) {
      form.resetFields();
    }
  }, [open, deviceData, form]);

  const handleFinish = (values: DeviceModalData) => {
    if (!deviceData?.id) {
      openNotificationWithIcon(NotificationTypeEnum.ERROR, t('DEVICE_MANAGEMENT.NO_DEVICE_ID'));
      return;
    }

    updateDeviceSettings(
      { deviceId: deviceData?.id || '', settings: values },
      {
        onSuccess: () => {
          onSave(values);
          form.resetFields();
        },
      },
    );
  };

  const fieldOptions =
    telemetryKeys.length > 0
      ? telemetryKeys.map((key: string) => ({
          value: key,
          label: key,
        }))
      : [{ value: '', label: t('DEVICE_MANAGEMENT.NO_FIELD') }];

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      footer={
        <div className='flex items-center justify-end gap-x-4 mt-8'>
          <Button
            onClick={() => {
              form.resetFields();
              onCancel();
            }}
            className='px-8 h-[3rem] bg-white text-gray-600 font-bold outline-none rounded-md hover:text-black transition duration-300'
          >
            {t('DEVICE_MODAL.CANCEL')}
          </Button>
          <Button
            onClick={() => form.submit()}
            type='primary'
            htmlType='submit'
            loading={loading}
            disabled={loading}
            className='px-8 h-[3rem] bg-[#465FFF] text-white font-bold border-none outline-none rounded-md hover:!bg-primary-second hover:text-black transition duration-300'
          >
            {t('DEVICE_MODAL.SAVE')}
          </Button>
        </div>
      }
      closable={false}
      width={700}
      className='rounded-3xl'
      maskClosable={true}
    >
      <div className='flex justify-between items-center mb-6'>
        <Title level={2} className='!mb-0 !text-center w-full font-bold'>
          {t('DEVICE_MODAL.SETTING_DEVICE')}
        </Title>
        <Button
          type='text'
          icon={<CloseOutlined />}
          onClick={onCancel}
          className='absolute right-6 top-6'
        />
      </div>
      <Form layout='vertical' form={form} onFinish={handleFinish} className='px-4 mt-4'>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-4'>
          <Form.Item label={t('DEVICE_MODAL.DEVICE_NAME')} name='deviceName'>
            <Input
              className='w-full p-3 pl-4 rounded-md'
              placeholder={t<string>('DEVICE_MODAL.DEVICE_NAME')}
              disabled
            />
          </Form.Item>
          <Form.Item label={t('DEVICE_MODAL.DEVUI')} name='devEUI'>
            <Input
              className='w-full p-3 pl-4 rounded-md'
              placeholder={
                deviceData?.devEUI ? deviceData.devEUI : t<string>('DEVICE_MANAGEMENT.NO_DEVICE_ID')
              }
              disabled
            />
          </Form.Item>
          <Form.Item
            label={
              <span>
                {t('DEVICE_MODAL.FIELD')} <span className='text-red-500'>*</span>
              </span>
            }
            name='fieldCalculate'
            rules={validator}
          >
            <Select
              allowClear
              loading={telemetryLoading}
              options={fieldOptions}
              className='w-full rounded-md h-10'
              placeholder={t<string>('DEVICE_MODAL.SELECT_FIELD')}
            />
          </Form.Item>
          <Form.Item
            label={
              <span>
                {t('DEVICE_MODAL.DEVICE_TYPE')} <span className='text-red-500'>*</span>
              </span>
            }
            name='deviceType'
            rules={validator}
          >
            <Select
              allowClear
              options={deviceTypeOptions.map((option) => ({
                ...option,
                label: t(option.label),
              }))}
              className='w-full rounded-md h-10'
              placeholder={t<string>('DEVICE_MODAL.SELECT_DEVICE_TYPE')}
            />
          </Form.Item>
        </div>
        <div className='mt-2 mb-2 font-semibold text-gray-700'>
          {t('DEVICE_MODAL.TECHNICAL_SPECIFICATIONS')}
        </div>
        <div className='bg-gray-50 rounded-xl p-4 flex flex-col md:flex-row gap-4'>
          <Form.Item
            label={
              <span>
                {t('DEVICE_MODAL.METER_TYPE')} <span className='text-red-500'>*</span>
              </span>
            }
            name='meterType'
            className='flex-1'
            rules={validator}
          >
            <Select
              allowClear
              options={meterTypeOptions.map((option) => ({
                ...option,
                label: t(option.label),
              }))}
              className='w-full rounded-md h-10'
              placeholder={t<string>('DEVICE_MODAL.SELECT_METER_TYPE')}
            />
          </Form.Item>
          <Form.Item
            label={
              <span>
                {t('DEVICE_MODAL.VOLTAGE')} <span className='text-red-500'>*</span>
              </span>
            }
            className='flex-1'
          >
            <div className='flex gap-2'>
              <Form.Item name='voltageValue' noStyle rules={validator}>
                <Input
                  className='rounded-md h-10'
                  placeholder={t<string>('DEVICE_MODAL.VOLTAGE')}
                />
              </Form.Item>
              <Form.Item name='voltageUnit' noStyle rules={validator}>
                <Select
                  allowClear
                  options={voltageUnitOptions.map((option) => ({
                    ...option,
                    label: t(option.label),
                  }))}
                  className='w-20 rounded-md h-10'
                  placeholder={t<string>('DEVICE_MODAL.SELECT_VOLTAGE_UNIT')}
                />
              </Form.Item>
            </div>
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
};

export default SettingDeviceModal;
