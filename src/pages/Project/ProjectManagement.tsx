import { SearchOutlined } from '@ant-design/icons';
import { Input, Select, DatePicker, Pagination } from 'antd';
import { Dayjs } from 'dayjs';
import { debounce } from 'lodash';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { formatTime } from '@app/helpers';
import { useGetProjects } from '@app/hooks/useProject';
import { Project, ProjectFilters, ProjectType } from '@app/interface/project-management';

const { RangePicker } = DatePicker;

const ProjectManagement = () => {
  const { t } = useTranslation();
  const [filters, setFilters] = useState<ProjectFilters>({
    search: '',
    projectType: ProjectType.BUSINESS,
    page: 1,
    startDate: '',
    take: 9,
  });
  const { data: projects, refetch } = useGetProjects(filters);

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

  const handleSelectProjectType = (value: ProjectType) => {
    setFilters((prev) => ({
      ...prev,
      projectType: value,
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
  }, [filters, refetch]);

  return (
    <div>
      <h1>{t<string>('PROJECT_MANAGEMENT.TITLE')}</h1>
      <p className='my-4'>{t<string>('PROJECT_MANAGEMENT.ALL')}</p>
      <div className='bg-white rounded-xl p-8'>
        <div className='grid grid-cols-2'>
          <div className='w-1/2'>
            <Input
              onChange={(e) => handleSearchProject(e.currentTarget.value)}
              placeholder={t<string>('PROJECT_MANAGEMENT.SEARCH')}
              className='h-10 bg-white'
              prefix={<SearchOutlined className='text-gray-500 text-2xl mr-2' />}
            />
          </div>
          <div className='flex items-center gap-4 justify-end'>
            <Select
              onChange={handleSelectProjectType}
              className={'h-10 w-40'}
              value={filters.projectType}
              options={[
                { value: 'business', label: 'Business' },
                { value: 'production', label: 'Production' },
                { value: 'residential', label: 'Residential' },
              ]}
            />
            <RangePicker
              onChange={(dates, dateStrings) => handleDate(dates, dateStrings)}
              className='px-6 py-2 rounded-lg'
              format='DD/MM/YYYY'
            />
          </div>
        </div>
        <div className='grid grid-cols-3 gap-4 my-8'>
          {projects?.data?.map((project: Project) => (
            <div
              key={project.id}
              className='bg-white rounded-xl shadow-[0_1px_8px_rgba(0,0,0,0.2)] p-6'
            >
              <div>
                <div className='w-14 h-14 bg-red-500 flex items-center justify-center text-yellow-400 font-bold rounded mb-2'>
                  MC
                </div>
                <div>
                  <h3 className='text-lg font-semibold'>{project.name}</h3>
                  <p className='text-sm text-gray-500'>{formatTime(project.creationTime)}</p>
                  <p className='text-sm text-gray-600 my-2'>{project.description}</p>
                </div>
              </div>
              <div className='mt-6 px-4 py-2 bg-white text-[#262E89] rounded-full shadow-[0_0px_0px_1px_rgba(128,152,249,1)] max-w-max cursor-default select-none'>
                {project.projectType}
              </div>
            </div>
          ))}
        </div>
        <Pagination
          align='end'
          showQuickJumper
          current={projects?.meta?.page}
          pageSize={projects?.meta?.take}
          total={projects?.meta?.itemCount}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default ProjectManagement;
