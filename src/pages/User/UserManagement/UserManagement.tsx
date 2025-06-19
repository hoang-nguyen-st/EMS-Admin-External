import { SearchOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Input, Select, DatePicker, Pagination, Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { Dayjs } from 'dayjs';
import { debounce } from 'lodash';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { UserStatus } from '@app/constants';
import { formatTime } from '@app/helpers';
import { useGetUsers } from '@app/hooks';
import { GetUsersParams, UserColumns } from '@app/interface/user.interface';
import './UserManagement.scss';

const { RangePicker } = DatePicker;

const UserManagement = () => {
  const columns: ColumnsType<any> = [
    { title: 'Full Name', dataIndex: 'name', key: 'fullName' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Phone', dataIndex: 'phone', key: 'phone' },
    { title: 'Joined Date', dataIndex: 'createdAt', key: 'createdAt' },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (status: string) => (
        <span className={`status-tag ${status.toLowerCase()}`}>{status}</span>
      ),
      className: '!text-center',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <div className='text-center'>
          {record.status === 'active' ? (
            <EditOutlined className='text-lg' />
          ) : (
            <PlusOutlined className='text-lg' />
          )}
        </div>
      ),
      className: '!text-center',
    },
  ];
  const { t } = useTranslation();
  const [filters, setFilters] = useState<GetUsersParams>({
    search: '',
    status: UserStatus.DEFAULT,
    page: 1,
    take: 10,
  });
  const { data, refetch } = useGetUsers(filters);
  const users = data?.data.map((user: UserColumns) => {
    return {
      key: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      createdAt: formatTime(user.createdAt),
      status: user.status,
    };
  });
  const handlePageChange = (page: number) => {
    setFilters((prev) => ({
      ...prev,
      page,
    }));
  };

  const handleSearchProject = debounce((value: string) => {
    setFilters((prev) => ({
      ...prev,
      search: value,
      page: 1,
    }));
  }, 500);

  const handleSelectProjectType = (value: UserStatus) => {
    setFilters((prev) => ({
      ...prev,
      status: value,
      page: 1,
    }));
  };

  const handleDate = (
    dates: [Dayjs | null, Dayjs | null] | null,
    dateStrings: [string, string],
  ) => {
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
    <div>
      <h1>{t<string>('USER_MANAGEMENT.TITLE')}</h1>
      <p className='my-4'>{t<string>('USER_MANAGEMENT.DESCRIPTION')}</p>
      <div className='bg-white rounded-xl p-8 shadow'>
        <div className='grid grid-cols-2'>
          <div className='w-1/2'>
            <Input
              onChange={(e) => handleSearchProject(e.currentTarget.value)}
              placeholder={t<string>('USER_MANAGEMENT.SEARCH')}
              className='h-10 bg-white'
              prefix={<SearchOutlined className='text-gray-500 text-2xl mr-2' />}
            />
          </div>
          <div className='flex items-center gap-4 justify-end mb-4'>
            <Select
              allowClear
              onChange={handleSelectProjectType}
              className={'h-10 w-40'}
              value={filters.status}
              placeholder={'Status'}
              options={[
                { value: UserStatus.ACTIVE, label: 'Active' },
                { value: UserStatus.INACTIVE, label: 'Inactive' },
              ]}
            />
            <RangePicker
              onChange={(dates, dateStrings) => handleDate(dates, dateStrings)}
              className='px-6 py-2 rounded-lg'
              format='DD/MM/YYYY'
            />
          </div>
        </div>
        <div className='space-y-4'>
          <Table
            columns={columns}
            dataSource={users}
            pagination={false}
            id='user-management-table'
          />
          <Pagination
            align='end'
            showQuickJumper
            current={data?.meta?.page}
            pageSize={data?.meta?.take}
            total={data?.meta?.itemCount}
            onChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
