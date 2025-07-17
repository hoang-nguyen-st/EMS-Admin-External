import { CloseOutlined } from '@ant-design/icons';
import { Modal, Input, Select, Button, Form, Typography } from 'antd';
import { Rule } from 'antd/lib/form';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { useDeviceModalSchema } from './DeviceModalSchema';
import { DeviceType } from '@app/constants';
import { yupSync } from '@app/helpers/yupSync';

const { Title } = Typography;

const fieldOptions = [{ value: 'energy_export', label: 'Energy export' }];
const deviceTypeOptions = [
  { value: DeviceType.ELECTRIC, label: 'Electricity' },
  { value: DeviceType.WATER, label: 'Water' },
  { value: DeviceType.GAS, label: 'Gas' },
];
const meterTypeOptions = [{ value: 'energy_export', label: 'Energy export' }];
const voltageUnitOptions = [
  { value: 'V', label: 'V' },
  { value: 'kV', label: 'kV' },
];

interface SettingDeviceModalProps {
  open: boolean;
  onCancel: () => void;
  onSave: (values: any) => void;
}

const SettingDeviceModal: FC<SettingDeviceModalProps> = ({ open, onCancel, onSave }) => {
  const [form] = Form.useForm();
  const schema = useDeviceModalSchema();
  const validator = [yupSync(schema)] as unknown as Rule[];
  const { t } = useTranslation();
  const handleFinish = (values: any) => {
    onSave(values);
    form.resetFields();
  };
  return (
    <Modal
      open={open}
      footer={
        <div className='flex items-center justify-end gap-x-4 mt-8'>
          <Button
            onClick={() => {
              form.resetFields();
              onCancel();
            }}
            className='px-8 h-[3rem] bg-white text-gray-600 font-bold outline-none rounded-2xl hover:text-black transition duration-300'
          >
            {t('DEVICE_MODAL.CANCEL')}
          </Button>
          <Button
            onClick={() => form.submit()}
            type='primary'
            htmlType='submit'
            className='px-8 h-[3rem] bg-[#465FFF] text-white font-bold border-none outline-none rounded-2xl hover:!bg-primary-second hover:text-black transition duration-300'
          >
            {t('DEVICE_MODAL.SAVE')}
          </Button>
        </div>
      }
      closable={false}
      width={700}
      className='rounded-3xl'
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
              className='w-full p-3 pl-4 rounded-2xl'
              placeholder={t<string>('DEVICE_MODAL.DEVICE_NAME')}
              disabled
            />
          </Form.Item>
          <Form.Item label={t('DEVICE_MODAL.DEVUI')} name='devUI'>
            <Input
              className='w-full p-3 pl-4 rounded-2xl'
              placeholder={t<string>('DEVICE_MODAL.DEVUI')}
              disabled
            />
          </Form.Item>
          <Form.Item
            label={
              <span>
                {t('DEVICE_MODAL.FIELD')} <span className='text-red-500'>*</span>
              </span>
            }
            name='field'
            rules={validator}
          >
            <Select
              allowClear
              options={fieldOptions}
              className='w-full rounded-2xl h-10'
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
              options={deviceTypeOptions}
              className='w-full rounded-2xl h-10'
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
              options={meterTypeOptions}
              className='w-full rounded-2xl h-10'
              placeholder={t<string>('DEVICE_MODAL.SELECT_METER_TYPE')}
            />
          </Form.Item>
          <Form.Item
            label={
              <span>
                {t('DEVICE_MODAL.VOLTAGE')} <span className='text-red-500'>*</span>
              </span>
            }
            name='voltage'
            className='flex-1'
            rules={validator}
          >
            <div className='flex gap-2'>
              <Input className='rounded-2xl h-10' placeholder={t<string>('DEVICE_MODAL.VOLTAGE')} />
              <Form.Item name='voltageUnit' noStyle rules={validator}>
                <Select
                  allowClear
                  options={voltageUnitOptions}
                  className='w-20 rounded-2xl h-10'
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
