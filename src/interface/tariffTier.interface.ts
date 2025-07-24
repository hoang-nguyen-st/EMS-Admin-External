import { LocationType } from './location.interface';

export interface TariffTier {
  id: string;
  name: string;
  kwh: number;
  unitPrice: number;
  level: number;
  locationType?: LocationType;
}

export interface TariffTableData {
  key: string;
  level: string;
  kwh: number;
  unitPrice: number;
}
