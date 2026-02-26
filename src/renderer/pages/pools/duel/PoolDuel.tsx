import { useNavigate } from 'react-router-dom';
import { poolsStyles as styles } from '../Pools.styles';
import PoolDuelList from '../../../components/pool/duel/pool-duel-list/PoolDuelList';
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
          onClick={() => navigate('/pools/duels/create')}
          variant="primary"
        >
          Add Pool
        </Button>
      </div>

      {isLoading && <p style={styles.loadingText}>Loading pools...</p>}
      {error && (
        <p style={styles.errorText}>
          Error:{' '}
          {error instanceof Error ? error.message : 'Failed to fetch pools'}
        </p>
      )}
      {!isLoading && !error && data?.pools?.length === 0 && (
        <p style={styles.emptyText}>No pools found.</p>
      )}
      <PoolDuelList pools={data?.pools || []} />
    </div>
  );
}

export default PoolDuel;
