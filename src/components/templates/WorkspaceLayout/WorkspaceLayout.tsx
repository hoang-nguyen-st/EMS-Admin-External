import { DownOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Dropdown, Image, Input, Layout } from 'antd';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

import logo from '@app/assets/logo.png';
import { useLogout } from '@app/hooks';
import { RootState } from '@app/redux/store';
import type { MenuProps } from 'antd';
import './WorkspaceLayout.scss';

const { Header } = Layout;

const WorkspaceLayout = () => {
  const { t } = useTranslation();
  const { mutate: logout } = useLogout();
  const { user } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    logout();
  };

  const items: MenuProps['items'] = [
    {
      label: <p>{t('PROFILE.LOGOUT')}</p>,
      key: '0',
      onClick: handleLogout,
    },
  ];

  return (
    <Layout id='workspace-layout'>
      <Header className='bg-[#393939] h-[76px] flex items-center justify-between text-white'>
        <div className='flex items-center gap-x-8 w-[80%] mx-auto'>
          <div className='flex items-center gap-x-2'>
            <div>
              <Image preview={false} src={logo} alt='logo' width={30} height={30} />
            </div>
            <h1>EMS</h1>
          </div>
          <div>
            <Input
              placeholder={t<string>('DASHBOARD.SEARCH')}
              className='custom-search-input w-[220px] h-[36px] md:w-[430px] py-2'
              prefix={<SearchOutlined className='text-white text-xl mr-2' />}
              style={
                {
                  backgroundColor: 'transparent',
                  border: '1px solid #4a4a4a',
                  borderRadius: '8px',
                  '--input-bg': 'transparent',
                  '--input-color': 'white',
                } as React.CSSProperties
              }
            />
          </div>
        </div>
        <div>
          <Dropdown
            className='flex items-center gap-x-2 hover:!bg-transparent'
            menu={{ items }}
            trigger={['click']}
          >
            <Button className='bg-transparent border-none cursor-pointer shadow-none '>
              <span className='h-8 w-8 bg-red-200 rounded-full'></span>
              <div className='text-white'>{user?.name}</div>
              <div>
                <DownOutlined className='cursor-pointer text-white' />
              </div>
            </Button>
          </Dropdown>
        </div>
      </Header>
      <main className='bg-[#1F2022] h-screen'>
        <Outlet />
      </main>
    </Layout>
  );
};

export default WorkspaceLayout;
