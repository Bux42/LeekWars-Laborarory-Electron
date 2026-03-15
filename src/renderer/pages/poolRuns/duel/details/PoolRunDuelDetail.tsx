import { useEffect, useMemo, useState } from 'react';
import { Result, Tabs } from 'antd';
import { usePoolRunDuelId } from '../../../../../hooks/pool-runs/duel/usePoolRunDuelId';
import Spinner from '../../../../components/shared/spinner/Spinner';
import { poolsStyles as styles } from '../../../pools/Pools.styles';
import {
  useGetDuelPoolRunId,
  usePostDuelPoolRunIdStop,
} from '../../../../../services/duel-pool-runs/duel-pool-runs';
import BasePoolRunWrapper from '../../../../components/pool-runs/base-pool-run-wrapper/BasePoolRunWrapper';
import { IPoolRunBase } from '../../../../../services/leekwars-laboratory/types/pool/run/PoolRunBase.types';
import { useGetFightDuelGetCountByPoolRunIdId } from '../../../../../services/duel-fights/duel-fights';
import PoolDuelFightList from '../../../../components/pool/duel/fight/pool-duel-fight-list/PoolDuelFightList';
import PoolRunDuelLeekList from '../../../../components/pool-runs/duel/pool-run-duel-leek-list/PoolRunDuelLeekList';
import { usePoolDuelFightCountWs } from '../../../../../hooks/fights/duel/usePoolDuelFightCountWs';
import DuelMatrixChart from './duel-matrix/DuelMatrixChart';

function PoolRunDuelDetail() {
  const runId = usePoolRunDuelId();
  const [processedFights, setProcessedFights] = useState(0);

  const {
    data: poolDuelData,
    isLoading: poolDuelIsLoading,
    error: poolDuelError,
  } = useGetDuelPoolRunId(runId);

  const stopMutation = usePostDuelPoolRunIdStop();

  const {
    data: fightCountData,
    isLoading: fightCountLoading,
    error: fightCountError,
  } = useGetFightDuelGetCountByPoolRunIdId(runId);

  useEffect(() => {
    if (fightCountData) {
      setProcessedFights(fightCountData.count);
    }
  }, [fightCountData]);

  usePoolDuelFightCountWs(runId || '', (count) => {
    setProcessedFights(count);
  });

  const onStopDuelPoolRun = async () => {
    if (poolDuelData?.id) {
      try {
        const result = await stopMutation.mutateAsync({ id: poolDuelData.id });
        console.log('Stop result:', result);
      } catch (err) {
        console.error('Failed to stop duel pool run:', err);
      }
    }
  };

  const leekSortedByElo = useMemo(
    () => [...(poolDuelData?.leeks || [])].sort((a, b) => b.elo - a.elo),
    [poolDuelData?.leeks],
  );

  if (!runId) {
    return <Result status="error" title="Invalid run ID" />;
  }

  if (poolDuelIsLoading || fightCountLoading || !poolDuelData) {
    return <Spinner label="Loading run details..." />;
  }

  if (poolDuelError || fightCountError) {
    return <Result status="error" title="Error: Failed to fetch run details" />;
  }

  return (
    <>
      <div style={styles.sectionHeader}>
        <h2 style={styles.sectionTitle}>Run Details</h2>
      </div>
      <BasePoolRunWrapper
        combinationsCount={poolDuelData.leeks.length}
        processedFights={processedFights}
        run={poolDuelData as IPoolRunBase}
        onStop={onStopDuelPoolRun}
      >
        <Tabs
          defaultActiveKey="1"
          items={[
            {
              key: 'global',
              label: 'Global',
              children: <>Global</>,
            },
            {
              key: 'leeks',
              label: 'Leeks',
              children: <PoolRunDuelLeekList poolLeeks={leekSortedByElo} />,
            },
            {
              key: 'charts',
              label: 'Charts',
              children: <DuelMatrixChart leeks={leekSortedByElo} />,
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
      </BasePoolRunWrapper>
    </>
  );
}

export default PoolRunDuelDetail;
