import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';

import { Header } from '@app/components/layouts/Headers';
import { Sidebar } from '@app/components/layouts/Sidebars';

function DashboardLayout() {
  return (
    <Layout className='min-h-screen'>
      <Sidebar />
      <Layout>
        <Header />
        <main className='p-10'>
          <Outlet />
        </main>
      </Layout>
    </Layout>
  );
}

export default DashboardLayout;
