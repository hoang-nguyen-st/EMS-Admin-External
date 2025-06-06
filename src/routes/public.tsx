import PublicLayout from '@app/components/templates/PublicLayout';
import { SignIn } from '@app/pages';

const routes = [
  {
    element: <PublicLayout />,
    children: [
      {
        path: '/sign-in',
        element: <SignIn />,
      },
    ],
  },
];

export default routes;
