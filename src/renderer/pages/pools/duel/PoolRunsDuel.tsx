import React from 'react';
import { usePoolDuelId } from '../../../../hooks/pools/usePoolDuelId';
import { usePoolRunDuelsByPoolId } from '../../../../hooks/pool-runs/usePoolRunDuelsByPoolId';
import { poolsStyles as styles } from '../Pools.styles';
import PoolRunList from '../../../components/pool-runs/pool-run-list/PoolRunList';
import Spinner from '../../../components/shared/spinner/Spinner';
import { IPoolRunBase } from '../../../../services/leekwars-laboratory/types/pool/run/PoolRunBase.types';
import { useNavigate } from 'react-router-dom';

const PoolRunsDuel: React.FC = () => {
  const navigate = useNavigate();
  const poolId = usePoolDuelId();
  const {
    data: runs = [],
    isLoading,
    error,
  } = usePoolRunDuelsByPoolId(poolId || '', 1000);

  const handleViewRun = (run: IPoolRunBase) => {
    navigate(`/pools/duels/${poolId}/runs/${run.id}`);
  };

  if (isLoading) {
    return (
      <div style={styles.container}>
        <Spinner label="Loading pool runs..." />
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.container}>
        <p style={styles.errorText}>
          Error:{' '}
          {error instanceof Error ? error.message : 'Failed to fetch runs'}
        </p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.sectionHeader}>
        <h2 style={styles.sectionTitle}>Duel Pool Runs</h2>
      </div>
      <PoolRunList runs={runs} onViewRun={handleViewRun} />
    </div>
  );
};

export default PoolRunsDuel;
