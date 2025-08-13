import { Layout, Drawer } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';

import { Header } from '@app/components/layouts/Headers';
import { Sidebar } from '@app/components/layouts/Sidebars';
import { NAVIGATE_URL } from '@app/constants';
import { RootState } from '@app/redux/store';

import './DashboardLayout.scss';

function DashboardLayout() {
  const { isAuth } = useSelector((state: RootState) => state.auth);
  const [collapsed, setCollapsed] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false); // State for mobile drawer
  const navigate = useNavigate();

  const handleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const toggleMobileDrawer = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  useEffect(() => {
    if (!isAuth) {
      navigate(NAVIGATE_URL.SIGN_IN, { replace: true });
    }
  }, [isAuth, navigate]);

  return (
    <Layout className='min-h-screen'>
      <div className='hidden md:block'>
        <Sidebar collapsed={collapsed} />
      </div>

      <Drawer
        placement='left'
        closable={true}
        onClose={() => setMobileDrawerOpen(false)}
        open={mobileDrawerOpen}
        width={220}
        className='md:hidden sidebar-custom'
      >
        <Sidebar collapsed={false} />
      </Drawer>

      <Layout>
        <Header
          collapsed={collapsed}
          handleCollapsed={handleCollapsed}
          toggleMobileDrawer={toggleMobileDrawer}
        />
        <main className='p-10 overflow-auto'>
          <Outlet />
        </main>
      </Layout>
    </Layout>
  );
}

export default DashboardLayout;
