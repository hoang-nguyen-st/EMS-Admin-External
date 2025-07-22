import { Layout, Menu, Image, MenuProps } from 'antd';
import {
  ChevronUp,
  ChevronDown,
  CircleUserRound,
  FolderRoot,
  LayoutGrid,
  Settings,
} from 'lucide-react';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

import Logo from '@app/assets/logo.png';
import { NAVIGATE_URL } from '@app/constants';
import './SidebarDashboard.scss';

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
      key: '/',
      label: (
        <p className={collapsed ? 'text-gray-200' : 'text-primary-second'}>
          {t<string>('SIDEBAR.DASHBOARD')}
        </p>
      ),
      icon: <LayoutGrid className='!text-2xl !text-primary-second' />,
      onClick: () => {
        navigate('/', { replace: true });
      },
      className: `focus:bg-primary-light ${
        location.pathname === '/' && '!bg-primary-light'
      } !pl-6 ${collapsed ? '!pt-1' : '!pt-0'}`,
    },
    {
      key: NAVIGATE_URL.PROJECT_MANAGEMENT,
      label: (
        <p className={collapsed ? 'text-gray-200' : 'text-primary-second'}>
          {t<string>('SIDEBAR.LOCATION')}
        </p>
      ),
      icon: <FolderRoot className='!text-2xl !text-primary-second' />,
      onClick: () => {
        navigate(NAVIGATE_URL.PROJECT_MANAGEMENT, { replace: true });
      },
      className: `focus:bg-primary-light ${
        location.pathname.includes(NAVIGATE_URL.PROJECT_MANAGEMENT) && '!bg-primary-light'
      } !pl-6 ${collapsed ? '!pt-1' : '!pt-0'}`,
    },
    {
      key: NAVIGATE_URL.USER_MANAGEMENT,
      label: (
        <p className={collapsed ? 'text-gray-200' : 'text-primary-second'}>
          {t<string>('SIDEBAR.USER')}
        </p>
      ),
      icon: <CircleUserRound className='!text-2xl !text-primary-second' />,
      onClick: () => {
        navigate(NAVIGATE_URL.USER_MANAGEMENT, { replace: true });
      },
      className: `focus:bg-primary-light ${
        location.pathname.includes(NAVIGATE_URL.USER_MANAGEMENT) && '!bg-primary-light'
      } !pl-6 ${collapsed ? '!pt-1' : '!pt-0'}`,
    },
    {
      key: 'price-settings',
      label: (
        <span className={collapsed ? 'text-gray-200' : 'text-primary-second'}>
          {t<string>('SIDEBAR.PRICE_SETTINGS')}
        </span>
      ),
      icon: <Settings className='!text-2xl !text-primary-second' />,
      className: `focus:bg-primary-light ${collapsed ? '!pt-1' : '!pt-0'}`,
      children: [
        {
          key: NAVIGATE_URL.ELECTRICITY_SETTING_PRICE,
          label: t<string>('SIDEBAR.ELECTRICITY_PRICE'),
          onClick: () => navigate(NAVIGATE_URL.ELECTRICITY_SETTING_PRICE, { replace: true }),
          className:
            location.pathname === NAVIGATE_URL.ELECTRICITY_SETTING_PRICE ? '!bg-primary-light' : '',
        },
        {
          key: NAVIGATE_URL.WATER_SETTING_PRICE,
          label: t<string>('SIDEBAR.WATER_PRICE'),
          onClick: () => navigate(NAVIGATE_URL.WATER_SETTING_PRICE, { replace: true }),
          className:
            location.pathname === NAVIGATE_URL.WATER_SETTING_PRICE ? '!bg-primary-light' : '',
        },
      ],
    },
  ];
  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      width={220}
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
        theme='light'
        mode='inline'
        className='!bg-white'
        defaultSelectedKeys={['1']}
        items={menuItems}
        expandIcon={({ isOpen }) => (
          <span className='flex items-center ml-10'>
            {isOpen ? (
              <ChevronUp className='text-primary-second transition-transform duration-200' />
            ) : (
              <ChevronDown className='text-primary-second transition-transform duration-200' />
            )}
          </span>
        )}
      />
    </Sider>
  );
};
