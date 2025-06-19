import { SearchOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
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
  onAddUser: (record: UserColumns) => void;
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

  const columns: ColumnsType<UserColumns> = [
    {
      title: 'Full Name',
      dataIndex: 'name',
      key: 'fullName',
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
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Phone', dataIndex: 'phone', key: 'phone' },
    { title: 'Joined Date', dataIndex: 'createdAt', key: 'createdAt' },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (status: string) => (
        <span className={`status-tag ${status.toLowerCase()}`}>
          {status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()}
        </span>
      ),
      className: '!text-center',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Button
          className='text-center !bg-transparent shadow-none border-none'
          onClick={(e) => {
            e.preventDefault();
            if (record.status === UserStatus.INACTIVE) {
              onAddUser(record);
            } else {
              onEditUser(record);
            }
          }}
        >
          {record.status === UserStatus.ACTIVE ? (
            <EditOutlined className='text-lg' />
          ) : (
            <PlusOutlined className='text-lg' />
          )}
        </Button>
      ),
      className: '!text-center',
    },
  ];

  return (
    <div className='user-table'>
      <div className='user-filter mb-4'>
        <div className='grid grid-cols-2'>
          <div className='w-1/2'>
            <Input
              onChange={(e) => handleSearchProject(e.currentTarget.value)}
              placeholder={t<string>('USER_MANAGEMENT.SEARCH')}
              className='h-10 bg-white rounded-lg'
              prefix={<SearchOutlined className='text-gray-500 text-2xl mr-2' />}
            />
          </div>
          <div className='flex items-center gap-4 justify-end'>
            <Select
              allowClear
              onChange={onStatusChange}
              className='h-10 w-40'
              value={filters.status || undefined}
              placeholder='Status'
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
      <Table id='user-management-table' columns={columns} dataSource={users} pagination={false} />
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
