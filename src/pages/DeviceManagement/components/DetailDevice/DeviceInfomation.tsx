import { Card } from 'antd';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { getNameDeviceType } from '@app/constants';
import { useGetDetailDevice } from '@app/hooks/useDevice';

const DeviceInfomation = () => {
  const { id } = useParams();
  const { t } = useTranslation();

  const { data: detailDeviceRes } = useGetDetailDevice(id || '');

  return (
    <Card>
      <div className='flex justify-between items-start'>
        <div className='gap-2 flex flex-col'>
          <p className='font-bold text-2xl'>{detailDeviceRes?.device.name}</p>
          <p className='text-lg text-[#667085]'>
            {t('DEVICE_MANAGEMENT.DEVICE_PROFILE_TYPE', {
              deviceType:
                detailDeviceRes && getNameDeviceType(detailDeviceRes.device.deviceType, t),
            })}
          </p>
        </div>
        <div className='bg-[#28A745] text-white font-medium px-4 py-2 rounded-xl border-[#12B76A] border-[1px]'>
          {detailDeviceRes?.device.status
            ? t('DEVICE_MANAGEMENT.ACTIVE')
            : t('DEVICE_MANAGEMENT.INACTIVE')}
        </div>
      </div>
      <div className='grid sm:grid-cols-2 gap-4 grid-cols-1 mt-8'>
        <div className='flex flex-col gap-2'>
          <p className='text-2xl font-bold'>{t('DEVICE_MANAGEMENT.ENERGY_CONSUMPTION_TITLE')}</p>
          <div className='flex flex-col gap-2'>
            <p className='text-base'>
              {t('DEVICE_MANAGEMENT.FIRST_ELECTRICITY_CONSUMPTION')}:{' '}
              <span className='font-semibold text-lg'>{'N/A'}</span>
            </p>
            <p className='text-base'>
              {t('DEVICE_MANAGEMENT.LAST_ELECTRICITY_CONSUMPTION')}:{' '}
              <span className='font-semibold text-lg'>
                {detailDeviceRes?.lastestTimeSeriesValue.data_active_energy_import[0].value ||
                  'N/A'}
              </span>
            </p>
            <p className='text-base'>
              {t('DEVICE_MANAGEMENT.TIME_ELECTRICITY_CONSUMPTION')}:{' '}
              <span className='font-semibold text-lg'>
                {dayjs(
                  detailDeviceRes?.lastestTimeSeriesValue.data_active_energy_import[0].ts,
                ).format('DD/MM/YYYY HH:mm')}
              </span>
            </p>
            <p className='text-base'>
              {t('DEVICE_MANAGEMENT.TOTAL_ENERGY_CONSUMPTION')}:{' '}
              <span className='font-semibold text-lg'>{'N/A'}</span>
            </p>
          </div>
        </div>
        <div className='flex flex-col gap-2'>
          <p className='text-2xl font-bold'>{t('DEVICE_MANAGEMENT.DEVICE_INFO')}</p>
          <div className='flex flex-col gap-2'>
            <p className='text-base'>
              {t('DEVICE_MANAGEMENT.DEVICE_LOCATION')}:{' '}
              <span className='font-semibold text-lg'>
                {detailDeviceRes?.device.location?.name || 'N/A'}
              </span>
            </p>
            <p className='text-base'>
              {t('DEVICE_MANAGEMENT.ELECTRICITY_USAGE')}:{' '}
              <span className='font-semibold text-lg'>
                {detailDeviceRes?.device.voltageValue
                  ? `${detailDeviceRes.device.voltageValue} ${detailDeviceRes.device.voltageUnit}`
                  : 'N/A'}
              </span>
            </p>
            <p className='text-base'>
              {t('DEVICE_MANAGEMENT.DEV_EUI')}:{' '}
              <span className='font-semibold text-lg'>
                {detailDeviceRes?.device.devEUI || 'N/A'}
              </span>
            </p>
            <p className='text-base'>
              {t('DEVICE_MANAGEMENT.MEASUREMENT_DEVICE')}:{' '}
              <span className='font-semibold text-lg'>
                {detailDeviceRes?.device.fieldCalculate || 'N/A'}
              </span>
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default DeviceInfomation;
