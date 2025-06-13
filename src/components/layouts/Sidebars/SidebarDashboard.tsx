import { FolderOutlined, UserOutlined } from '@ant-design/icons';
import { Layout, Image, Menu, MenuProps } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import logo from '@app/assets/logo.png';
import './SidebarDashboard.scss';

const { Sider } = Layout;

const SidebarMenu = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const menuItems: MenuProps['items'] = [
    {
      key: '1',
      label: <p className='text-primary-second'>{t<string>('SIDEBAR.PROJECT')}</p>,
      icon: <FolderOutlined className='!text-2xl !text-primary-second' />,
      onClick: () => {
        navigate('project-management', { replace: true });
      },
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
    // Example
    // {
    //   key: '1',
    //   label: <p className='text-primary-second'>{t<string>('SIDEBAR.PROJECT')}</p>,
    //   icon: <FolderOutlined className='!text-2xl !text-primary-second' />,
    //   onClick: () => {
    //     navigate('sign-in', { replace: true })
    //   },
    //   className: "focus:bg-primary-light"
    // },
  ];

  return <Menu theme='light' mode='inline' items={menuItems} className='rounded-xl' />;
};

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const { t } = useTranslation();

  const handleCollapse = (collapsed: boolean) => {
    setIsCollapsed(collapsed);
  };

  return (
    <Sider
      collapsible
      collapsed={isCollapsed}
      onCollapse={handleCollapse}
      width={292}
      className='h-screen bg-white border-[1px] shadow-md overflow-hidden'
    >
      <div className='px-6 pt-10 mb-2'>
        <div className='flex items-center gap-x-2'>
          <Image preview={false} src={logo} alt='logo' />
          {!isCollapsed && <h1 className='text-2xl'>EMS</h1>}
        </div>
        <div className='mt-8'>
          <p className={`text-gray-400 ${isCollapsed ? 'text-sm' : ''}`}>
            {t<string>('DASHBOARD.MENU')}
          </p>
        </div>
      </div>
      <div className='px-6'>
        <SidebarMenu />
      </div>
    </Sider>
  );
};

export { Sidebar, SidebarMenu };
