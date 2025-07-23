import axios from 'axios';

import { API_URL } from '@app/constants';

export const getLocationTypeNamesAPI = async () => await axios.get(API_URL.LOCATION_TYPES_NAMES);
