import React from 'react';
import { useNavigate } from 'react-router-dom';
import { usePoolDuelId } from '../../../../hooks/pools/duel/usePoolDuelId';
import { poolsStyles as styles } from '../Pools.styles';
import PoolRunList from '../../../components/pool-runs/pool-run-list/PoolRunList';
import Spinner from '../../../components/shared/spinner/Spinner';
import { IPoolRunBase } from '../../../../services/leekwars-laboratory/types/pool/run/PoolRunBase.types';
import { useGetDuelPoolRunGetByPoolIdId } from '../../../../services/duel-pool-runs/duel-pool-runs';

function PoolRunsDuel() {
  const navigate = useNavigate();
  const poolId = usePoolDuelId();

  const { data, isLoading, error } = useGetDuelPoolRunGetByPoolIdId(
    poolId || '',
  );

  const handleViewRun = (run: IPoolRunBase) => {
    navigate(`/pools/duels/${poolId}/runs/${run.id}`);
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

export default PoolRunsDuel;
