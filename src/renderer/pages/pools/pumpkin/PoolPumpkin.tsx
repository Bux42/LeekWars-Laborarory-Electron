import { useNavigate } from 'react-router-dom';
import { Result } from 'antd';
import Button from '../../../components/shared/button/Button';
import { poolsStyles as styles } from '../Pools.styles';
import BasePoolList from '../../../components/pool/base/base-pool-list/BasePoolList';
import { useGetPumpkinPoolsAll } from '../../../../services/pumpkin-pools/pumpkin-pools';
import Spinner from '../../../components/shared/spinner/Spinner';

function PoolPumpkin() {
  const navigate = useNavigate();
  // Todo: display list of pumpkin pools, with links to details and runs

  const {
    data: pumpkinPools,
    isLoading: pumpkinPoolsLoading,
    error: pumpkinPoolsError,
  } = useGetPumpkinPoolsAll();

  if (pumpkinPoolsLoading) {
    return <Spinner size="small" label="Loading pools..." />;
  }

  if (pumpkinPoolsError) {
    return <Result status="error" title="Error loading pumpkin pools" />;
  }

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
        pools={pumpkinPools?.pumpkinPools ?? []}
        poolType="boss"
        bossType="pumpkin"
        getLabel={(pool) =>
          `${pool.mobs.length} bosses and ${pool.leekGroups.length} leek groups`
        }
        emptyMessage="No boss pools found."
      />
    </div>
  );
}

export default PoolPumpkin;
