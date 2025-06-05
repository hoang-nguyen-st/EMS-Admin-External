import { Layout, Image } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import logo from '@app/assets/logo.png';

const { Sider } = Layout;

export const Sidebar = () => {
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
      <div className='px-6 pt-10 pb-6'>
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
    </Sider>
  );
};
