import { useNavigate } from 'react-router-dom';
import { usePoolFarmerId } from '../../../../hooks/pools/farmer/usePoolFarmerId';
import { useGetFarmerPoolRunGetByPoolIdId } from '../../../../services/farmer-pool-runs/farmer-pool-runs';
import { IPoolRunBase } from '../../../../services/leekwars-laboratory/types/pool/run/PoolRunBase.types';
import Spinner from '../../../components/shared/spinner/Spinner';
import PoolRunList from '../../../components/pool-runs/pool-run-list/PoolRunList';
import { poolsStyles as styles } from '../Pools.styles';

function PoolRunsFarmer() {
  const navigate = useNavigate();
  const poolId = usePoolFarmerId();

  const { data, isLoading, error } = useGetFarmerPoolRunGetByPoolIdId(
    poolId || '',
  );

  const handleViewRun = (run: IPoolRunBase) => {
    navigate(`/pools/farmer/${poolId}/runs/${run.id}`);
  };

  if (isLoading) {
    return <Spinner label="Loading pool runs..." />;
  }

  if (error) {
    return <p style={styles.errorText}>Error: Failed to fetch runs</p>;
  }

  return (
    <>
      <div style={styles.sectionHeader}>
        <h2 style={styles.sectionTitle}>Duel Pool Runs</h2>
      </div>

      <PoolRunList runs={data?.runs || []} onViewRun={handleViewRun} />
    </>
  );
}

export default PoolRunsFarmer;
