import { Dayjs } from 'dayjs';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { UserTable, UserModal } from './components';
import { UserStatus } from '@app/constants';
import { useGetUsers } from '@app/hooks';
import { GetUsersParams, UserColumns } from '@app/interface/user.interface';
import './UserManagement.scss';

const UserManagement = () => {
  const { t } = useTranslation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserColumns | null>(null);
  const [filters, setFilters] = useState<GetUsersParams>({
    search: '',
    status: UserStatus.DEFAULT,
    page: 1,
    take: 10,
  });

  const { data, refetch } = useGetUsers(filters);

  const handleAddUser = () => {
    setIsModalVisible(true);
  };

  const handleEditUser = (record: UserColumns) => {
    setSelectedUser(record);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedUser(null);
  };

  const handleModalSubmit = () => {
    handleModalClose();
  };

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({
      ...prev,
      page,
    }));
  };

  const handleSearchChange = (value: string) => {
    setFilters((prev) => ({
      ...prev,
      search: value,
      page: 1,
    }));
  };

  const handleStatusChange = (value: UserStatus) => {
    setFilters((prev) => ({
      ...prev,
      status: value ? value : UserStatus.DEFAULT,
      page: 1,
    }));
  };

  const handleDateChange = (dates: [Dayjs | null, Dayjs | null] | null) => {
    setFilters((prev) => ({
      ...prev,
      startDate: dates && dates[0] ? dates[0].format('YYYY-MM-DD') : '',
      endDate: dates && dates[1] ? dates[1].format('YYYY-MM-DD') : '',
    }));
  };

  useEffect(() => {
    refetch();
  }, [filters]);

  return (
    <div className='user-management'>
      <h1>{t<string>('USER_MANAGEMENT.TITLE')}</h1>
      <p className='my-4'>{t('USER_MANAGEMENT.DESCRIPTION')}</p>
      <div className='bg-white rounded-xl p-8 shadow'>
        <div className='space-y-4'>
          <UserTable
            data={data}
            filters={filters}
            onSearchChange={handleSearchChange}
            onStatusChange={handleStatusChange}
            onDateChange={handleDateChange}
            onPageChange={handlePageChange}
            onAddUser={handleAddUser}
            onEditUser={handleEditUser}
          />
        </div>
      </div>
      <UserModal
        visible={isModalVisible}
        user={selectedUser}
        onCancel={handleModalClose}
        onSubmit={handleModalSubmit}
      />
    </div>
  );
};

export default UserManagement;
