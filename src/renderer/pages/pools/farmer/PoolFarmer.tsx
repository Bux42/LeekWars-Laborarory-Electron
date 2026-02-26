import { useNavigate } from 'react-router-dom';
import BasePoolList from '../../../components/pool/base/base-pool-list/BasePoolList';
import Button from '../../../components/shared/button/Button';
import { poolsStyles as styles } from '../Pools.styles';
import { useGetFarmerPoolsAll } from '../../../../services/farmer-pools/farmer-pools';

function PoolFarmer() {
  const navigate = useNavigate();

  const { data, isLoading, error } = useGetFarmerPoolsAll({
    query: {
      queryKey: ['farmerPools'],
    },
  });

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

      {isLoading && <p style={styles.loadingText}>Loading pools...</p>}
      {!!error && <p style={styles.errorText}>Error: Failed to fetch pools</p>}
      {!isLoading && !error && (
        <BasePoolList
          pools={data?.farmerPools || []}
          getLabel={(pool) => `${pool.farmers.length} farmers`}
          onActionClick={(pool) => navigate(`/pools/farmer/${pool.id}`)}
          emptyMessage="No farmer pools found."
        />
      )}
    </div>
  );
}

export default PoolFarmer;
