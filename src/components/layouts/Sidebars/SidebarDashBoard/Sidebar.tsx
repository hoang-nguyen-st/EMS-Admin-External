import { Layout, Image } from 'antd';
import { useState } from 'react';

const { Sider } = Layout;

export const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  const handleCollapse = (collapsed: boolean) => {
    setIsCollapsed(collapsed);
  };
  return (
    <Sider
      collapsible
      collapsed={isCollapsed}
      onCollapse={handleCollapse}
      width={292}
      className='h-screen  bg-white border-[1px] shadow-md overflow-hidden'
    >
      <div className='px-6 pt-10 pb-6'>
        <div className='flex items-center gap-x-2'>
          <Image preview={false} src={'src/assets/logo.png'} alt='logo' />
          {!isCollapsed && <h1 className='text-2xl'>EMS</h1>}
        </div>
        <div className='mt-8'>
          <p className='text-gray-400'>MENU</p>
        </div>
      </div>
    </Sider>
  );
};
