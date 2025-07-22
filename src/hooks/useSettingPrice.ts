import { useQuery } from '@tanstack/react-query';

import { QUERY_KEY } from '@app/constants';
import { ApiResponse } from '@app/interface/common.interface';
import { LocationType, MeterTypePricing, TariffTier } from '@app/interface/settingPrice.interface';
import { getLocationTypeApi, getPricingElectricRuleApi } from '@app/services/settingPriceAPI';

export const useLocationTypes = () => {
  return useQuery<ApiResponse<LocationType[]>>({
    queryKey: [QUERY_KEY.LOCATION_TYPE],
    queryFn: () => getLocationTypeApi().then((res) => res.data),
  });
};

export const usePricingElectricRules = (locationTypeId: string) => {
  return useQuery<ApiResponse<TariffTier[] | MeterTypePricing[]>>({
    queryKey: [QUERY_KEY.PRICING_ELECTRIC_RULE, locationTypeId],
    queryFn: () => getPricingElectricRuleApi(locationTypeId).then((res) => res.data),
    enabled: !!locationTypeId,
  });
};
