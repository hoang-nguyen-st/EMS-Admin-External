import { LocationTypeEnum } from '@app/constants/enum';

export interface LocationType {
  id: string;
  name: string;
  description: string;
  isTariffTier: boolean;
  locationTypeEnum: LocationTypeEnum;
}
