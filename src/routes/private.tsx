import { lazy } from 'react';

import DashboardLayout from '@app/components/templates/DashboardLayout/DashboardLayout';
import { ProjectManagement } from '@app/pages';

const PrivateLayout = lazy(() => import('@app/components/templates/PrivateLayout'));
const NotFound = lazy(() => import('@app/pages/NotFound/NotFound'));
const Forbidden = lazy(() => import('@app/pages/Forbidden/Forbidden'));

const routes = [
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
        ],
      },
    ],
  },
];

export default routes;
