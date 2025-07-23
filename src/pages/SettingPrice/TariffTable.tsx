import { Table } from 'antd';
import { useTranslation } from 'react-i18next';

import { TariffTableData, TariffTier } from '@app/interface';
import type { ColumnsType } from 'antd/es/table';

interface TariffTableProps {
  rules: TariffTier[];
}

const TariffTable = ({ rules }: TariffTableProps) => {
  const { t } = useTranslation();

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

  const dataSource =
    rules?.map((rule) => ({
      key: rule.id,
      level: rule.name,
      kwh: rule.kwh,
      unitPrice: rule.unitPrice,
    })) || [];

  return (
    <Table<TariffTableData>
      pagination={false}
      dataSource={dataSource}
      className='shadow-md rounded-b-xl overflow-hidden mb-4'
      columns={columns}
      bordered
    />
  );
};

export default TariffTable;
