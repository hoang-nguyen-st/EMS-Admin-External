import axios from 'axios';

import { API_URL } from '@app/constants';
import { CreateLocationDto, LocationFilterProps } from '@app/interface/location.interface';

export const getLocationAPI = async () => await axios.get(API_URL.LOCATIONS);

export const getAllLocationAPI = async (params: LocationFilterProps) =>
  await axios.get(API_URL.ALL_LOCATIONS, { params });

export const createLocationAPI = async (data: CreateLocationDto) =>
  await axios.post(API_URL.LOCATIONS, data);

export const getLocationByIdAPI = async (id: string) =>
  await axios.get(`${API_URL.LOCATIONS}/${id}`);

export const updateLocationAPI = async (id: string, params: CreateLocationDto) =>
  await axios.patch(`${API_URL.LOCATIONS}/${id}`, params);
