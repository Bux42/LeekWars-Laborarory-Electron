import { useNavigate } from 'react-router-dom';
import Button from '../../../components/shared/button/Button';
import { poolsStyles as styles } from '../Pools.styles';
import BasePoolList from '../../../components/pool/base/base-pool-list/BasePoolList';

function PoolPumpkin() {
  const navigate = useNavigate();
  // Todo: display list of pumpkin pools, with links to details and runs
  return (
    <div style={styles.section}>
      <div style={styles.sectionHeader}>
        <h2 style={styles.sectionTitle}>Pumpkin Pools</h2>
        <Button
          onClick={() => navigate('/pools/boss/pumpkin/create')}
          variant="primary"
        >
          Add Pool
        </Button>
      </div>
      <BasePoolList
        pools={[]}
        poolType="boss"
        getLabel={(pool) => `${666} bosses`}
        emptyMessage="No boss pools found."
      />
    </div>
  );
}

export default PoolPumpkin;
