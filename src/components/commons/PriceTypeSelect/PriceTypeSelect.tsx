import { Select, SelectProps } from 'antd';
import { useTranslation } from 'react-i18next';

import { useGetPriceTypes } from '@app/hooks/useLocation';

const PriceTypeSelect = ({ ...props }: SelectProps) => {
  const { data: priceTypes } = useGetPriceTypes();
  const { t } = useTranslation();
  return (
    <Select
      placeholder={t<string>('LOCATION.PRICE_TYPE_PLACEHOLDER')}
      options={priceTypes?.map((priceType) => ({
        label: priceType.name,
        value: priceType.id,
      }))}
      {...props}
    />
  );
};

export default PriceTypeSelect;
