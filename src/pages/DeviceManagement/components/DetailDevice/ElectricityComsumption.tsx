import { Card, Select, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  ChartData,
} from 'chart.js';
import dayjs from 'dayjs';
import { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { TimestampEnum } from '@app/constants/device';
import { useGetElectricityConsumption } from '@app/hooks/useDevice';
import { TelemetryTimeSeriesDto } from '@app/interface/device.interface';
import 'dayjs/locale/vi';
dayjs.locale('vi');

import './index.css';

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

const capitalizeFirstLetter = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

const ElectricityComsumption = () => {
  const { id } = useParams();
  const { t } = useTranslation();

  const [interval, setInterval] = useState<TimestampEnum>(TimestampEnum.BY_DAY);
  const { data: electricityConsumptionRes } = useGetElectricityConsumption(id!, interval);

  const columns: ColumnsType<TelemetryTimeSeriesDto> = [
    {
      title: t('DEVICE_MANAGEMENT.TIME_STAMP'),
      dataIndex: 'ts',
      key: 'ts',
      render: (_, record) => {
        return dayjs(record.ts).format('DD/MM/YYYY HH:mm:ss');
      },
      width: 300,
    },
    {
      title: t('DEVICE_MANAGEMENT.ELECTRIC_INDEX'),
      dataIndex: 'value',
      key: 'value',
      width: 300,
    },
  ];

  const data = {
    labels: electricityConsumptionRes?.data?.map((item) => {
      if (interval === TimestampEnum.BY_DAY) {
        const date = dayjs(item.ts).format('DD/MM');
        const time = dayjs(item.ts).format('HH:mm');
        return `${time}, ${date}`;
      } else {
        const weekday = capitalizeFirstLetter(dayjs(item.ts).format('dddd'));
        return `${weekday}, ${dayjs(item.ts).format('DD/MM')}`;
      }
    }),
    datasets: [
      {
        label: t('DEVICE_MANAGEMENT.ELECTRIC_INDEX'),
        data: electricityConsumptionRes?.data?.map((item) => Number(item.value) / 100),
        borderColor: 'rgba(70, 95, 255, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.4,
        cubicInterpolationMode: 'monotone',
        fill: false,
      },
    ],
  };

  return (
    <Card>
      <div className='flex flex-col gap-4'>
        <div className='flex items-center justify-between'>
          <p className='text-2xl font-medium'>{t('DEVICE_MANAGEMENT.ELECTRICITY_CONSUMPTION')}</p>
          <div className='flex items-center gap-2'>
            <Select
              options={[
                {
                  label: t('DEVICE_MANAGEMENT.ELECTRICITY_CONSUMPTION_BY_DAY'),
                  value: TimestampEnum.BY_DAY,
                },
                {
                  label: t('DEVICE_MANAGEMENT.ELECTRICITY_CONSUMPTION_BY_WEEK'),
                  value: TimestampEnum.BY_WEEK,
                },
                {
                  label: t('DEVICE_MANAGEMENT.ELECTRICITY_CONSUMPTION_BY_MONTH'),
                  value: TimestampEnum.BY_MONTH,
                },
                {
                  label: t('DEVICE_MANAGEMENT.ELECTRICITY_CONSUMPTION_BY_QUARTER'),
                  value: TimestampEnum.BY_QUARTER,
                },
              ]}
              defaultValue={TimestampEnum.BY_DAY}
              className='w-[150px]'
              onChange={(value) => {
                setInterval(value);
              }}
            />
          </div>
        </div>
        <div className='h-[600px] w-full mt-4'>
          <Line
            data={data as ChartData<'line', number[], string>}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              elements: {
                line: {
                  tension: 0.4,
                  cubicInterpolationMode: 'monotone' as const,
                },
                point: {
                  radius: 4,
                  hoverRadius: 8,
                  backgroundColor: '#00bcd4',
                  borderWidth: 2,
                  borderColor: '#ffffff',
                  hoverBorderWidth: 3,
                  hoverBackgroundColor: '#0288d1',
                },
              },
              scales: {
                x: {
                  grid: {
                    display: true,
                  },
                },
                y: {
                  grid: {
                    display: true,
                    color: 'rgba(242, 244, 247, 1)',
                  },
                },
              },
              plugins: {
                legend: {
                  display: false,
                },
                tooltip: {
                  backgroundColor: '#ffffff',
                  titleColor: '#000000',
                  bodyColor: '#000000',
                  borderColor: '#cccccc',
                  borderWidth: 1,
                  yAlign: 'top',
                  position: 'nearest',
                  callbacks: {
                    label: function (context) {
                      return context.dataset.label + ': ' + Number(context.parsed.y).toFixed(2);
                    },
                  },
                },
              },
              interaction: {
                mode: 'index',
                intersect: false,
              },
            }}
          />
        </div>
        <Table
          rowKey={(record) => record.ts}
          className='mt-8 custom-table-electricity-consumption'
          dataSource={electricityConsumptionRes?.data?.slice().reverse() || []}
          columns={columns}
        />
      </div>
    </Card>
  );
};

export default ElectricityComsumption;
