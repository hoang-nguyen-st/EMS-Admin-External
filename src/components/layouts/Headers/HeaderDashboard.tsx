import {
  SearchOutlined,
  DownOutlined,
  MenuOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';
import { Input, Layout, Dropdown, Button } from 'antd';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { useLogout } from '@app/hooks';
import { CollapseProps, CollapseHandle } from '@app/interface/common.interface';
import { RootState } from '@app/redux/store';
import type { MenuProps } from 'antd';

const { Header: HeaderAntd } = Layout;

export const Header = ({
  collapsed,
  handleCollapsed,
  toggleMobileDrawer,
}: CollapseProps & CollapseHandle) => {
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
    <HeaderAntd
      id='header-dashboard'
      className='px-6 bg-white flex items-center justify-between shadow-sm'
    >
      <div className='flex items-center gap-x-4'>
        <Button
          type='text'
          icon={<MenuOutlined />}
          onClick={toggleMobileDrawer}
          className='text-2xl md:hidden'
        />
        <Button
          type='text'
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={handleCollapsed}
          className='text-2xl hidden md:block'
        />
        <Input
          placeholder={t<string>('DASHBOARD.SEARCH')}
          className='w-[220px] md:w-[430px] py-2 bg-gray-100'
          prefix={<SearchOutlined className='text-gray-500 text-2xl mr-2' />}
        />
      </div>
      <div className='flex items-center space-x-4'>
        <Dropdown className='flex items-center gap-x-2' menu={{ items }} trigger={['click']}>
          <Button className='bg-white border-none cursor-pointer shadow-none'>
            <span className='h-8 w-8 bg-red-200 rounded-full'></span>
            <div className='text-black'>{user?.name}</div>
            <div>
              <DownOutlined className='cursor-pointer text-black' />
            </div>
          </Button>
        </Dropdown>
      </div>
    </HeaderAntd>
  );
};
