import { Layout, Image } from 'antd';
import { Outlet } from 'react-router-dom';

import './PublicLayout.scss';

const PublicLayout = () => (
  <Layout className='grid grid-cols-2 h-screen w-screen overflow-hidden'>
    <div>
      <Outlet />
    </div>
    <div>
      <Image
        draggable={false}
        preview={false}
        src={'src/assets/images/sign_in_area.png'}
        width={'100%'}
        alt='logo'
      />
    </div>
  </Layout>
);

export default PublicLayout;
