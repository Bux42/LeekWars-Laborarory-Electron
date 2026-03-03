import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import {
  LeekResponse,
  PoolLeekResponse,
} from '../../../../../services/leekwarsToolsAPI.schemas';
import LeekImage from '../../../leek/leek-image/LeekImage';
import { poolRunDuelLeekListStyles as styles } from './PoolRunDuelLeekList.styles';
import { IPoolRunDuelLeekListProps } from './PoolRunDuelLeekList.types';

function toLeekResponse(poolLeek: PoolLeekResponse): LeekResponse {
  return {
    ...poolLeek,
    creationDate: 0,
  };
}

function PoolRunDuelLeekList({ poolLeeks }: IPoolRunDuelLeekListProps) {
  const columns: ColumnsType<PoolLeekResponse> = [
    {
      title: 'Avatar',
      key: 'avatar',
      width: 84,
      render: (_, leek) => (
        <div style={styles.avatarCell}>
          <LeekImage
            leek={toLeekResponse(leek)}
            showTooltip
            height={40}
            width={40}
          />
        </div>
      ),
    },
    {
      title: 'Leek Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (name: string) => <span style={styles.name}>{name}</span>,
    },
    {
      title: 'Level',
      key: 'level',
      sorter: (a, b) => (a.build?.level ?? 0) - (b.build?.level ?? 0),
      render: (_, leek) => (
        <span style={styles.value}>{leek.build?.level ?? 0}</span>
      ),
    },
    {
      title: 'Elo',
      dataIndex: 'elo',
      key: 'elo',
      sorter: (a, b) => (a.elo ?? 0) - (b.elo ?? 0),
      defaultSortOrder: 'descend',
      render: (elo: number) => <span style={styles.value}>{elo}</span>,
    },
  ];

  return (
    <div style={styles.container}>
      <Table
        columns={columns}
        dataSource={poolLeeks}
        rowKey="id"
        pagination={false}
        size="middle"
      />
    </div>
  );
}

export default PoolRunDuelLeekList;
