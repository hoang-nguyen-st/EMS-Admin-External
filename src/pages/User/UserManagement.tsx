import { SearchOutlined } from '@ant-design/icons';
import { Input, Select, DatePicker, Pagination } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { Dayjs } from 'dayjs';
import { debounce } from 'lodash';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { Table } from '@app/components/atoms';
import { formatTime } from '@app/helpers';

const { RangePicker } = DatePicker;

const columns: ColumnsType<any> = [
  { title: 'Full Name', dataIndex: 'fullName', key: 'fullName' },
  { title: 'Email', dataIndex: 'email', key: 'email' },
  { title: 'Phone', dataIndex: 'phone', key: 'phone' },
  { title: 'Joined Date', dataIndex: 'joinedDate', key: 'joinedDate' },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (status) => (
      <span
        style={{
          backgroundColor: status === 'Active' ? '#10B981' : '#9CA3AF',
          color: 'white',
          padding: '2px 8px',
          borderRadius: '4px',
        }}
      >
        {status}
      </span>
    ),
  },
  { title: 'Actions', dataIndex: 'actions', key: 'actions' },
];

const dataSource = [
  { key: '1', fullName: 'John Smith', email: 'john.smith@gmail.com', phone: '0935112120', joinedDate: 'March 12, 2023', status: 'Active', actions: '...' },
  { key: '2', fullName: 'Olivia Bennett', email: 'olivben@gmail.com', phone: '0935112120', joinedDate: 'June 27, 2022', status: 'Active', actions: '...' },
  { key: '3', fullName: 'Daniel Warren', email: 'dwarren3@gmail.com', phone: '0935112120', joinedDate: 'January 8, 2024', status: 'Inactive', actions: '...' },
  { key: '4', fullName: 'Chloe Hayes', email: 'chloehye@gmail.com', phone: '0935112120', joinedDate: 'October 5, 2021', status: 'Inactive', actions: '...' },
  { key: '5', fullName: 'Marcus Reed', email: 'reeds777@gmail.com', phone: '0935112120', joinedDate: 'February 19, 2023', status: 'Active', actions: '...' },
  { key: '6', fullName: 'Isabelle Clark', email: 'belleclark@gmail.com', phone: '0935112120', joinedDate: 'August 30, 2022', status: 'Active', actions: '...' },
  { key: '7', fullName: 'Lucas Mitchell', email: 'lucasmich@gmail.com', phone: '0935112120', joinedDate: 'April 23, 2024', status: 'Active', actions: '...' },
  { key: '8', fullName: 'Mark Wilburg', email: 'markwil132@gmail.com', phone: '0935112120', joinedDate: 'November 14, 2020', status: 'Inactive', actions: '...' },
  { key: '9', fullName: 'Nicholas Ageno', email: 'nicolas509@gmail.com', phone: '0935112120', joinedDate: 'July 6, 2023', status: 'Inactive', actions: '...' },
  { key: '10', fullName: 'Mia Nadim', email: 'mianaddin@gmail.com', phone: '0935112120', joinedDate: 'December 31, 2021', status: 'Inactive', actions: '...' },
  { key: '11', fullName: 'Noemi Villan', email: 'noemivill9@gmail.com', phone: '0935112120', joinedDate: 'August 10, 2024', status: 'Active', actions: '...' },
];

const UserManagement = () => {
  const { t } = useTranslation();


  const handlePageChange = (page: number) => {

  };

  const handleSearchProject = debounce((value: string) => {

  }, 500);

  const handleSelectProjectType = (value: any) => {

  };

  const handleDate = (
    dates: [Dayjs | null, Dayjs | null] | null,
    dateStrings: [string, string],
  ) => {

  };

  //   useEffect(() => {
  //     refetch();
  //   }, [filters, refetch]);

  return (
    <div>
      <h1>{t<string>('USER_MANAGEMENT.TITLE')}</h1>
      <p className='my-4'>{t<string>('USER_MANAGEMENT.DESCRIPTION')}</p>
      <div className='bg-white rounded-xl p-8'>
        <div className='grid grid-cols-2'>
          <div className='w-1/2'>
            <Input
              onChange={(e) => handleSearchProject(e.currentTarget.value)}
              placeholder={t<string>('USER_MANAGEMENT.SEARCH')}
              className='h-10 bg-white'
              prefix={<SearchOutlined className='text-gray-500 text-2xl mr-2' />}
            />
          </div>
          <div className='flex items-center gap-4 justify-end'>
            <Select
              onChange={handleSelectProjectType}
              className={'h-10 w-40'}
              //   value={filters.projectType}
              options={[
                { value: '', label: 'Status' },
                { value: 'active', label: 'Active' },
                { value: 'inactive', label: 'Inactive' },
              ]}
            />
            <RangePicker
              onChange={(dates, dateStrings) => handleDate(dates, dateStrings)}
              className='px-6 py-2 rounded-lg'
              format='DD/MM/YYYY'
            />
          </div>
        </div>
        {/* <Table
          columns={columns}
          dataSource={dataSource}
          // paginate={paginate}
          // onChange={onChange}
          className="custom-table"
        /> */}
      </div>
    </div>
  );
};

export default UserManagement;
