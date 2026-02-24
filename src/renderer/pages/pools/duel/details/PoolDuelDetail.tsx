import { useNavigate } from 'react-router-dom';
import { usePoolDuelId } from '../../../../../hooks/pools/duel/usePoolDuelId';
import { poolsStyles as styles } from '../../Pools.styles';
import BasePoolWrapper from '../../../../components/pool/base-pool-wrapper/BasePoolWrapper';
import Spinner from '../../../../components/shared/spinner/Spinner';
import PoolDuelCard from '../../../../components/pool/duel/pool-duel-card/PoolDuelCard';
import { useGetDuelPoolsId } from '../../../../../services/duel-pools/duel-pools';
import { usePostDuelPoolRunsIdStart } from '../../../../../services/duel-pool-runs/duel-pool-runs';

function PoolDuelDetail() {
  const navigate = useNavigate();
  const poolId = usePoolDuelId();

  const { data: pool, isLoading, error } = useGetDuelPoolsId(poolId!);
  const startMutation = usePostDuelPoolRunsIdStart();

  if (!poolId) {
    return (
      <div style={styles.container}>
        <p style={styles.errorText}>Invalid pool ID</p>
      </div>
    );
  }

  const handleStartPool = async () => {
    try {
      const result = await startMutation.mutateAsync({ id: poolId });
      if (result.id) {
        navigate(`/pools/duels/${poolId}/runs/${result.id}`);
      }
    } catch (err) {
      console.error('Failed to start pool duel:', err);
    }
  };

  if (isLoading) {
    return (
      <div style={styles.container}>
        <Spinner label="Loading pool details..." />
      </div>
    );
  }

  if (error || !pool || !pool.basePool) {
    return (
      <div style={styles.container}>
        <p style={styles.errorText}>
          {error ? 'Error: Failed to fetch pool details' : 'Pool not found'}
        </p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <BasePoolWrapper pool={pool.basePool} onStart={handleStartPool}>
        <PoolDuelCard pool={pool} />
      </BasePoolWrapper>
    </div>
  );
}

export default PoolDuelDetail;
