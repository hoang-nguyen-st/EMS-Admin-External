import axios from 'axios';

import { API_URL } from '@app/constants';

export const getLocationAPI = async () => await axios.get(API_URL.LOCATIONS);

export const getAllLocationAPI = async () => await axios.get(API_URL.ALL_LOCATIONS);
