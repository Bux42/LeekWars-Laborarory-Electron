import React, { useState, useEffect } from 'react';
import { IPoolRunListProps } from './PoolRunList.types';
import { poolRunListStyles as styles } from './PoolRunList.styles';
import { getDuration, getTimeAgo } from '../../../utils/DateUtils';
import Button from '../../shared/button/Button';
import Spinner from '../../shared/spinner/Spinner';
import { theme } from '../../../theme';

function PoolRunList({ runs, onViewRun }: IPoolRunListProps) {
  // Local state to force re-render for active runs durations
  const [, setTick] = useState(0);

  useEffect(() => {
    // Also tick if we want the "x minutes ago" to be dynamic
    const interval = setInterval(() => {
      setTick((t) => t + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={styles.container}>
      {runs.map((run) => (
        <div
          key={run.id}
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
            <div style={styles.titleContainer}>
              <span style={styles.poolName}>
                {run.basePool?.name || 'Unknown Pool'}
              </span>
              {run.running && <Spinner size="small" />}
            </div>
            <span style={styles.details}>
              Duration: {getDuration(run.startDate, run.endDate)}
              {run.interrupted && (
                <> • Interrupted ({getTimeAgo(run.endDate)})</>
              )}
              {!run.running && !run.interrupted && (
                <> • Completed ({getTimeAgo(run.endDate)})</>
              )}
            </span>
          </div>
          <div style={styles.actions}>
            <Button onClick={() => onViewRun(run)} variant="primary">
              View Run
            </Button>
          </div>
        </div>
      ))}
      {runs.length === 0 && <p style={styles.emptyText}>No pool runs found.</p>}
    </div>
  );
}

export default PoolRunList;
