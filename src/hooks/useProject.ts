import { useQuery } from '@tanstack/react-query';

import { QUERY_KEY } from '@app/constants';
import { ProjectFilters } from '@app/interface/project-management';
import { getProjectsAPI } from '@app/services/projectAPI';

export const useGetProjects = (filters: ProjectFilters) => {
  return useQuery([QUERY_KEY.PROJECT, filters], async () => {
    const data = await getProjectsAPI(filters);
    return data.data;
  });
};
