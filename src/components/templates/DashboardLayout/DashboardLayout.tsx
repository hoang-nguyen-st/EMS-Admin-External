import { Layout } from 'antd';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';

import { Header } from '@app/components/layouts/Headers';
import { Sidebar } from '@app/components/layouts/Sidebars';
import { NAVIGATE_URL } from '@app/constants';
import { RootState } from '@app/redux/store';

function DashboardLayout() {
  const { isAuth } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) {
      navigate(NAVIGATE_URL.SIGN_IN, { replace: true });
    }
  }, []);
  return (
    <Layout>
      <Sidebar />
      <Layout>
        <Header />
        <main className='p-10 overflow-auto'>
          <Outlet />
        </main>
      </Layout>
    </Layout>
  );
}

export default DashboardLayout;
