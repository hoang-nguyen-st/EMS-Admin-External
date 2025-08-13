import { Select, SelectProps } from 'antd';
import { useTranslation } from 'react-i18next';

import { useGetUsersLocation } from '@app/hooks';
import { UserDetail } from '@app/interface/user.interface';

const UserSelectCustom = ({ ...props }: SelectProps) => {
  const { data: users } = useGetUsersLocation();
  const { t } = useTranslation();

  return (
    <Select
      placeholder={t<string>('LOCATION.USER_PLACEHOLDER')}
      options={users?.data.map((user: UserDetail) => ({
        label: user.name,
        value: user.id,
      }))}
      {...props}
    />
  );
};

export default UserSelectCustom;
