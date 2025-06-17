import {
  LeftOutlined,
  PhoneOutlined,
  MailOutlined,
  CalendarFilled,
  EnvironmentOutlined,
  FolderOutlined,
} from '@ant-design/icons';
import { Image, Button, Empty, Spin } from 'antd';
import { useTranslation } from 'react-i18next';
import { useParams, Link } from 'react-router-dom';

import companyDefault from '@app/assets/images/company_default.jpg';
import defaultAvatar from '@app/assets/images/default-avatar-profile.webp';
import { API_URL } from '@app/constants';
import { formatTime } from '@app/helpers';
import { useGetUserById } from '@app/hooks';
import { ProjectUserDetail } from '@app/interface/project-user.interface';

const UserDetail = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const { data: user, isLoading } = useGetUserById(id!);

  if (isLoading || !user) {
    return (
      <div className='w-full text-center'>{isLoading ? <Spin size='large' /> : <Empty />}</div>
    );
  }

  return (
    <div>
      <Link className='text-primary-second flex items-center gap-x-1' to={API_URL.USER_MANAGEMENT}>
        <LeftOutlined />
        {t<string>('USER.RETURN')}
      </Link>
      <div className='rounded-xl shadow p-8 mt-4 bg-white space-y-4'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-x-2'>
            <div className='h-24 w-24'>
              <Image className='w-full h-full object-cover' preview={false} src={defaultAvatar} />
            </div>
            <div className='space-y-1'>
              <h1>{user.name}</h1>
              <p className='text-base text-gray-500'>
                {user.dateOfBirth
                  ? formatTime(user.dateOfBirth)
                  : t<string>('USER_DETAIL.NO_INFORMATION')}
              </p>
            </div>
          </div>
          <div>
            <Button className='text-base'>
              {user.status === 'active'
                ? t<string>('USER_DETAIL.ACTIVE')
                : t<string>('USER_DETAIL.INACTIVE')}
            </Button>
          </div>
        </div>
        <div className='flex items-center justify-between'>
          <div className='space-y-2'>
            <p className='text-lg font-bold'>{t('USER_DETAIL.CONTACT')}</p>
            <div className='flex-col items-end space-y-2 text-gray-600'>
              <div className='flex items-center gap-x-2'>
                <MailOutlined className='text-lg text-blue-900' />
                {user.email || t<string>('USER_DETAIL.NO_INFORMATION')}
              </div>
              <div className='flex items-center gap-x-2'>
                <PhoneOutlined className='text-lg text-green-600' />
                {user.phone || t<string>('USER_DETAIL.NO_INFORMATION')}
              </div>
              <div className='flex items-center gap-x-2'>
                <CalendarFilled className='text-lg text-gray-400' />{' '}
                {user.dateOfBirth
                  ? formatTime(user.dateOfBirth)
                  : t<string>('USER_DETAIL.NO_INFORMATION')}
              </div>
              <div className='flex items-center gap-x-2'>
                <EnvironmentOutlined className='text-lg text-red-600' />
                {user.address || t<string>('USER_DETAIL.NO_INFORMATION')}
              </div>
            </div>
          </div>
          <div>
            <div className='shadow-[0_0px_2px_1px_rgba(0,0,0,0.2)] p-6 pr-12 rounded-2xl flex items-center gap-x-4'>
              <div className='bg-primary-light p-4 rounded-lg'>
                <FolderOutlined className='text-xl' />
              </div>
              <div className='flex-col'>
                <p>{t<string>('USER_DETAIL.PROJECT_ALL')}</p>
                <p className='text-2xl font-bold'>{user.projectsCount}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='grid grid-cols-2 gap-x-4'>
        <div className='p-8 bg-white shadow mt-6 rounded-xl'>
          <div className='flex items-center text-primary-bold gap-x-2 text-xl'>
            <FolderOutlined />
            <p>{t<string>('USER_DETAIL.PROJECTS')}</p>
          </div>
          {(user.projectUsers?.length || 0) > 0 ? (
            <div>
              <div className='flex items-center justify-between my-4'>
                <p>{t<string>('USER_DETAIL.PROJECT_NAME')}</p>
                <p>{t<string>('USER_DETAIL.ROLE')}</p>
              </div>
              {user.projectUsers.map((projectUser: ProjectUserDetail) => (
                <div
                  key={projectUser.id}
                  className='py-4 shadow-[0px_-1px_0px_0px_rgba(0,0,0,0.2)]'
                >
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-x-4'>
                      <div className='w-10 h-10'>
                        <Image
                          className='w-full h-full object-cover'
                          preview={false}
                          src={projectUser.project.image || companyDefault}
                        />
                      </div>
                      <div>
                        <p className='text-sm font-bold'>{projectUser.project.name}</p>
                        <p className='text-gray-500'>{projectUser.project.projectType}</p>
                      </div>
                    </div>
                    <div className='font-bold bg-primary-bold py-2 px-4 rounded-full text-white'>
                      {projectUser.role}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div>
              <Empty />
            </div>
          )}
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default UserDetail;
