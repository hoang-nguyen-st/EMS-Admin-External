import { Dayjs } from 'dayjs';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { UserTable, UserFilter, UserModal } from './components';
import { API_URL, UserStatus } from '@app/constants';
import { useGetUsers } from '@app/hooks';
import { GetUsersParams, UserColumns } from '@app/interface/user.interface';
import './UserManagement.scss';

const UserManagement = () => {
  const { t } = useTranslation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserColumns | null>(null);
  const navigate = useNavigate();
  const [filters, setFilters] = useState<GetUsersParams>({
    search: '',
    status: UserStatus.DEFAULT,
    page: 1,
    take: 10,
  });

  const { data, refetch } = useGetUsers(filters);

  const handleAddUser = (record: UserColumns) => {
    setSelectedUser(record);
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

  const handleRedirectUserDetail = (key: string) => {
    navigate(`${API_URL.USER_MANAGEMENT}/${key}`, { replace: true });
  };

  useEffect(() => {
    refetch();
  }, [filters]);

  return (
    <div className='user-management'>
      <h1>{t<string>('USER_MANAGEMENT.TITLE')}</h1>
      <p className='my-4'>{t<string>('USER_MANAGEMENT.DESCRIPTION')}</p>
      <div className='bg-white rounded-xl p-8 shadow'>
        <UserFilter
          filters={filters}
          onSearchChange={handleSearchChange}
          onStatusChange={handleStatusChange}
          onDateChange={handleDateChange}
        />
        <div className='space-y-4'>
          <UserTable
            data={data}
            onPageChange={handlePageChange}
            onAddUser={handleAddUser}
            onEditUser={handleEditUser}
            onRowClick={handleRedirectUserDetail}
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
