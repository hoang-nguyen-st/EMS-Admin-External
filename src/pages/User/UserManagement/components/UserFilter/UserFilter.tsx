import { SearchOutlined } from '@ant-design/icons';
import { Input, Select, DatePicker } from 'antd';
import { Dayjs } from 'dayjs';
import { debounce } from 'lodash';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { UserStatus } from '@app/constants';
const { RangePicker } = DatePicker;

export interface UserFilterProps {
  filters: {
    search: string;
    status?: UserStatus;
  };
  onSearchChange: (value: string) => void;
  onStatusChange: (value: UserStatus) => void;
  onDateChange: (dates: [Dayjs | null, Dayjs | null] | null, dateStrings: [string, string]) => void;
}

const UserFilter: FC<UserFilterProps> = ({
  filters,
  onSearchChange,
  onStatusChange,
  onDateChange,
}) => {
  const { t } = useTranslation();

  const handleSearchProject = debounce((value: string) => {
    onSearchChange(value);
  }, 500);

  return (
    <div className='user-filter'>
      <div className='grid grid-cols-2'>
        <div className='w-1/2'>
          <Input
            onChange={(e) => handleSearchProject(e.currentTarget.value)}
            placeholder={t<string>('USER_MANAGEMENT.SEARCH')}
            className='h-10 bg-white rounded-lg'
            prefix={<SearchOutlined className='text-gray-500 text-2xl mr-2' />}
          />
        </div>
        <div className='flex items-center gap-4 justify-end mb-4'>
          <Select
            allowClear
            onChange={onStatusChange}
            className={'h-10 w-40'}
            value={filters.status}
            placeholder={'Status'}
            options={[
              { value: UserStatus.ACTIVE, label: 'Active' },
              { value: UserStatus.INACTIVE, label: 'Inactive' },
            ]}
          />
          <RangePicker
            onChange={onDateChange}
            className='px-6 py-2 rounded-lg'
            format='DD/MM/YYYY'
          />
        </div>
      </div>
    </div>
  );
};

export default UserFilter;
