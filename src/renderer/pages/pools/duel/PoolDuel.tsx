import React from 'react';
import { poolsStyles as styles } from '../Pools.styles';
import { usePoolDuels } from '../../../../hooks/pools/usePoolDuels';
import { useUpdatePoolDuel } from '../../../../hooks/pools/useUpdatePoolDuel';
import { IPoolDuel } from '../../../../services/leekwars-laboratory/types/pool/categories/PoolDuel.types';
import BasePoolWrapper from '../../../components/pool/BasePoolWrapper';
import PoolDuelCard from './PoolDuelCard';

function PoolDuel() {
  const { data: pools = [], isLoading, error } = usePoolDuels();
  const updateMutation = useUpdatePoolDuel();

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

  return (
    <div style={styles.container}>
      <div style={styles.section}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>Duel Pools</h2>
        </div>

        {isLoading && <p style={styles.loadingText}>Loading pools...</p>}
        {error && (
          <p style={styles.errorText}>
            Error:{' '}
            {error instanceof Error ? error.message : 'Failed to fetch pools'}
          </p>
        )}
        {!isLoading && !error && pools.length === 0 && (
          <p style={styles.emptyText}>No pools found.</p>
        )}

        {pools.map((pool) => (
          <BasePoolWrapper
            key={pool.id}
            pool={pool}
            onSetEnabled={(value) => handleUpdatePool(pool, { enabled: value })}
            onSetResetElo={(value) =>
              handleUpdatePool(pool, { resetElo: value })
            }
            onSetDeterministic={(value) =>
              handleUpdatePool(pool, { deterministic: value })
            }
          >
            <PoolDuelCard pool={pool} />
          </BasePoolWrapper>
        ))}
      </div>
    </div>
  );
}

export default PoolDuel;
