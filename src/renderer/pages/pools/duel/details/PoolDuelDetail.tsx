import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePoolDuelId } from '../../../../../hooks/pools/duel/usePoolDuelId';
import { poolsStyles as styles } from '../../Pools.styles';
import Spinner from '../../../../components/shared/spinner/Spinner';
import PoolDuelCard from '../../../../components/pool/duel/pool-duel-card/PoolDuelCard';
import {
  useGetDuelPoolsId,
  useGetDuelPoolsIdRunsInfo,
} from '../../../../../services/duel-pools/duel-pools';
import { usePostDuelPoolRunIdStart } from '../../../../../services/duel-pool-runs/duel-pool-runs';
import BasePoolWrapper from '../../../../components/pool/base/base-pool-wrapper/BasePoolWrapper';
import LastPoolRunsButttons from '../../../../components/pool-runs/last-pool-runs-buttons/LastPoolRunsButttons';

function PoolDuelDetail() {
  const navigate = useNavigate();
  const poolId = usePoolDuelId();

  const { data: pool, isLoading, error } = useGetDuelPoolsId(poolId!);

  const {
    data: runsInfo,
    isLoading: runsInfoLoading,
    error: runsInfoError,
  } = useGetDuelPoolsIdRunsInfo(poolId || '');

  const startMutation = usePostDuelPoolRunIdStart();

  if (!poolId) {
    return <p style={styles.errorText}>Invalid pool ID</p>;
  }

  const handleStartPool = async () => {
    try {
      const result = await startMutation.mutateAsync({ id: poolId });
      if (result.id) {
        navigate(`/pools/duel/${poolId}/runs/${result.id}`);
      }
    } catch (err) {
      console.error('Failed to start pool duel:', err);
    }
  };

  if (isLoading) {
    return <Spinner label="Loading pool details..." />;
  }

  if (error || !pool || !pool.basePool) {
    return (
      <p style={styles.errorText}>
        {error ? 'Error: Failed to fetch pool details' : 'Pool not found'}
      </p>
    );
  }

  return (
    <BasePoolWrapper
      pool={pool.basePool}
      onStart={handleStartPool}
      totalCombinations={pool.leeks.length}
    >
      {runsInfo && (
        <LastPoolRunsButttons
          poolRunsInfo={runsInfo}
          poolType="duel"
          poolId={pool.id}
        />
      )}
      <PoolDuelCard pool={pool} />
    </BasePoolWrapper>
  );
}

export default PoolDuelDetail;
