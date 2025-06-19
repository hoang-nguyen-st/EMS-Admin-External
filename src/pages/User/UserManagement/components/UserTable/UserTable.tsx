import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Table, Pagination } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { formatTime } from '@app/helpers';
import { UserColumns, UserTableProps } from '@app/interface/user.interface';

const UserTable: FC<UserTableProps> = ({ data, onPageChange, onAddUser, onEditUser }) => {
  const { t } = useTranslation();

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
        <Button
          className='text-center !bg-transparent shadow-none border-none'
          onClick={(e) => {
            e.preventDefault();
            if (record.status === 'inactive') {
              onAddUser(record);
            } else {
              onEditUser(record);
            }
          }}
        >
          {record.status === 'active' ? (
            <EditOutlined className='text-lg' />
          ) : (
            <PlusOutlined className='text-lg' />
          )}
        </Button>
      ),
      className: '!text-center',
    },
  ];

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

  return (
    <div className='user-table'>
      <Table columns={columns} dataSource={users} pagination={false} id='user-management-table' />
      <Pagination
        align='end'
        showQuickJumper
        current={data?.meta?.page}
        pageSize={data?.meta?.take}
        total={data?.meta?.itemCount}
        onChange={onPageChange}
        className='mt-6'
      />
    </div>
  );
};

export default UserTable;
