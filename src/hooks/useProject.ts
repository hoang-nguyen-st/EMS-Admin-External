import { useQuery } from '@tanstack/react-query';

import { QUERY_KEY } from '@app/constants';
import { getProjectsAPI } from '@app/services/projectAPI';

export const useGetProjects = (filters: any) => {
  return useQuery(
    [QUERY_KEY.PROJECT],
    async () => {
      const data = await getProjectsAPI(filters);
      return data;
    },
    {
      onSuccess(data) {
        console.log(data);
      },
    },
  );
};
