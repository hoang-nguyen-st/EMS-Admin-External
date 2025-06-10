import { Layout, Image } from 'antd';
import { Outlet } from 'react-router-dom';

import SignInArea from '@app/assets/images/sign_in_area.png';

import './PublicLayout.scss';

const PublicLayout = () => (
  <Layout className='grid grid-cols-1 md:grid-cols-2 h-screen w-screen overflow-hidden'>
    <div>
      <Outlet />
    </div>
    <div className='overflow-hidden hidden md:block'>
      <Image
        draggable={false}
        preview={false}
        src={SignInArea}
        width={'100%'}
        height={'100%'}
        alt='logo'
      />
    </div>
  </Layout>
);

export default PublicLayout;
