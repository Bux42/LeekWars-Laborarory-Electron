import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IPoolDuelListProps } from './PoolDuelList.types';
import { poolDuelListStyles as styles } from './PoolDuelList.styles';
import Button from '../../../shared/button/Button';
import { theme } from '../../../../theme';
import Spinner from '../../../shared/spinner/Spinner';
import { usePoolRunDuels } from '../../../../../hooks/pool-runs/duel/usePoolRunDuels';

const PoolDuelList: React.FC<IPoolDuelListProps> = ({ pools }) => {
  const navigate = useNavigate();

  // First we fetch to see if any run is active
  const initialQuery = usePoolRunDuels();

  // If at least one run is active, we poll
  const hasActiveRuns = initialQuery.data?.some((run) => run.running) ?? false;
  const { data: runs = [] } = usePoolRunDuels(hasActiveRuns ? 1000 : undefined);

  const getActiveRunsCount = (poolId: string) => {
    return runs.filter((run) => run.pool.id === poolId && run.running).length;
  };

  return (
    <div style={styles.container}>
      {pools.map((pool) => (
        <div
          key={pool.id}
          style={styles.item}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = theme.colors.accent.primary;
            e.currentTarget.style.backgroundColor =
              theme.colors.background.tertiary;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = theme.colors.border.primary;
            e.currentTarget.style.backgroundColor =
              theme.colors.background.secondary;
          }}
        >
          <div style={styles.info}>
            <div style={styles.nameContainer}>
              <span style={styles.name}>{pool.name}</span>
              {getActiveRunsCount(pool.id) > 0 && (
                <Spinner
                  size="small"
                  label={`${getActiveRunsCount(pool.id)} running`}
                  direction="row"
                />
              )}
            </div>
            <span style={styles.details}>
              {pool.leekIds.length} leeks • Pool ID: {pool.id.substring(0, 8)}
              ...
            </span>
          </div>
          <div style={styles.actions}>
            <Button
              onClick={() => navigate(`/pools/duels/${pool.id}`)}
              variant="primary"
            >
              View Pool
            </Button>
          </div>
        </div>
      ))}
      {pools.length === 0 && (
        <p style={styles.emptyText}>No pool duels found.</p>
      )}
    </div>
  );
};

export default PoolDuelList;
