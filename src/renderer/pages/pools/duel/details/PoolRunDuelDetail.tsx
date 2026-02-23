import { usePoolRunDuelId } from '../../../../../hooks/pool-runs/duel/usePoolRunDuelId';
import Spinner from '../../../../components/shared/spinner/Spinner';
import { poolsStyles as styles } from '../../Pools.styles';
import { useGetDuelPoolRunsId } from '../../../../../services/duel-pool-runs/duel-pool-runs';
import BasePoolRunWrapper from '../../../../components/pool-runs/base-pool-run-wrapper/BasePoolRunWrapper';
import { IPoolRunBase } from '../../../../../services/leekwars-laboratory/types/pool/run/PoolRunBase.types';

function PoolRunDuelDetail() {
  const runId = usePoolRunDuelId();
  // const stopMutation = useStopPoolDuel();

  // First we fetch to see if it exists and its status
  // const startQuery = usePoolRunDuel(runId || '');

  const { data, isLoading, error } = useGetDuelPoolRunsId(runId);

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

  // const { totalFights } = usePoolFightEstimation(
  //   run?.leeks.length || 0,
  //   run?.pool.fightLimit,
  // );

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

  if (isLoading) {
    return (
      <div style={styles.container}>
        <Spinner label="Loading run details..." />
      </div>
    );
  }

  if (error) {
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
      <BasePoolRunWrapper
        run={data as IPoolRunBase}
        onStop={() => console.log('Stop run')}
      />
      {/*  <div style={{ marginBottom: '24px' }}>
          <ProgressBar
            label="Fight Progress"
            value={processedFights}
            max={totalFights}
          />
        </div>

        {chartData.length > 0 && (
          <div style={{ marginBottom: '24px' }}>
            <TalentChart
              data={chartData}
              title="Talent Progression"
              height={350}
            />
          </div>
        )}

        {run.leeks.map((leek) => (
          <LeekDetail key={leek.id} leek={leek} />
        ))}
      </BasePoolRunWrapper> */}
    </div>
  );
}

export default PoolRunDuelDetail;
