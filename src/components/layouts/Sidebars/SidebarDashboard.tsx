import { AppstoreOutlined, UserOutlined } from '@ant-design/icons';
import { Layout, Menu, Image, MenuProps } from 'antd';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

import Logo from '@app/assets/logo.png';
const { Sider } = Layout;

export interface SidebarProps {
  collapsed: boolean;
}

export const Sidebar: FC<SidebarProps> = ({ collapsed }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const menuItems: MenuProps['items'] = [
    {
      key: 'dashboard-overview',
      label: (
        <p className={collapsed ? 'text-gray-200' : 'text-primary-second'}>
          {t<string>('DASHBOARD.TITLE')}
        </p>
      ),
      icon: <AppstoreOutlined className='!text-2xl !text-primary-second' />,
      onClick: () => {
        navigate('/', { replace: true });
      },
      className: `focus:bg-primary-light !bg-white ${
        location.pathname === '/' && '!bg-primary-light'
      } !pl-6 ${collapsed ? '!pt-1' : '!pt-0'}`,
    },
    {
      key: 'user-management',
      label: <p className='text-primary-second'>{t<string>('USER_MANAGEMENT.TITLE')}</p>,
      icon: <UserOutlined className='!text-2xl !text-primary-second' />,
      onClick: () => {
        navigate('user-management', { replace: true });
      },
      className: 'focus:bg-primary-light',
    },
  ];
  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      width={292}
      className='min-h-screen bg-white shadow-md'
    >
      <div
        className={`${
          collapsed ? 'p-4 justify-center' : 'p-6 justify-start'
        } bg-white flex items-center gap-x-2`}
      >
        <Image src={Logo} preview={false} />
        {!collapsed && <p className='text-2xl font-bold'>EMS</p>}
      </div>
      <Menu
        theme='dark'
        mode='inline'
        className='!bg-white'
        defaultSelectedKeys={['1']}
        items={menuItems}
      />
    </Sider>
  );
};
