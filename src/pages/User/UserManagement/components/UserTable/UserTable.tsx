import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Table, Pagination, TableProps } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { formatTime } from '@app/helpers';
import { UserColumns } from '@app/interface/user.interface';

export interface UserTableProps {
  data: {
    data: UserColumns[];
    meta: {
      page: number;
      take: number;
      itemCount: number;
    };
  };
  onPageChange: (page: number) => void;
  onAddUser: (record: UserColumns) => void;
  onEditUser: (record: UserColumns) => void;
  onRowClick: (id: string) => void;
}

const UserTable: FC<UserTableProps & TableProps> = ({
  data,
  onPageChange,
  onAddUser,
  onEditUser,
  onRowClick,
}) => {
  const { t } = useTranslation();
  const { meta } = data || {};
  const users =
    data && data.data
      ? data.data.map((user: UserColumns) => ({
          ...user,
          key: user.id,
          createdAt: formatTime(user.createdAt),
        }))
      : [];

  const columns: ColumnsType<UserColumns> = [
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
            e.stopPropagation();
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

  const handleRowClick = (record: UserColumns) => {
    return {
      onClick: () => {
        if (onRowClick) {
          onRowClick(record.id);
        }
      },
    };
  };

  return (
    <div className='user-table'>
      <Table
        columns={columns}
        dataSource={users}
        pagination={false}
        id='user-management-table'
        onRow={handleRowClick}
      />
      {meta ? (
        <Pagination
          align='end'
          showQuickJumper
          current={meta.page}
          pageSize={meta.take}
          total={meta.itemCount}
          onChange={onPageChange}
          className='mt-6'
        />
      ) : (
        <span>Nothing</span>
      )}
    </div>
  );
};

export default UserTable;
