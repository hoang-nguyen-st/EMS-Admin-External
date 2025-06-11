import axios from 'axios';

import { API_URL } from '@app/constants';

export const getProjectsAPI = async (filters: any) =>
  await axios.get(API_URL.PROJECTS, {
    params: {
      ...filters,
    },
  });
