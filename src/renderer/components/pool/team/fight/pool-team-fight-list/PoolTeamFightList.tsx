import { useState } from 'react';
import { Col, Empty, List, Result, Row, Skeleton, Typography } from 'antd';
import {
  useGetFightTeamGetByPoolRunIdIdOffsetLimit,
  useGetFightTeamGetCountByPoolRunIdId,
} from '../../../../../../services/team-fights/team-fights';
import { IPoolTeamFightListProps } from './PoolTeamFightList.types';
import { theme } from '../../../../../theme';
import PoolTeamFightListItem from '../pool-team-fight-list-item/PoolTeamFightListItem';
import Spinner from '../../../../shared/spinner/Spinner';

function PoolTeamFightList({ teams, poolTeamId }: IPoolTeamFightListProps) {
  const [offset, setOffset] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);

  const { data, error, isLoading } = useGetFightTeamGetByPoolRunIdIdOffsetLimit(
    poolTeamId,
    offset.toString(),
    limit.toString(),
  );
  const { data: countData } = useGetFightTeamGetCountByPoolRunIdId(poolTeamId);

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
        const team1 = teams.find((team) => team.id === fight.team1Id);
        const team2 = teams.find((team) => team.id === fight.team2Id);

        if (!team1 || !team2) {
          return null;
        }

        return (
          <List.Item key={fight.id} style={listItemStyle}>
            <PoolTeamFightListItem fight={fight} team1={team1} team2={team2} />
          </List.Item>
        );
      }}
    />
  );
}

export default PoolTeamFightList;
