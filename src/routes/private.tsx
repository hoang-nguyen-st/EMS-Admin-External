import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

import DashboardLayout from '@app/components/templates/DashboardLayout/DashboardLayout';
import { ProjectManagement, UserManagement } from '@app/pages';

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
            path: '/project-management',
            element: <ProjectManagement />,
          },
          {
            path: 'user-management',
            element: <UserManagement />,
          },
          {
            path: '/',
            element: <h1>Dashboard Overview</h1>,
          },
        ],
      },
    ],
  },
];

export default routes;
