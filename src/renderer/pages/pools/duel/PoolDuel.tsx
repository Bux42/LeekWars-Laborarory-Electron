import { poolsStyles as styles } from '../Pools.styles';
import { usePoolDuels } from '../../../../hooks/pools/usePoolDuels';
import PoolDuelList from '../../../components/pool/duel/pool-duel-list/PoolDuelList';

function PoolDuel() {
  const { data: pools = [], isLoading, error } = usePoolDuels();

  return (
    <div style={styles.container}>
      <div style={styles.section}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>Duel Pools</h2>
        </div>

        {isLoading && <p style={styles.loadingText}>Loading pools...</p>}
        {error && (
          <p style={styles.errorText}>
            Error:{' '}
            {error instanceof Error ? error.message : 'Failed to fetch pools'}
          </p>
        )}
        {!isLoading && !error && pools.length === 0 && (
          <p style={styles.emptyText}>No pools found.</p>
        )}
        <PoolDuelList pools={pools} />
      </div>
    </div>
  );
}

export default PoolDuel;
