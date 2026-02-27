import { useState } from 'react';
import { Alert, Col, Empty, List, Row, Skeleton, Typography } from 'antd';
import { theme } from '../../../../../theme';
import {
  useGetApiFightDuelGetByPoolRunIdIdOffsetLimit,
  useGetApiFightDuelGetCountByPoolRunIdId,
} from '../../../../../../services/duel-fights/duel-fights';
import PoolDuelFightListItem from '../pool-duel-fight-list-item/PoolDuelFightListItem';
import { IPoolDuelFightListProps } from './PoolDuelFightList.types';

function PoolDuelFightList({ poolDuelId, leeks }: IPoolDuelFightListProps) {
  const [offset, setOffset] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);

  const { data, error } = useGetApiFightDuelGetByPoolRunIdIdOffsetLimit(
    poolDuelId,
    offset.toString(),
    limit.toString(),
  );
  const { data: countData } =
    useGetApiFightDuelGetCountByPoolRunIdId(poolDuelId);

  const total = countData?.count ?? data?.fights.length ?? 0;
  const currentPage = Math.floor(offset / limit) + 1;
  const listItemStyle = {
    padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
  };

  function handlePaginationChange(page: number, pageSize: number) {
    setLimit(pageSize);
    setOffset((page - 1) * pageSize);
  }

  if (error) {
    return <Alert message="Error loading fights." type="error" showIcon />;
  }

  return (
    <List
      bordered
      dataSource={data?.fights}
      header={
        <Row gutter={16}>
          <Col span={8}>
            <Typography.Text strong>Leek 1</Typography.Text>
          </Col>
          <Col span={2}>
            <Typography.Text strong> </Typography.Text>
          </Col>
          <Col span={8}>
            <Typography.Text strong>Leek 2</Typography.Text>
          </Col>
          <Col span={4}>
            <Typography.Text strong>Date</Typography.Text>
          </Col>
          <Col span={2}>
            <Typography.Text strong>Action</Typography.Text>
          </Col>
        </Row>
      }
      locale={{
        emptyText: <Empty description="No fights found for this pool duel." />,
      }}
      pagination={{
        current: currentPage,
        pageSize: limit,
        total,
        showSizeChanger: true,
        pageSizeOptions: [10, 20, 50, 100],
        onChange: handlePaginationChange,
        onShowSizeChange: handlePaginationChange,
      }}
      renderItem={(item) => {
        if ('skeleton' in item) {
          return (
            <List.Item key={item.id} style={listItemStyle}>
              <Row gutter={16} style={{ width: '100%' }}>
                <Col span={8}>
                  <Skeleton.Avatar active size="small" shape="circle" />
                  <Skeleton.Input
                    active
                    size="small"
                    style={{ marginLeft: 8, width: 120 }}
                  />
                </Col>
                <Col span={2}>
                  <Skeleton.Input active size="small" style={{ width: 24 }} />
                </Col>
                <Col span={8}>
                  <Skeleton.Avatar active size="small" shape="circle" />
                  <Skeleton.Input
                    active
                    size="small"
                    style={{ marginLeft: 8, width: 120 }}
                  />
                </Col>
                <Col span={4}>
                  <Skeleton.Input active size="small" style={{ width: 100 }} />
                </Col>
                <Col span={2}>
                  <Skeleton.Button active size="small" shape="circle" />
                </Col>
              </Row>
            </List.Item>
          );
        }

        const fight = item;
        const leek1 = leeks.find((leek) => leek.id === fight.leek1Id);
        const leek2 = leeks.find((leek) => leek.id === fight.leek2Id);

        if (!leek1 || !leek2) {
          return null;
        }

        return (
          <List.Item key={fight.id} style={listItemStyle}>
            <PoolDuelFightListItem fight={fight} leek1={leek1} leek2={leek2} />
          </List.Item>
        );
      }}
    />
  );
}

export default PoolDuelFightList;
