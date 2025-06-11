import axios from 'axios';

import { API_URL } from '@app/constants';
import { ProjectFilters } from '@app/interface/project-management';

export const getProjectsAPI = async (filters: ProjectFilters) =>
  await axios.get(API_URL.PROJECTS, {
    params: {
      ...filters,
    },
  });
