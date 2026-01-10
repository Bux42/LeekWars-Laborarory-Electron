import React from 'react';
import { usePoolRunDuelId } from '../../../../hooks/pool-runs/duel/usePoolRunDuelId';
import { usePoolRunDuel } from '../../../../hooks/pool-runs/duel/usePoolRunDuel';
import { usePoolFightEstimation } from '../../../../hooks/pools/duel/usePoolFightEstimation';
import { usePoolFightDuelCountByPoolRunId } from '../../../../hooks/fights/duel/usePoolFightDuelCountByPoolRunId';
import BasePoolRunWrapper from '../../../components/pool-runs/base-pool-run-wrapper/BasePoolRunWrapper';
import ProgressBar from '../../../components/shared/progress-bar/ProgressBar';
import Spinner from '../../../components/shared/spinner/Spinner';
import { poolsStyles as styles } from '../Pools.styles';
import LeekList from '../../../components/leek/leek-list/LeekList';

const PoolRunDuelDetail: React.FC = () => {
  const runId = usePoolRunDuelId();

  // First we fetch to see if it exists and its status
  const startQuery = usePoolRunDuel(runId || '');

  // If it's running, we poll every second
  const isRunning = startQuery.data?.running ?? false;
  const {
    data: run,
    isLoading,
    error,
  } = usePoolRunDuel(runId || '', isRunning ? 1000 : undefined);

  const { totalFights } = usePoolFightEstimation(
    run?.leeks.length || 0,
    run?.pool.fightLimit,
  );

  const { data: processedFights = 0 } = usePoolFightDuelCountByPoolRunId(
    runId || '',
    isRunning ? 1000 : undefined,
  );

  if (isLoading && !run) {
    return (
      <div style={styles.container}>
        <Spinner label="Loading run details..." />
      </div>
    );
  }

  if (error || !run) {
    return (
      <div style={styles.container}>
        <p style={styles.errorText}>
          {error
            ? `Error: ${error instanceof Error ? error.message : 'Failed to fetch'}`
            : 'Run not found'}
        </p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.sectionHeader}>
        <h2 style={styles.sectionTitle}>Run Details</h2>
      </div>
      <BasePoolRunWrapper run={run}>
        <div style={{ marginBottom: '24px' }}>
          <ProgressBar
            label="Fight Progress"
            value={processedFights}
            max={totalFights}
          />
        </div>
        <LeekList leeks={run.leeks} showElo />
      </BasePoolRunWrapper>
    </div>
  );
};

export default PoolRunDuelDetail;
