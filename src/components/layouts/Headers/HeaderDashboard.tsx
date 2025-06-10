import { SearchOutlined, BellOutlined, MoonOutlined, DownOutlined } from '@ant-design/icons';
import { Input, Layout, Dropdown } from 'antd';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { NAVIGATE_URL } from '@app/constants';
import { useLogout } from '@app/hooks';
import { RootState } from '@app/redux/store';
import type { MenuProps } from 'antd';

const { Header: HeaderAntd } = Layout;

export const Header = () => {
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
    <HeaderAntd id='header-dashboard' className='px-6 bg-white flex items-center justify-between'>
      <div>
        <Input
          placeholder={t<string>('DASHBOARD.SEARCH')}
          className='w-[430px] py-2 bg-gray-100'
          prefix={<SearchOutlined className='text-gray-500 text-2xl mr-2' />}
        />
      </div>
      <div className='flex items-center space-x-4'>
        <MoonOutlined className='text-gray-500 text-lg cursor-pointer' />
        <BellOutlined className='text-yellow-400 text-lg cursor-pointer' />
        <Dropdown className='flex items-center gap-x-2' menu={{ items }} trigger={['click']}>
          <button className='bg-white border-none cursor-pointer'>
            <span className='h-8 w-8 bg-red-200 rounded-full'></span>
            <div className='text-black'>{user?.name}</div>
            <div>
              <DownOutlined className='cursor-pointer text-black' />
            </div>
          </button>
        </Dropdown>
      </div>
    </HeaderAntd>
  );
};
