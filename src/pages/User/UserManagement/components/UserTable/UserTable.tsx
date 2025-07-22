import { SearchOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Input, Select, DatePicker, Table, Pagination, TableProps } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { Dayjs } from 'dayjs';
import { debounce } from 'lodash';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { NAVIGATE_URL, UserStatus } from '@app/constants';
import { formatTime } from '@app/helpers';
import { UserColumns } from '@app/interface/user.interface';

const { RangePicker } = DatePicker;

export interface UserTableProps extends TableProps<UserColumns> {
  data: {
    data: UserColumns[];
    meta: {
      page: number;
      take: number;
      itemCount: number;
    };
  };
  filters: {
    search: string;
    status?: UserStatus;
  };
  onSearchChange: (value: string) => void;
  onStatusChange: (value: UserStatus) => void;
  onDateChange: (dates: [Dayjs | null, Dayjs | null] | null, dateStrings: [string, string]) => void;
  onPageChange: (page: number) => void;
  onAddUser: () => void;
  onEditUser: (record: UserColumns) => void;
}

const UserTable: FC<UserTableProps> = ({
  data,
  filters,
  onSearchChange,
  onStatusChange,
  onDateChange,
  onPageChange,
  onAddUser,
  onEditUser,
}) => {
  const { t } = useTranslation();
  const { meta } = data || {};
  const users = (data?.data ?? []).map((user: UserColumns) => ({
    ...user,
    key: user.id,
    createdAt: formatTime(user.createdAt),
  }));

  const handleSearchProject = debounce((value: string) => {
    onSearchChange(value);
  }, 500);

  const setStatus = (status: UserStatus) => {
    switch (status) {
      case UserStatus.ACTIVE:
        return t('USER_MANAGEMENT.ACTIVE');
      case UserStatus.INACTIVE:
        return t('USER_MANAGEMENT.INACTIVE');
      case UserStatus.PENDING:
        return t('USER_MANAGEMENT.PENDING');
    }
  };

  const columns: ColumnsType<UserColumns> = [
    {
      title: t<string>('USER_MANAGEMENT.FULLNAME'),
      dataIndex: 'fullname',
      key: 'fullName',
      width: 150,
      render: (_, record) => (
        <div>
          <Link
            className='underline underline-offset-2 text-primary hover:underline'
            to={`${NAVIGATE_URL.USER_MANAGEMENT}/${record.id}`}
            replace={true}
          >
            {record.name}
          </Link>
        </div>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: t<string>('USER_MANAGEMENT.PHONE'),
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: t<string>('USER_MANAGEMENT.JOIN_DATE'),
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: t<string>('USER_MANAGEMENT.STATUS'),
      dataIndex: 'status',
      render: (status: string) => (
        <span
          className={`px-4 py-2 rounded-2xl text-white ${
            status === UserStatus.ACTIVE
              ? 'bg-[#28a745]'
              : status === UserStatus.PENDING
              ? 'bg-[#262e89]'
              : 'bg-[#8b969f]'
          }`}
        >
          {setStatus(status as UserStatus)}
        </span>
      ),
      align: 'center',
    },
    {
      title: t<string>('USER_MANAGEMENT.ACTION'),
      key: 'actions',
      fixed: 'right',
      render: (_, record) => (
        <Button
          className='text-center !bg-transparent shadow-none border-none'
          onClick={() => {
            onEditUser(record);
          }}
        >
          <EditOutlined className='text-lg' />
        </Button>
      ),
      align: 'center',
    },
  ];

  return (
    <div className='user-table'>
      <div className='user-filter mb-4'>
        <div className='flex flex-col md:grid md:grid-cols-2 gap-4'>
          <div className='w-full md:w-1/2'>
            <Input
              onChange={(e) => handleSearchProject(e.currentTarget.value)}
              placeholder={t<string>('USER_MANAGEMENT.SEARCH')}
              className='h-10 bg-white rounded-lg'
              prefix={<SearchOutlined className='text-gray-500 text-2xl mr-2' />}
            />
          </div>
          <div className='flex flex-col sm:flex-row items-center gap-4 justify-end'>
            <Select
              allowClear
              onChange={onStatusChange}
              className='h-10 w-full sm:w-48'
              value={filters.status || undefined}
              placeholder={t<string>('USER_MANAGEMENT.STATUS')}
              options={[
                { value: UserStatus.ACTIVE, label: t<string>('USER_MANAGEMENT.ACTIVE') },
                { value: UserStatus.INACTIVE, label: t<string>('USER_MANAGEMENT.INACTIVE') },
                { value: UserStatus.PENDING, label: t<string>('USER_MANAGEMENT.PENDING') },
              ]}
            />
            <RangePicker
              onChange={onDateChange}
              className='px-6 py-2 rounded-lg w-full sm:w-auto'
              format='DD/MM/YYYY'
              placeholder={[
                t<string>('USER_MANAGEMENT.FROM_DATE'),
                t<string>('USER_MANAGEMENT.TO_DATE'),
              ]}
            />
            <Button onClick={onAddUser} className='px-6 py-5 bg-[#465FFF] text-white'>
              {t('USER_MANAGEMENT.ADD')}
            </Button>
          </div>
        </div>
      </div>
      <div className='table-wrapper'>
        <Table
          id='user-management-table'
          columns={columns}
          dataSource={users}
          pagination={false}
          scroll={{ x: 'max-content' }}
        />
      </div>
      {meta && (
        <Pagination
          align='end'
          className='mt-6'
          showQuickJumper
          current={meta.page}
          pageSize={meta.take}
          total={meta.itemCount}
          onChange={onPageChange}
        />
      )}
    </div>
  );
};

export default UserTable;
