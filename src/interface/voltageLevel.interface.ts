import { PricingRule } from './settingPrice.interface';

export interface VoltageLevel {
  id: string;
  name: string;
  fromVoltage: number;
  toVoltage: number;
}

export interface VoltageLevelRules {
  voltageLevel: VoltageLevel;
  rules: PricingRule[];
}
