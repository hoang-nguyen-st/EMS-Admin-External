import { SearchOutlined, BellOutlined, MoonOutlined } from '@ant-design/icons';
import { Input, Layout } from 'antd';

const { Header: HeaderAntd } = Layout;

export const Header = () => {
  return (
    <HeaderAntd id='header-dashboard' className='px-6 bg-white flex items-center justify-between'>
      <div>
        <Input
          placeholder='Search or type command...'
          className='w-[430px] py-2 bg-gray-100'
          prefix={<SearchOutlined className='text-gray-500 text-2xl mr-2' />}
        />
      </div>
      <div className='flex items-center space-x-4'>
        <MoonOutlined className='text-gray-500 text-lg cursor-pointer' />
        <BellOutlined className='text-yellow-400 text-lg cursor-pointer' />
      </div>
    </HeaderAntd>
  );
};
