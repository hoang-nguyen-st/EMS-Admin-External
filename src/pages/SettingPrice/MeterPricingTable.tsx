import { Table, Typography } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useTranslation } from 'react-i18next';

import { formatMeterTypeName, timeUsageMap } from '@app/constants/map';
import { MeterPricingTableData, MeterTypePricing } from '@app/interface';

const { Title } = Typography;

interface MeterPricingTableProps {
  meterTypes: MeterTypePricing[];
}

const MeterPricingTable = ({ meterTypes }: MeterPricingTableProps) => {
  const { t } = useTranslation();

  const renderSingleMeterTable = (meterType: MeterTypePricing) => {
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
        key: 'voltageLevel',
        render: (_, record) => record.voltageLevel,
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
        key: 'time',
        render: (_, record) => record.time,
      },
      {
        title: t('ELECTRICITY_PRICE.PRICE'),
        key: 'unitPrice',
        render: (_, record) => record.unitPrice,
      },
    ];

    const hasTimeUsage = dataSource.some((item) => item.time !== '');
    if (!hasTimeUsage) {
      columns.splice(1, 1);
    }

    return (
      <div key={meterType.id} className='mb-4'>
        <Title level={5}>
          {`${
            meterType.name.includes('1') ? '1' : meterType.name.includes('3') ? '2' : meterType.name
          }. ${formatMeterTypeName(meterType.meterTypeEnum, meterType.name)}`}
        </Title>
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

  return <>{meterTypes?.map((meterType) => renderSingleMeterTable(meterType))}</>;
};

export default MeterPricingTable;
