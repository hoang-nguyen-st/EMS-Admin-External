import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import {
  Col,
  Divider,
  Pagination,
  Row,
  Select,
  Space,
  Table as TableAntd,
  TablePaginationConfig,
  Typography,
} from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { FilterValue, SorterResult, TableCurrentDataSource } from 'antd/lib/table/interface';
import React, { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import { EmptyData } from '@app/components/molecules';

import './Table.scss';

export interface PaginateProp {
  page: number;
  take: number;
}

interface PaginateOptions {
  table: PaginateProp;
  setTable: (value: any) => void;
  total: number;
  pageCount: number;
}

type TableProps = {
  columns: ColumnsType<any>;
  dataSource: [];
  loading?: boolean;
  onChange?: (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<any> | SorterResult<any>[],
    extra: TableCurrentDataSource<any>,
  ) => void;
  paginate?: PaginateOptions;
  disablePaginate?: boolean;
  summary?: (data: readonly any[]) => ReactNode;
  className?: string;
  hiddenScrollX?: boolean;
};

export const Table: React.FC<TableProps> = ({
  loading,
  columns,
  dataSource,
  paginate,
  onChange,
  disablePaginate = false,
  summary,
  className = '',
  hiddenScrollX = false,
}) => {
  const { t } = useTranslation();

  return (
    <div className={`table-antd ${className}`}>
      <TableAntd
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        rowKey={(record) => record.id}
        onChange={onChange}
        scroll={{ x: 'max-content' }}
        showSorterTooltip={false}
        pagination={false}
        locale={{
          emptyText: <EmptyData />,
        }}
        className={`${disablePaginate === true ? 'br12' : ''} ${
          hiddenScrollX ? 'hidden-scrollx' : ''
        }`}
        summary={summary}
      />
      {disablePaginate === false && (
        <Row
          justify='space-between'
          style={{ padding: '1rem', background: '#F7F7F7', borderRadius: '0 0 12px 12px' }}
          align='middle'
        >
          <Col>
            <Space>
              <Typography style={{ font: '14px Quicksand', color: '#727272' }}>
                {t('TABLE.TOTAL_ITEMS', {
                  item: paginate && paginate.total,
                })}
              </Typography>
              <Divider type='vertical' style={{ stroke: '10px', strokeWidth: '90' }} />
              <Typography
                style={{
                  font: '14px Quicksand',
                  display: 'flex',
                  alignItems: 'center',
                  columnGap: '10px',
                  color: '#727272',
                }}
              >
                {t('TABLE.DISPLAY')}
                <Select
                  style={{
                    width: 'fit-content',
                    color: '#727272',
                  }}
                  defaultValue={paginate && paginate.table.take}
                  onChange={(value: number) => {
                    paginate &&
                      paginate.setTable({
                        ...paginate.table,
                        take: value,
                        page: 1,
                      });
                  }}
                  options={[
                    {
                      value: 10,
                      label: '10',
                    },
                    {
                      value: 20,
                      label: '20',
                    },
                    {
                      value: 50,
                      label: '50',
                    },
                    {
                      value: 100,
                      label: '100',
                    },
                  ]}
                  getPopupContainer={(triggerNode: HTMLElement) =>
                    triggerNode.parentNode as HTMLElement
                  }
                />
                {t('TABLE.ITEM')}
              </Typography>
            </Space>
          </Col>
          {paginate && (
            <Col>
              <div style={{ background: '#0000000D', borderRadius: '8px' }}>
                <Pagination
                  showSizeChanger={false}
                  current={paginate.table.page}
                  total={paginate.total}
                  pageSize={paginate.table.take}
                  itemRender={(_, type: string, originalElement) => {
                    switch (type) {
                      case 'prev':
                        return <ArrowLeftOutlined />;
                      case 'next':
                        return <ArrowRightOutlined />;
                      default:
                        return originalElement;
                    }
                  }}
                  onChange={(page: number) => {
                    paginate.setTable({
                      ...paginate.table,
                      page: page,
                    });
                  }}
                />
              </div>
            </Col>
          )}
        </Row>
      )}
    </div>
  );
};
