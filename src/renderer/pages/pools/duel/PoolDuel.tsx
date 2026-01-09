import React from 'react';
import { useNavigate } from 'react-router-dom';
import { poolsStyles as styles } from '../Pools.styles';
import { usePoolDuels } from '../../../../hooks/pools/usePoolDuels';
import { useUpdatePoolDuel } from '../../../../hooks/pools/useUpdatePoolDuel';
import { IPoolDuel } from '../../../../services/leekwars-laboratory/types/pool/categories/PoolDuel.types';
import BasePoolWrapper from '../../../components/pool/BasePoolWrapper';
import PoolDuelCard from './PoolDuelCard';
import { useStartPoolDuel } from '../../../../hooks/pools/useStartPoolDuel';
import Spinner from '../../../components/shared/spinner/Spinner';
import { theme } from '../../../theme';

function PoolDuel() {
  const navigate = useNavigate();
  const { data: pools = [], isLoading, error } = usePoolDuels();
  const updateMutation = useUpdatePoolDuel();
  const startMutation = useStartPoolDuel();

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
      await startMutation.mutateAsync({ id: poolId });
    } catch (err) {
      console.error('Failed to start pool duel:', err);
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
            onSetStartSeed={(value) =>
              handleUpdatePool(pool, { startSeed: value })
            }
            onSetFightLimitEnabled={(value) =>
              handleUpdatePool(pool, { fightLimitEnabled: value })
            }
            onSetFightLimit={(value) =>
              handleUpdatePool(pool, { fightLimit: value })
            }
            onStart={() => handleStartPool(pool.id)}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                marginBottom: '10px',
              }}
            >
              <button
                onClick={() => navigate(`/pools/duels/${pool.id}`)}
                style={{
                  background: 'none',
                  border: `1px solid ${theme.colors.border.primary}`,
                  color: theme.colors.text.secondary,
                  padding: '4px 8px',
                  borderRadius: theme.borderRadius.sm,
                  cursor: 'pointer',
                  fontSize: '0.8rem',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor =
                    theme.colors.accent.primary;
                  e.currentTarget.style.color = theme.colors.text.primary;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor =
                    theme.colors.border.primary;
                  e.currentTarget.style.color = theme.colors.text.secondary;
                }}
              >
                View Details
              </button>
            </div>
            <PoolDuelCard pool={pool} />
          </BasePoolWrapper>
        ))}
      </div>
    </div>
  );
}

export default PoolDuel;
