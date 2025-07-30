import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { NAVIGATE_URL, QUERY_KEY } from '@app/constants';
import {
  GetUsersParams,
  UserDetail,
  UserTotalStatus,
  UserSummarizeResponse,
} from '@app/interface/user.interface';
import {
  createUser,
  deleteUserAPI,
  getUserByIdAPI,
  getUserSummarizeAPI,
  getUsersAPI,
  updateUser,
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

export const useGetUsers = (params: GetUsersParams) =>
  useQuery([QUERY_KEY.USERS, params.search, params.status, params.page, params.take], async () => {
    const { data } = await getUsersAPI(params);
    return data;
  });

export const useGetUserById = (id: number) =>
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

export const useGetUserSummarize = () =>
  useQuery<UserSummarizeResponse>([QUERY_KEY.USERS_SUMMARIZE], async () => {
    const { data } = await getUserSummarizeAPI();
    return data.data;
  });
