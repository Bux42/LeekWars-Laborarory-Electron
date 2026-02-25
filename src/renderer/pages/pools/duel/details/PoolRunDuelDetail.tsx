import { use, useEffect, useMemo, useState } from 'react';
import { Tabs } from 'antd';
import { usePoolRunDuelId } from '../../../../../hooks/pool-runs/duel/usePoolRunDuelId';
import Spinner from '../../../../components/shared/spinner/Spinner';
import { poolsStyles as styles } from '../../Pools.styles';
import { useGetDuelPoolRunId } from '../../../../../services/duel-pool-runs/duel-pool-runs';
import BasePoolRunWrapper from '../../../../components/pool-runs/base-pool-run-wrapper/BasePoolRunWrapper';
import { IPoolRunBase } from '../../../../../services/leekwars-laboratory/types/pool/run/PoolRunBase.types';
import { usePoolFightEstimation } from '../../../../../hooks/pools/duel/usePoolFightEstimation';
import ProgressBar from '../../../../components/shared/progress-bar/ProgressBar';
import LeekDetail from '../../../../components/leek/leek-detail/LeekDetail';
import PoolDuelLeek from '../../../../components/pool/duel/pool-duel-leek/PoolDuelLeek';
import { useGetApiFightDuelGetCountByPoolRunIdId } from '../../../../../services/duel-fights/duel-fights';
import PoolDuelFightList from '../../../../components/pool/duel/fight/pool-duel-fight-list/PoolDuelFightList';

function PoolRunDuelDetail() {
  const runId = usePoolRunDuelId();
  // const stopMutation = useStopPoolDuel();
  const [processedFights, setProcessedFights] = useState(0);

  // First we fetch to see if it exists and its status
  // const startQuery = usePoolRunDuel(runId || '');

  const {
    data: poolDuelData,
    isLoading: poolDuelIsLoading,
    error: poolDuelError,
  } = useGetDuelPoolRunId(runId);

  const {
    data: fightCountData,
    isLoading: fightCountLoading,
    error: fightCountError,
  } = useGetApiFightDuelGetCountByPoolRunIdId(runId);

  useEffect(() => {
    if (fightCountData) {
      setProcessedFights(fightCountData.count);
    }
  }, [fightCountData]);

  // const handleStop = async () => {
  //   if (run?.id) {
  //     try {
  //       await stopMutation.mutateAsync({ id: run.id });
  //     } catch (err) {
  //       console.error('Failed to stop pool:', err);
  //     }
  //   }
  // };

  // // If it's running, we poll every second
  // const isRunning = startQuery.data?.running ?? false;
  // const {
  //   data: run,
  //   isLoading,
  //   error,
  // } = usePoolRunDuel(runId || '', isRunning ? 1000 : undefined);

  const { totalFights } = usePoolFightEstimation(
    poolDuelData?.leeks.length || 0,
    poolDuelData?.basePool.fightLimit,
  );

  // const { data: processedFights = 0 } = usePoolFightDuelCountByPoolRunId(
  //   runId || '',
  //   isRunning ? 1000 : undefined,
  // );

  // const { data: eloData } = useEloProgression(
  //   runId || '',
  //   isRunning ? 5000 : undefined, // Poll every 5s for the chart
  // );

  // const chartData = (eloData?.eloProgression || []).map((point) => ({
  //   ...point,
  //   datetime: point.timestamp,
  // }));

  const leekSortedByElo = useMemo(
    () => [...(poolDuelData?.leeks || [])].sort((a, b) => b.elo - a.elo),
    [poolDuelData?.leeks],
  );

  if (poolDuelIsLoading) {
    return (
      <div style={styles.container}>
        <Spinner label="Loading run details..." />
      </div>
    );
  }

  if (poolDuelError) {
    return (
      <div style={styles.container}>
        <p style={styles.errorText}>
          {poolDuelError
            ? `Error: ${poolDuelError instanceof Error ? poolDuelError.message : 'Failed to fetch'}`
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
      <BasePoolRunWrapper
        run={poolDuelData as IPoolRunBase}
        onStop={() => console.log('Stop run')}
      >
        <Tabs
          defaultActiveKey="1"
          items={[
            {
              key: 'global',
              label: 'Global',
              children: (
                <div style={{ marginBottom: '24px' }}>
                  <ProgressBar
                    label="Fight Progress"
                    value={processedFights}
                    max={totalFights}
                  />
                </div>
              ),
            },
            {
              key: 'leeks',
              label: 'Leeks',
              children: (
                <>
                  {leekSortedByElo.map((leek) => (
                    <PoolDuelLeek key={leek.id} leek={leek} />
                  ))}
                </>
              ),
            },
            {
              key: 'charts',
              label: 'Charts',
              children: (
                <>
                  {leekSortedByElo.map((leek) => (
                    <PoolDuelLeek key={leek.id} leek={leek} />
                  ))}
                </>
              ),
            },
            {
              key: 'fights',
              label: 'Fights',
              children: (
                <PoolDuelFightList
                  leeks={leekSortedByElo}
                  poolDuelId={poolDuelData?.id || ''}
                />
              ),
            },
          ]}
        />

        {/*  {chartData.length > 0 && (
          <div style={{ marginBottom: '24px' }}>
            <TalentChart
              data={chartData}
              title="Talent Progression"
              height={350}
            />
          </div>
        )}
 */}
      </BasePoolRunWrapper>
    </div>
  );
}

export default PoolRunDuelDetail;
