import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

import DashboardLayout from '@app/components/templates/DashboardLayout/DashboardLayout';
import { UserDetail, UserManagement } from '@app/pages';

const PrivateLayout = lazy(() => import('@app/components/templates/PrivateLayout'));
const NotFound = lazy(() => import('@app/pages/NotFound/NotFound'));
const Forbidden = lazy(() => import('@app/pages/Forbidden/Forbidden'));

const routes: RouteObject[] = [
  {
    element: <PrivateLayout />,
    children: [
      {
        path: '404',
        element: <NotFound />,
      },
      {
        path: '403',
        element: <Forbidden />,
      },
      {
        element: <DashboardLayout />,
        children: [
          {
            path: '/',
            element: <h1>Dashboard Overview</h1>,
          },
          {
            path: 'user-management',
            element: <UserManagement />,
          },
          {
            path: 'user/:id',
            element: <UserDetail />,
          },
        ],
      },
    ],
  },
];

export default routes;
