import { useState } from 'react';
import { Col, Empty, List, Result, Row, Typography } from 'antd';
import { IPoolPumpkinFightListProps } from './PoolPumpkinFightList.types';
import {
  useGetFightPumpkinGetByPoolRunIdIdOffsetLimit,
  useGetFightPumpkinGetCountByPoolRunIdId,
} from '../../../../../../services/pumpkin-fights/pumpkin-fights';
import { theme } from '../../../../../theme';
import Spinner from '../../../../shared/spinner/Spinner';
import PoolPumpkinFightListItem from '../pool-pumpkin-fight-list-item/PoolPumpkinFightListItem';

function PoolPumpkinFightList({
  leekGroups,
  poolPumpkinId,
}: IPoolPumpkinFightListProps) {
  const [offset, setOffset] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);

  const { data, error, isLoading } =
    useGetFightPumpkinGetByPoolRunIdIdOffsetLimit(
      poolPumpkinId,
      offset.toString(),
      limit.toString(),
    );
  const { data: countData } =
    useGetFightPumpkinGetCountByPoolRunIdId(poolPumpkinId);

  const total = countData?.count ?? data?.fights.length ?? 0;
  const currentPage = Math.floor(offset / limit) + 1;
  const listItemStyle = {
    padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
  };

  function handlePaginationChange(page: number, pageSize: number) {
    setLimit(pageSize);
    setOffset((page - 1) * pageSize);
  }

  if (isLoading) {
    return <Spinner label="Loading fights..." />;
  }

  if (error) {
    return <Result status="error" title="Error: Failed to fetch fights" />;
  }

  return (
    <List
      bordered
      dataSource={data?.fights}
      header={
        <Row gutter={16}>
          <Col span={8}>
            <Typography.Text strong>Team 1</Typography.Text>
          </Col>
          <Col span={2}>
            <Typography.Text strong> </Typography.Text>
          </Col>
          <Col span={8}>
            <Typography.Text strong>Team 2</Typography.Text>
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
        emptyText: <Empty description="No fights found for this pool team." />,
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
        const fight = item;
        const leekGroup = leekGroups.find(
          (group) => group.id === fight.leekGroupId,
        );

        if (!leekGroup) {
          return null;
        }

        return (
          <List.Item key={fight.id} style={listItemStyle}>
            <PoolPumpkinFightListItem fight={fight} leekGroup={leekGroup} />
          </List.Item>
        );
      }}
    />
  );
}

export default PoolPumpkinFightList;
