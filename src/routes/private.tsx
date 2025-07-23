import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

import DashboardLayout from '@app/components/templates/DashboardLayout';
import { NAVIGATE_URL } from '@app/constants';
import { DeviceManagement, ProjectManagement, UserDetail, UserManagement } from '@app/pages';
import DetailDevice from '@app/pages/DeviceManagement/DetailDevice';
import CreateLocationPage from '@app/pages/Locations/CreateLocation/CreateLocationPage';
import LocationManagement from '@app/pages/Locations/LocationManagement';

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
          {
            path: NAVIGATE_URL.LOCATION,
            children: [
              {
                index: true,
                element: <LocationManagement />,
              },
              {
                path: 'create',
                element: <CreateLocationPage />,
              },
            ],
          },
        ],
      },
    ],
  },
];

export default routes;
