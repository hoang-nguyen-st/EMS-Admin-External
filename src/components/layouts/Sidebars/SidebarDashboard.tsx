import { FolderOutlined, HomeOutlined, UserOutlined } from '@ant-design/icons';
import { Layout, Menu, Image, MenuProps } from 'antd';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import Logo from '@app/assets/logo.png';

const { Sider } = Layout;

export const Sidebar = ({ collapsed }: { collapsed: boolean }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const menuItems: MenuProps['items'] = [
    // Example
    // {
    //   key: '1',
    //   label: (
    //     <p className={collapsed ? 'text-gray-200' : 'text-primary-second'}>
    //       {t<string>('SIDEBAR PROJECT')}
    //     </p>
    //   ),
    //   icon: <FolderOutlined className='!text-2xl !text-primary-second' />,
    //   onClick: () => {
    //     navigate('', { replace: true });
    //   },
    //   className: `focus:bg-primary-light !bg-white ${
    //     location.pathname === '/' && '!bg-primary-light'
    //   } !pl-6 ${collapsed ? '!pt-1' : '!pt-0'}`,
    // },
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
