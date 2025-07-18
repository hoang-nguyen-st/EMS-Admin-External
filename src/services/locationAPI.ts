import axios from 'axios';

import { API_URL } from '@app/constants';

export const getLocationAPI = async () => await axios.get(API_URL.LOCATIONS);
