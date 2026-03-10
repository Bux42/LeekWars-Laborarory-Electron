import { useNavigate } from 'react-router-dom';
import { Result } from 'antd';
import { poolsStyles as styles } from '../Pools.styles';
import Button from '../../../components/shared/button/Button';
import { useGetTeamPoolsAll } from '../../../../services/team-pools/team-pools';
import BasePoolList from '../../../components/pool/base/base-pool-list/BasePoolList';
import Spinner from '../../../components/shared/spinner/Spinner';

function PoolTeam() {
  const navigate = useNavigate();

  const { data, isLoading, error } = useGetTeamPoolsAll({
    query: {
      queryKey: ['teamPools'],
    },
  });

  if (isLoading) {
    return <Spinner size="small" label="Loading pools..." />;
  }

  if (error) {
    return <Result status="error" title="Error loading team pools" />;
  }

  return (
    <div style={styles.section}>
      <div style={styles.sectionHeader}>
        <h2 style={styles.sectionTitle}>Team Pools</h2>
        <Button
          onClick={() => navigate('/pools/team/create')}
          variant="primary"
        >
          Add Pool
        </Button>
      </div>
      <BasePoolList
        pools={data?.teamPools || []}
        getLabel={(pool) => `${pool.teams.length} teams`}
        onViewPoolClick={(pool) => navigate(`/pools/team/${pool.id}`)}
        emptyMessage="No team pools found."
      />
    </div>
  );
}

export default PoolTeam;
