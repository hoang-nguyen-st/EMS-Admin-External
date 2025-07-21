import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

import DashboardLayout from '@app/components/templates/DashboardLayout/DashboardLayout';
import { NAVIGATE_URL } from '@app/constants';
import { DeviceManagement } from '@app/pages';
import DetailDevice from '@app/pages/DeviceManagement/DetailDevice';

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
            path: NAVIGATE_URL.DEVICE_MANAGEMENT,
            children: [
              {
                index: true,
                element: <DeviceManagement />,
              },
              {
                path: ':id',
                element: <DetailDevice />,
              },
            ],
          },
        ],
      },
    ],
  },
];

export default routes;
