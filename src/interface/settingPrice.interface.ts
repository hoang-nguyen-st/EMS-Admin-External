import { VoltageLevelRules } from './voltageLevel.interface';
import { MeterTypeEnum, TimeUsageEnum } from '@app/constants/enum';

export interface MeterTypePricing {
  id: string;
  name: string;
  meterTypeEnum: MeterTypeEnum;
  rulesByVoltageLevel: VoltageLevelRules[];
}

export interface PricingRule {
  id: string;
  unitPrice: number;
  timeUsage: TimeUsageEnum;
}

export interface MeterPricingTableData {
  key: string;
  voltageLevel: string;
  time: string;
  unitPrice: number;
}
