export interface LocationType {
  id: string;
  name: string;
  description: string;
  isTariffTier: boolean;
  locationTypeEnum: LocationTypeEnum;
}

export enum LocationTypeEnum {
  BUSINESS = 'BUSINESS',
  PRODUCTION = 'PRODUCTION',
  RESIDENTIAL = 'RESIDENTIAL',
}

export interface LocationTypeNames {
  id: string;
  name: string;
  locationTypeEnum: LocationTypeEnum;
}

export interface LocationFilterProps {
  search?: string;
  locationTypeId?: string;
}
