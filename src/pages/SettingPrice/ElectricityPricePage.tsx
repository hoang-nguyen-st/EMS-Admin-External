import { Tabs, Typography, Spin, Button } from 'antd';
import { SquarePen } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import MeterPricingTable from './MeterPricingTable';
import TariffTable from './TariffTable';
import { useLocationTypes, usePricingElectricRules } from '@app/hooks';
import { MeterTypePricing, TariffTier } from '@app/interface';
import './ElectricityPricePage.scss';

const { Title } = Typography;

const ElectricityPricePage = () => {
  const { data: locationData, isLoading: loadingLocation } = useLocationTypes();
  const [selectedLocationId, setSelectedLocationId] = useState<string | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    if (locationData?.data?.length && !selectedLocationId) {
      setSelectedLocationId(locationData.data[0].id);
    }
  }, [locationData, selectedLocationId]);

  const { data: pricingData, isLoading: loadingPricing } = usePricingElectricRules(
    selectedLocationId || '',
  );

  const currentLocation = locationData?.data.find((l) => l.id === selectedLocationId);
  const isTariffTier = currentLocation?.isTariffTier;

  const renderContent = () => {
    if (loadingPricing)
      return <Spin className='top-1/2 left-1/2 fixed -translate-x-1/2 -translate-y-1/2' />;

    if (isTariffTier) {
      return <TariffTable rules={pricingData?.data as TariffTier[]} />;
    } else {
      return <MeterPricingTable meterTypes={pricingData?.data as MeterTypePricing[]} />;
    }
  };

  return (
    <>
      <div className='flex justify-between items-center'>
        <div>
          <Title level={2}>{t('ELECTRICITY_PRICE.TITLE')}</Title>
          <p className='text-gray-500 mb-6'>{t('ELECTRICITY_PRICE.DESCRIPTION')}</p>
        </div>
        <Button
          type='primary'
          icon={<SquarePen />}
          className='border-2 !border-[#667085] py-5 text-[#667085] bg-white'
        >
          {t('ELECTRICITY_PRICE.BUTTON_EDIT_PRICE')}
        </Button>
      </div>

      {loadingLocation ? (
        <Spin className='top-1/2 left-1/2 fixed -translate-x-1/2 -translate-y-1/2' />
      ) : (
        <div id='setting-price-wrapper'>
          <Tabs
            defaultActiveKey={locationData?.data?.[0]?.id}
            onChange={(key) => setSelectedLocationId(key)}
            className='!bg-white px-10 py-5 rounded-3xl shadow-md'
            items={locationData?.data.map((location) => ({
              label: location.name,
              key: location.id,
              children: (
                <>
                  <Title level={4}>{t('ELECTRICITY_PRICE.TAB_TITLE')}</Title>
                  {renderContent()}
                </>
              ),
            }))}
          />
        </div>
      )}
    </>
  );
};

export default ElectricityPricePage;
