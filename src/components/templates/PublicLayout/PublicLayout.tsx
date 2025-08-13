import { Layout, Image } from 'antd';
import { useTranslation } from 'react-i18next';
import { Outlet } from 'react-router-dom';

import SignInArea from '@app/assets/images/sign_in_area.png';
import Logo from '@app/assets/logo.png';
import './PublicLayout.scss';

const PublicLayout = () => {
  const { t } = useTranslation();

  return (
    <Layout className='grid grid-cols-1 md:grid-cols-2 h-screen w-screen overflow-hidden'>
      <div>
        <Outlet />
      </div>
      <div className='overflow-hidden hidden md:block relative'>
        <Image
          draggable={false}
          preview={false}
          src={SignInArea}
          width={'100%'}
          height={'100%'}
          alt='logo'
        />
        <div className='absolute inset-0 flex items-center justify-center'>
          <div className='flex flex-col items-center gap-y-4 w-1/2'>
            <div className='flex items-center gap-x-2'>
              <Image preview={false} src={Logo} width={40} height={40} />
              <h1 className='text-white'>EMS</h1>
            </div>
            <p className='text-base text-center text-gray-400'>
              {t<string>('PUBLIC_LAYOUT.TITLE')}
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PublicLayout;
