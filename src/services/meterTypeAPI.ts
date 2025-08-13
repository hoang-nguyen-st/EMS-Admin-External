import axios from 'axios';

import { API_URL } from '@app/constants';

export const getMeterTypesAPI = async () => await axios.get(API_URL.METER_TYPES);
