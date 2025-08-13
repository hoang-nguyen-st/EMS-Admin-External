import { Select, SelectProps } from 'antd';
import { useTranslation } from 'react-i18next';

import { useGetLocationTypeNames } from '@app/hooks/useLocationType';
import { LocationTypeNames } from '@app/interface/location-type.interface';

const LocationTypeSelect = ({ ...props }: SelectProps) => {
  const { data: locationTypes } = useGetLocationTypeNames();
  const { t } = useTranslation();

  return (
    <Select
      placeholder={t<string>('LOCATION.LOCATION_TYPE_PLACEHOLDER')}
      options={locationTypes?.data.map((locationType: LocationTypeNames) => ({
        label: locationType.name,
        value: locationType.id,
        locationTypeEnum: locationType.locationTypeEnum,
      }))}
      onChange={(value, option) => {
        props.onChange?.(value, option);
      }}
      {...props}
    />
  );
};

export default LocationTypeSelect;
