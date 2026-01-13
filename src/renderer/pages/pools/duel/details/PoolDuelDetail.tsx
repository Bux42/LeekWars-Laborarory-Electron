import React from 'react';
import { useNavigate } from 'react-router-dom';
import { usePoolDuels } from '../../../../../hooks/pools/duel/usePoolDuels';
import { usePoolDuelId } from '../../../../../hooks/pools/duel/usePoolDuelId';
import { poolsStyles as styles } from '../../Pools.styles';
import BasePoolWrapper from '../../../../components/pool/base-pool-wrapper/BasePoolWrapper';
import { useUpdatePoolDuel } from '../../../../../hooks/pools/duel/useUpdatePoolDuel';
import { useStartPoolDuel } from '../../../../../hooks/pools/duel/useStartPoolDuel';
import { IPoolDuel } from '../../../../../services/leekwars-laboratory/types/pool/categories/PoolDuel.types';
import Spinner from '../../../../components/shared/spinner/Spinner';
import PoolDuelCard from '../../../../components/pool/duel/pool-duel-card/PoolDuelCard';

function PoolDuelDetail() {
  const navigate = useNavigate();
  const poolId = usePoolDuelId();
  const { data: pools = [], isLoading, error } = usePoolDuels();
  const updateMutation = useUpdatePoolDuel();
  const startMutation = useStartPoolDuel();

  const pool = pools.find((p) => p.id === poolId);

  const handleUpdatePool = async (
    pool: IPoolDuel,
    changes: Partial<IPoolDuel>,
  ) => {
    try {
      await updateMutation.mutateAsync({
        pool: { ...pool, ...changes },
      });
    } catch (err) {
      console.error('Failed to update pool:', err);
    }
  };

  const handleStartPool = async (poolId: string) => {
    try {
      const result = await startMutation.mutateAsync({ id: poolId });
      if (result?.run_id) {
        navigate(`/pools/duels/${poolId}/runs/${result.run_id}`);
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

  if (error || !pool) {
    return (
      <div style={styles.container}>
        <p style={styles.errorText}>
          {error
            ? `Error: ${error instanceof Error ? error.message : 'Failed to fetch'}`
            : 'Pool not found'}
        </p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <BasePoolWrapper
        pool={pool}
        onSetEnabled={(value) => handleUpdatePool(pool, { enabled: value })}
        onSetResetElo={(value) => handleUpdatePool(pool, { resetElo: value })}
        onSetDeterministic={(value) =>
          handleUpdatePool(pool, { deterministic: value })
        }
        onSetStartSeed={(value) => handleUpdatePool(pool, { startSeed: value })}
        onSetFightLimitEnabled={(value) =>
          handleUpdatePool(pool, { fightLimitEnabled: value })
        }
        onSetFightLimit={(value) =>
          handleUpdatePool(pool, { fightLimit: value })
        }
        onStart={() => handleStartPool(pool.id)}
      >
        <PoolDuelCard pool={pool} />
      </BasePoolWrapper>
    </div>
  );
}

export default PoolDuelDetail;
