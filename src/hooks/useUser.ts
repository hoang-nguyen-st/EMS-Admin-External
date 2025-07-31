import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { openNotificationWithIcon, NotificationTypeEnum } from '@app/components/molecules/index';
import { NAVIGATE_URL, QUERY_KEY } from '@app/constants';
import {
  CreateUserDto,
  GetUsersParams,
  UserDetail,
  UserSummarizeResponse,
} from '@app/interface/user.interface';
import {
  createUserByAdmin,
  createUser,
  deleteUserAPI,
  getUserByIdAPI,
  getUsersAPI,
  updateUser,
  getUsersLocationAPI,
  getUserSummarizeAPI,
} from '@app/services';

export const useCreateUser = () => {
  const navigate = useNavigate();
  return useMutation(
    async (formData: FormData) => {
      const response = await createUser(formData);
      return response.data;
    },
    {
      onSuccess() {
        navigate(NAVIGATE_URL.USERS);
      },
    },
  );
};

export const useCreateUserByAdmin = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (data: CreateUserDto) => {
      return await createUserByAdmin(data);
    },
    {
      onSuccess: ({ data }) => {
        queryClient.invalidateQueries({ queryKey: [QUERY_KEY.USERS] });
        openNotificationWithIcon(NotificationTypeEnum.SUCCESS, data.message);
      },
      onError: ({ response }) => {
        openNotificationWithIcon(NotificationTypeEnum.ERROR, response.data.message);
      },
    },
  );
};

export const useGetUsers = (params: GetUsersParams) =>
  useQuery(
    [QUERY_KEY.USERS, params.search, params.status, params.page, params.take],
    async () => {
      const { data } = await getUsersAPI(params);
      return data;
    },
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  );

export const useGetUserById = (id: string) =>
  useQuery([QUERY_KEY.USERS, id], async () => {
    const { data } = await getUserByIdAPI(id);
    return data.data;
  });

export const useUpdateUser = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation(
    async (user: UserDetail) => {
      const response = await updateUser(user);
      return response.data;
    },
    {
      onSuccess() {
        queryClient.refetchQueries([QUERY_KEY.USERS]);
        queryClient.refetchQueries([QUERY_KEY.PROFILE]);
        navigate(NAVIGATE_URL.USERS);
      },
    },
  );
};

export const useDeleteUser = () => {
  return useMutation(async (id: number) => {
    const response = await deleteUserAPI(id);
    return response.data;
  });
};

export const useGetUsersLocation = () =>
  useQuery<{ data: UserDetail[] }>(
    [QUERY_KEY.USERS],
    async () => {
      const { data } = await getUsersLocationAPI();
      return data;
    },
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  );

export const useGetUserSummarize = () =>
  useQuery<UserSummarizeResponse>([QUERY_KEY.USERS_SUMMARIZE], async () => {
    const { data } = await getUserSummarizeAPI();
    return data.data;
  });
