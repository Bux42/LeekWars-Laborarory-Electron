import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useNavigate } from 'react-router-dom';
import {
  LeekResponse,
  PoolLeekResponse,
} from '../../../../../services/leekwarsToolsAPI.schemas';
import { poolRunDuelLeekListStyles as styles } from './PoolRunDuelLeekList.styles';
import { IPoolRunDuelLeekListProps } from './PoolRunDuelLeekList.types';
import { getImage } from '../../../../utils/ImageLoader';
import LeekImageHover from '../../../leek/leek-image-hover/LeekImageHover';

function toLeekResponse(poolLeek: PoolLeekResponse): LeekResponse {
  return {
    ...poolLeek,
    creationDate: 0,
  };
}

function PoolRunDuelLeekList({ poolLeeks }: IPoolRunDuelLeekListProps) {
  const navigate = useNavigate();

  const columns: ColumnsType<PoolLeekResponse> = [
    {
      title: 'Avatar',
      key: 'avatar',
      width: 84,
      render: (_, leek) => (
        <div style={styles.avatarCell}>
          <LeekImageHover leek={toLeekResponse(leek)} height={40} width={40} />
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
      title: 'AI',
      key: 'ai',
      sorter: (a, b) => (a.ai?.name ?? '').localeCompare(b.ai?.name ?? ''),
      render: (_, leek) =>
        leek.ai ? (
          <button
            type="button"
            style={styles.hashLink}
            onClick={() => navigate(`/ai/${leek.ai?.id}`)}
          >
            {leek.ai?.name}
          </button>
        ) : (
          <span style={styles.emptyAiText}>No AI</span>
        ),
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
      render: (elo: number) => (
        <div style={styles.eloContainer}>
          <img
            src={getImage('leekwars/image/talent')}
            alt="talent"
            style={styles.eloIcon}
          />
          <span style={styles.value}>{elo}</span>
        </div>
      ),
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
