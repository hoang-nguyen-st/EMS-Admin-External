import { useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  NotificationTypeEnum,
  openNotificationWithIcon,
} from '@app/components/molecules/Notification/NotificationService';
import { removeStorageData, setStorageData } from '@app/config';
import { ACCESS_TOKEN, NAVIGATE_URL, REFRESH_TOKEN, USER_PROFILE } from '@app/constants';
import { Credentials } from '@app/interface/user.interface';
import { logout, login } from '@app/redux/features/auth/authSlice';
import { loginApi, getLogout } from '@app/services';

export const useLogin = () => {
  const navigate = useNavigate();
  const dispatchAuth = useDispatch();
  const { t } = useTranslation();

  return useMutation(
    async (credentials: Credentials) => {
      const { data } = await loginApi(credentials);
      return data;
    },
    {
      onSuccess: ({ data }) => {
        dispatchAuth(login());

        setStorageData(ACCESS_TOKEN, data.accessToken);
        setStorageData(REFRESH_TOKEN, data.refreshToken);

        navigate('/');
      },
      onError({ response }) {
        if (response.status === 401) {
          openNotificationWithIcon(NotificationTypeEnum.ERROR, response?.data?.message);
          return;
        }
        openNotificationWithIcon(NotificationTypeEnum.ERROR, t<string>('LOGIN.FAIL'));
      },
    },
  );
};

export const useLogout = () => {
  const navigate = useNavigate();
  const dispatchAuth = useDispatch();

  return useMutation(
    async () => {
      const { data } = await getLogout();
      return data;
    },
    {
      onSuccess: ({ message }) => {
        removeStorageData(ACCESS_TOKEN);
        removeStorageData(REFRESH_TOKEN);
        removeStorageData(USER_PROFILE);

        dispatchAuth(logout());

        navigate(NAVIGATE_URL.SIGN_IN);
      },
    },
  );
};
