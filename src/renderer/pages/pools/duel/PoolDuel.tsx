import { useNavigate } from 'react-router-dom';
import { poolsStyles as styles } from '../Pools.styles';
import BasePoolList from '../../../components/pool/base/base-pool-list/BasePoolList';
import Button from '../../../components/shared/button/Button';
import { useGetDuelPoolsAll } from '../../../../services/duel-pools/duel-pools';

function PoolDuel() {
  const navigate = useNavigate();
  // const { data: pools = [], isLoading, error } = usePoolDuels();

  const { data, isLoading, error } = useGetDuelPoolsAll({
    query: {
      queryKey: ['duelPools'],
    },
  });

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

      {isLoading && <p style={styles.loadingText}>Loading pools...</p>}
      {!!error && <p style={styles.errorText}>Error: Failed to fetch pools</p>}
      {!isLoading && !error && (
        <BasePoolList
          pools={data?.pools || []}
          getLabel={(pool) => `${pool.leeks.length} leeks`}
          onActionClick={(pool) => navigate(`/pools/duel/${pool.id}`)}
          emptyMessage="No pool duels found."
        />
      )}
    </div>
  );
}

export default PoolDuel;
