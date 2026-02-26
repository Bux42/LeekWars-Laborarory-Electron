import { useNavigate } from 'react-router-dom';
import { usePoolDuelId } from '../../../../../hooks/pools/duel/usePoolDuelId';
import { poolsStyles as styles } from '../../Pools.styles';
import BasePoolWrapper from '../../../../components/pool/base-pool-wrapper/BasePoolWrapper';
import Spinner from '../../../../components/shared/spinner/Spinner';
import PoolDuelCard from '../../../../components/pool/duel/pool-duel-card/PoolDuelCard';
import { useGetDuelPoolsId } from '../../../../../services/duel-pools/duel-pools';
import {
  useGetDuelPoolRunGetByPoolIdId,
  usePostDuelPoolRunIdStart,
} from '../../../../../services/duel-pool-runs/duel-pool-runs';
import Button from '../../../../components/shared/button/Button';

function PoolDuelDetail() {
  const navigate = useNavigate();
  const poolId = usePoolDuelId();

  const { data: pool, isLoading, error } = useGetDuelPoolsId(poolId!);

  const {
    data: runsData,
    isLoading: runsLoading,
    error: runsError,
  } = useGetDuelPoolRunGetByPoolIdId(poolId || '');

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
    <BasePoolWrapper pool={pool.basePool} onStart={handleStartPool}>
      {runsData?.runs?.length > 0 && (
        <>
          <Button onClick={() => navigate(`/pools/duel/${poolId}/runs`)}>
            View {runsData?.runs?.length} Runs
          </Button>
          <Button
            onClick={() =>
              navigate(`/pools/duel/${poolId}/runs/${runsData?.runs?.[0]?.id}`)
            }
          >
            View last run
          </Button>
        </>
      )}
      <PoolDuelCard pool={pool} />
    </BasePoolWrapper>
  );
}

export default PoolDuelDetail;
