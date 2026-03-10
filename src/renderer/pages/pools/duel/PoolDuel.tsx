import { useNavigate } from 'react-router-dom';
import { Result } from 'antd';
import { poolsStyles as styles } from '../Pools.styles';
import BasePoolList from '../../../components/pool/base/base-pool-list/BasePoolList';
import Button from '../../../components/shared/button/Button';
import { useGetDuelPoolsAll } from '../../../../services/duel-pools/duel-pools';
import Spinner from '../../../components/shared/spinner/Spinner';

function PoolDuel() {
  const navigate = useNavigate();

  const { data, isLoading, error } = useGetDuelPoolsAll({
    query: {
      queryKey: ['duelPools'],
    },
  });

  if (isLoading) {
    return <Spinner size="small" label="Loading pools..." />;
  }

  if (error) {
    return <Result status="error" title="Error loading duel pools" />;
  }

  return (
    <div style={styles.section}>
      <div style={styles.sectionHeader}>
        <h2 style={styles.sectionTitle}>Duel Pools</h2>
        <Button
          onClick={() => navigate('/pools/duel/create')}
          variant="primary"
        >
          Add Pool
        </Button>
      </div>
      <BasePoolList
        pools={data?.pools || []}
        getLabel={(pool) => `${pool.leeks.length} leeks`}
        onViewPoolClick={(pool) => navigate(`/pools/duel/${pool.id}`)}
        emptyMessage="No duel pools found."
      />
    </div>
  );
}

export default PoolDuel;
