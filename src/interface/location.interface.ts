import { LocationTypeEnum } from '@app/constants/enum';

export interface LocationDto {
  id: string;
  name: string;
  status: string;
  locationType: string;
}

export interface DeviceLocationResponseProps {
  name: string;
}

export interface LocationType {
  id: string;
  name: string;
  description: string;
  isTariffTier: boolean;
  locationTypeEnum: LocationTypeEnum;
}
