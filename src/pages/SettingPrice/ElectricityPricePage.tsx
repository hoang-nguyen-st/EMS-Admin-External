import { Tabs, Table, Typography, Spin, Button } from 'antd';
import { SquarePen } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { formatMeterTypeName, timeUsageMap } from '@app/constants/map';
import { useLocationTypes, usePricingElectricRules } from '@app/hooks';
import { MeterTypePricing, TariffTier } from '@app/interface/settingPrice.interface';
import type { ColumnsType } from 'antd/es/table';

import './ElectricityPricePage.scss';

const { Title } = Typography;

interface TariffTableData {
  key: string;
  level: string;
  kwh: number;
  unitPrice: number;
}

interface MeterPricingTableData {
  key: string;
  voltageLevel: string;
  time: string;
  unitPrice: number;
}

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

  const renderTariffTable = () => {
    const rules = pricingData?.data as TariffTier[];

    const columns: ColumnsType<TariffTableData> = [
      {
        title: t('ELECTRICITY_PRICE.TIER_LEVEL'),
        dataIndex: 'level',
        key: 'level',
      },
      {
        title: t('ELECTRICITY_PRICE.TIER_KWH'),
        dataIndex: 'kwh',
        key: 'kwh',
      },
      {
        title: t('ELECTRICITY_PRICE.TIER_PRICE'),
        dataIndex: 'unitPrice',
        key: 'unitPrice',
      },
    ];

    return (
      <Table<TariffTableData>
        pagination={false}
        dataSource={
          rules?.map((rule) => ({
            key: rule.id,
            level: rule.name,
            kwh: rule.kwh,
            unitPrice: rule.unitPrice,
          })) || []
        }
        className='shadow-md rounded-b-xl overflow-hidden mb-4'
        columns={columns}
        bordered
      />
    );
  };

  const renderMeterPricingTable = (meterType: MeterTypePricing) => {
    const dataSource: MeterPricingTableData[] = [];

    meterType.rulesByVoltageLevel.forEach((voltageLevelRule) => {
      const voltageLevel = voltageLevelRule.voltageLevel.name;

      if (voltageLevelRule.rules.length === 1) {
        dataSource.push({
          key: `${voltageLevelRule.voltageLevel.id}-${voltageLevelRule.rules[0].id}`,
          voltageLevel: voltageLevel,
          time:
            timeUsageMap[voltageLevelRule.rules[0].timeUsage] ||
            voltageLevelRule.rules[0].timeUsage,
          unitPrice: voltageLevelRule.rules[0].unitPrice,
        });
      } else {
        voltageLevelRule.rules.forEach((rule, index) => {
          dataSource.push({
            key: `${voltageLevelRule.voltageLevel.id}-${rule.id}`,
            voltageLevel: index === 0 ? voltageLevel : '',
            time: timeUsageMap[rule.timeUsage] || rule.timeUsage,
            unitPrice: rule.unitPrice,
          });
        });
      }
    });

    const columns: ColumnsType<MeterPricingTableData> = [
      {
        title: t('ELECTRICITY_PRICE.VOLTAGE_LEVEL'),
        dataIndex: 'voltageLevel',
        key: 'voltageLevel',
        onCell: (record: MeterPricingTableData, index?: number) => {
          if (record.voltageLevel === '') {
            return { rowSpan: 0 };
          }

          let rowSpan = 1;
          const currentIndex = index ?? 0;

          for (let i = currentIndex + 1; i < dataSource.length; i++) {
            if (dataSource[i].voltageLevel === '' && i > currentIndex) {
              rowSpan++;
            } else {
              break;
            }
          }

          return { rowSpan };
        },
      },
      {
        title: t('ELECTRICITY_PRICE.TIME'),
        dataIndex: 'time',
        key: 'time',
      },
      {
        title: t('ELECTRICITY_PRICE.PRICE'),
        dataIndex: 'unitPrice',
        key: 'unitPrice',
      },
    ];

    const hasTimeUsage = dataSource.some((item) => item.time !== '');
    if (!hasTimeUsage) {
      columns.splice(1, 1);
    }

    return (
      <div key={meterType.id} className='mb-4'>
        <Title level={5}>{`${
          meterType.name.includes('1') ? '1' : meterType.name.includes('3') ? '2' : meterType.name
        }. ${formatMeterTypeName(meterType.meterTypeEnum, meterType.name)}`}</Title>
        <Table<MeterPricingTableData>
          pagination={false}
          dataSource={dataSource}
          columns={columns}
          className='shadow-md rounded-b-xl overflow-hidden'
          bordered
        />
      </div>
    );
  };

  const renderMeterPricingTables = () => {
    const meterPricing = pricingData?.data as MeterTypePricing[];
    return meterPricing?.map((meterType) => renderMeterPricingTable(meterType));
  };

  const renderContent = () => {
    if (loadingPricing)
      return <Spin className='top-1/2 left-1/2 fixed -translate-x-1/2 -translate-y-1/2' />;
    return isTariffTier ? renderTariffTable() : renderMeterPricingTables();
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
