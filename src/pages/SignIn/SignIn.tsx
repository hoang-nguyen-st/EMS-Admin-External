import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { Button, Form, Input, message } from 'antd';
import { Rule } from 'antd/lib/form';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';

import { useSignInSchema } from './SignInSchema';
import { yupSync } from '@app/helpers/yupSync';
import { useActivateAccount, useLogin } from '@app/hooks';
import { Credentials } from '@app/interface/user.interface';
import { RootState } from '@app/redux/store';
import './SignIn.scss';

const SignIn = () => {
  const { mutate: handleLogin } = useLogin();
  const { mutate: handleActivateAccount } = useActivateAccount();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const signInSchema = useSignInSchema();
  const { isAuth } = useSelector((state: RootState) => state.auth);

  const validator = [yupSync(signInSchema)] as unknown as Rule[];

  const onFinish = (credentials: Credentials) => {
    handleLogin(credentials);
  };

  useEffect(() => {
    if (isAuth) {
      navigate('/', { replace: true });
      return;
    }

    const searchParams = new URLSearchParams(window.location.search);
    const activateToken = searchParams.get('activateToken');
    if (activateToken) {
      handleActivateAccount(activateToken);
      navigate('/sign-in', { replace: true });
    }
  }, [isAuth]);

  return (
    <div className='flex items-center justify-center h-full w-full bg-white'>
      <div className='w-[80vw] md:w-[35vw]'>
        <h1 className='text-4xl'>{t('LOGIN.TEXT')}</h1>
        <p className='mt-4 mb-8 text-gray-400'>{t<string>('LOGIN.POLICY')}</p>
        <Form id='form-sign-in-custom' form={form} onFinish={onFinish} layout='vertical'>
          <Form.Item
            label={t<string>('LOGIN.EMAIL')}
            name='email'
            className='mb-10'
            rules={validator}
          >
            <Input
              className='w-full py-3 pl-4 pr-3 custom-input'
              placeholder={t<string>('LOGIN.EMAIL_INPUT')}
            />
          </Form.Item>
          <Form.Item label={t<string>('LOGIN.PASSWORD')} name='password' rules={validator}>
            <Input.Password
              className='w-full py-3 pl-4 pr-3 custom-input'
              placeholder={t<string>('LOGIN.PASSWORD_INPUT')}
              iconRender={(visible) =>
                visible ? (
                  <EyeOutlined color='#69c0ff' size={24} />
                ) : (
                  <EyeInvisibleOutlined color='#69c0ff' size={24} />
                )
              }
            />
          </Form.Item>
          <div className='text-lg text-white flex justify-end items-center'>
            <Link to='/forgot-password' className='transition duration-300 text-base'>
              {t('LOGIN.FORGOT_PASSWORD')}
            </Link>
          </div>
          <Form.Item className='mt-6'>
            <Button
              type='primary'
              htmlType='submit'
              className='w-full h-[3.75rem] bg-primary-bold text-[1rem] text-white font-bold border-none outline-none rounded-md hover:!bg-primary-second hover:text-black transition duration-300'
            >
              {t('LOGIN.TEXT')}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
export default SignIn;
