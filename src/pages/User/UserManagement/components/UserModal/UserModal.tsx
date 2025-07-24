import { SyncOutlined } from '@ant-design/icons';
import { Modal, Button, Form, Input, DatePicker, Select } from 'antd';
import { Rule } from 'antd/lib/form';
import { FC, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { useUserModalSchema } from './UserModalSchema';
import { yupSync } from '@app/helpers/yupSync';
import { useCreateUserByAdmin } from '@app/hooks';
import { CreateUserDto, UserColumns } from '@app/interface/user.interface';
export interface UserModalProps {
  visible: boolean;
  user: UserColumns | null;
  onCancel: () => void;
  onSubmit: () => void;
}

const UserModal: FC<UserModalProps> = ({ visible, user, onCancel, onSubmit }) => {
  const { t } = useTranslation();
  const [isMounted, setIsMounted] = useState(false);

  const [form] = Form.useForm();
  const signInSchema = useUserModalSchema();

  const validator = [yupSync(signInSchema)] as unknown as Rule[];
  const { mutate: handleCreateUser, isLoading } = useCreateUserByAdmin();
  const onFinish = (credentials: CreateUserDto) => {
    handleCreateUser(credentials, {
      onSuccess: () => {
        onCancel();
        form.resetFields();
      },
    });
  };

  useEffect(() => {
    if (visible) {
      setIsMounted(true);
    }
  }, [visible]);

  const handleAfterClose = () => {
    setIsMounted(false);
  };

  if (!isMounted && !visible) {
    return null;
  }

  return (
    <Modal
      open={visible}
      onCancel={onCancel}
      afterClose={handleAfterClose}
      footer={
        <div>
          <div className='flex items-center justify-end gap-x-4'>
            <Form.Item>
              <Button
                onClick={onCancel}
                className='px-8 h-[3rem] bg-white text-gray-600 font-bold outline-none rounded-2xl hover:text-black transition duration-300'
              >
                {t('BUTTON.CANCEL')}
              </Button>
            </Form.Item>
            <Form.Item>
              <Button
                loading={isLoading && { icon: <SyncOutlined spin /> }}
                onClick={() => form.submit()}
                type='primary'
                htmlType='submit'
                className='px-8 h-[3rem] bg-[#465FFF] text-white font-bold border-none outline-none rounded-2xl hover:!bg-primary-second hover:text-black transition duration-300'
              >
                {t('BUTTON.CREATE')}
              </Button>
            </Form.Item>
          </div>
        </div>
      }
      width={700}
    >
      <h1 className='text-center'>
        {user ? t<string>('USER_MANAGEMENT.EDIT') : t<string>('USER_MANAGEMENT.ADD')}
      </h1>
      <Form form={form} onFinish={onFinish} layout='vertical' className='px-4 mt-4'>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-4'>
          <Form.Item label={t<string>('USER.NAME')} name='name' rules={validator}>
            <Input className='w-full p-3 pl-4' placeholder={t<string>('USER.NAME')} />
          </Form.Item>
          <Form.Item label={t<string>('USER.EMAIL')} name='email' rules={validator}>
            <Input name='email' className='w-full p-3 pl-4' placeholder={t<string>('USER.EMAIL')} />
          </Form.Item>
          <Form.Item label={t<string>('USER.PHONE')}>
            <Form.Item name='phone' noStyle rules={validator}>
              <Input className='p-3 pr-4' placeholder={t<string>('USER.PHONE')} />
            </Form.Item>
          </Form.Item>
          <Form.Item label={t<string>('USER.DATE_OF_BIRTH')} name='dateOfBirth' rules={validator}>
            <DatePicker
              placeholder={t<string>('USER.DATE_OF_BIRTH')}
              className='py-3 w-full pr-3'
            />
          </Form.Item>
        </div>
        <Form.Item
          label={t<string>('USER.ADDRESS')}
          name='address'
          rules={validator}
          className='col-span-2'
        >
          <Input className='w-full p-3 pl-4' placeholder={t<string>('USER.ADDRESS')} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UserModal;
