import { Select } from 'antd';

import { useGetLocationTypeNames } from '@app/hooks/useLocationType';

const LocationTypeSelect = () => {
  const { data: locationTypeNames } = useGetLocationTypeNames();
  return (
    <Select
      placeholder='Chọn loại địa điểm'
      options={locationTypeNames?.data.map((locationType) => ({
        label: locationType.name,
        value: locationType.id,
      }))}
      className='w-[200px] max-w-[200px] h-[40px]'
    />
  );
};

export default LocationTypeSelect;
