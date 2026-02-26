import { useNavigate } from 'react-router-dom';
import PoolFarmerList from '../../../components/pool/farmer/pool-farmer-list/PoolFarmerList';
import Button from '../../../components/shared/button/Button';
import { poolsStyles as styles } from '../Pools.styles';

function PoolFarmer() {
  const navigate = useNavigate();

  return (
    <div style={styles.section}>
      <div style={styles.sectionHeader}>
        <h2 style={styles.sectionTitle}>Farmer Pools</h2>
        <Button
          onClick={() => navigate('/pools/farmer/create')}
          variant="primary"
        >
          Add Pool
        </Button>
      </div>

      {/* {isLoading && <p style={styles.loadingText}>Loading pools...</p>}
      {error && (
        <p style={styles.errorText}>
          Error:{' '}
          {error instanceof Error ? error.message : 'Failed to fetch pools'}
        </p>
      )}
      {!isLoading && !error && data?.pools?.length === 0 && (
        <p style={styles.emptyText}>No pools found.</p>
      )}
      <PoolFarmerList pools={data?.pools || []} /> */}
    </div>
  );
}

export default PoolFarmer;
