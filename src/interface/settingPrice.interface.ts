import { LocationTypeEnum, MeterTypeEnum, TimeUsageEnum } from '@app/constants/enum';

export interface LocationType {
  id: string;
  name: string;
  description: string;
  isTariffTier: boolean;
  locationTypeEnum: LocationTypeEnum;
}

export interface TariffTier {
  id: string;
  name: string;
  kwh: number;
  unitPrice: number;
  level: number;
  locationType?: LocationType;
}

export interface MeterTypePricing {
  id: string;
  name: string;
  meterTypeEnum: MeterTypeEnum;
  rulesByVoltageLevel: VoltageLevelRules[];
}

export interface VoltageLevelRules {
  voltageLevel: VoltageLevel;
  rules: PricingRule[];
}

export interface VoltageLevel {
  id: string;
  name: string;
  fromVoltage: number;
  toVoltage: number;
}

export interface PricingRule {
  id: string;
  unitPrice: number;
  timeUsage: TimeUsageEnum;
}
