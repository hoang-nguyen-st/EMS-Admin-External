import axios from 'axios';

import { API_URL } from '@app/constants';

export const getLocationTypeApi = () => axios.get(API_URL.LOCATION_TYPE);
export const getPricingElectricRuleApi = (locationTypeId: string) =>
  axios.get(`${API_URL.ELECTRIC_PRICE}/${locationTypeId}`);
