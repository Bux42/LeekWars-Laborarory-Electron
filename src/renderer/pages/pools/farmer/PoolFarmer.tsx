import { useNavigate } from 'react-router-dom';
import { Result } from 'antd';
import BasePoolList from '../../../components/pool/base/base-pool-list/BasePoolList';
import Button from '../../../components/shared/button/Button';
import { poolsStyles as styles } from '../Pools.styles';
import { useGetFarmerPoolsAll } from '../../../../services/farmer-pools/farmer-pools';
import Spinner from '../../../components/shared/spinner/Spinner';

function PoolFarmer() {
  const navigate = useNavigate();

  const { data, isLoading, error } = useGetFarmerPoolsAll({
    query: {
      queryKey: ['farmerPools'],
    },
  });

  if (isLoading) {
    return <Spinner size="small" label="Loading pools..." />;
  }

  if (error) {
    return <Result status="error" title="Error loading farmer pools" />;
  }

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
      <BasePoolList
        pools={data?.farmerPools || []}
        getLabel={(pool) => `${pool.farmers.length} farmers`}
        onViewPoolClick={(pool) => navigate(`/pools/farmer/${pool.id}`)}
        emptyMessage="No farmer pools found."
      />
    </div>
  );
}

export default PoolFarmer;
