import { useNavigate } from 'react-router-dom';
import { Result } from 'antd';
import { usePoolPumpkinId } from '../../../../hooks/pools/pumpkin/usePoolPumpkinId';
import { useGetPumpkinPoolRunGetByPoolIdId } from '../../../../services/pumpkin-pool-runs/pumpkin-pool-runs';
import { IPoolRunBase } from '../../../../services/leekwars-laboratory/types/pool/run/PoolRunBase.types';
import Spinner from '../../../components/shared/spinner/Spinner';
import PoolRunList from '../../../components/pool-runs/pool-run-list/PoolRunList';
import { poolsStyles as styles } from '../../pools/Pools.styles';

function PoolRunsPumpkin() {
  const navigate = useNavigate();
  const poolId = usePoolPumpkinId();

  const { data, isLoading, error } = useGetPumpkinPoolRunGetByPoolIdId(
    poolId || '',
  );

  const handleViewRun = (run: IPoolRunBase) => {
    navigate(`/pools/boss/pumpkin/${poolId}/runs/${run.id}`);
  };

  if (isLoading) {
    return <Spinner label="Loading pool runs..." />;
  }

  if (error) {
    return <Result status="error" title="Failed to fetch runs" />;
  }

  return (
    <>
      <div style={styles.sectionHeader}>
        <h2 style={styles.sectionTitle}>Pumpkin Pool Runs</h2>
      </div>

      <PoolRunList runs={data?.runs || []} onViewRun={handleViewRun} />
    </>
  );
}

export default PoolRunsPumpkin;
