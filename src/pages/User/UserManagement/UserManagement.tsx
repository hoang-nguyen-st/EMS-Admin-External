import { WarningOutlined } from '@ant-design/icons';
import { Dayjs } from 'dayjs';
import { UsersRound, UserRoundCheck, UserRoundMinus } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { UserTable, UserModal } from './components';
import { UserStatus } from '@app/constants';
import { useGetUsers, useGetUserSummarize } from '@app/hooks';
import { GetUsersParams, UserColumns, UserTotalStatus } from '@app/interface/user.interface';

import './UserManagement.scss';

const UserManagement = () => {
  const { t } = useTranslation();
  const { data: userSummarize, isLoading: isLoadingUserSummarize } = useGetUserSummarize();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserColumns | null>(null);
  const [filters, setFilters] = useState<GetUsersParams>({
    search: '',
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
      status: value ? value : undefined,
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

  const getCount = (type: UserStatus) =>
    (!!userSummarize && userSummarize.find((d: UserTotalStatus) => d.status === type)?.count) || 0;

  const userStats = [
    {
      icon: <UsersRound className='text-2xl text-[#6C8AE4]' />,
      title: t('USER_MANAGEMENT.TOTAL_USER'),
      count: getCount(UserStatus.TOTAL),
      bgColor: 'bg-[#EAF2FF]',
    },
    {
      icon: <UserRoundCheck className='text-2xl text-[#38b459]' />,
      title: t('USER_MANAGEMENT.ACTIVE_USER'),
      count: getCount(UserStatus.ACTIVE),
      bgColor: 'bg-[#12B76A26]',
    },
    {
      icon: <UserRoundMinus className='text-2xl text-black' />,
      title: t('USER_MANAGEMENT.INACTIVE_USER'),
      count: getCount(UserStatus.INACTIVE),
      bgColor: 'bg-[#F2F4F7]',
    },
    {
      icon: <WarningOutlined className='text-2xl text-[#FFCE39]' />,
      title: t('USER_MANAGEMENT.UNSIGNED_USER'),
      count: getCount(UserStatus.UNSIGNED),
      bgColor: 'bg-[#FFFBF0]',
    },
  ];

  useEffect(() => {
    refetch();
  }, [filters]);

  return (
    <div className='user-management'>
      <h1>{t<string>('USER_MANAGEMENT.TITLE')}</h1>
      <p className='my-4'>{t('USER_MANAGEMENT.DESCRIPTION')}</p>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8'>
        {userStats.map((stat) => (
          <div
            key={stat.title}
            className='bg-white rounded-2xl shadow-sm px-6 py-5 pr-8 min-w-[180px] flex items-center gap-4 border border-[#ececec]'
          >
            <div
              className={`rounded-xl w-14 h-14 flex items-center justify-center ${stat.bgColor}`}
            >
              {stat.icon}
            </div>
            <div>
              <div className='text-[#5B6B7A] text-[15px] font-medium'>{stat.title}</div>
              <div className='text-[#1D3557] font-bold text-[28px] mt-0.5'>{stat.count}</div>
            </div>
          </div>
        ))}
      </div>
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
