import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

import DashboardLayout from '@app/components/templates/DashboardLayout/DashboardLayout';
import { NAVIGATE_URL } from '@app/constants';
import { ProjectManagement, UserManagement, UserDetail } from '@app/pages';

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
            path: NAVIGATE_URL.PROJECT_MANAGEMENT,
            element: <ProjectManagement />,
          },
          {
            path: NAVIGATE_URL.USER_MANAGEMENT,
            element: <UserManagement />,
          },
          {
            path: `${NAVIGATE_URL.USER_MANAGEMENT}/:id`,
            element: <UserDetail />,
          },
        ],
      },
    ],
  },
];

export default routes;
