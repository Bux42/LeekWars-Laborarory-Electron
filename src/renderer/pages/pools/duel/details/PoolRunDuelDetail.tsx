import { useEffect, useMemo, useState } from 'react';
import { Result, Tabs } from 'antd';
import { usePoolRunDuelId } from '../../../../../hooks/pool-runs/duel/usePoolRunDuelId';
import Spinner from '../../../../components/shared/spinner/Spinner';
import { poolsStyles as styles } from '../../Pools.styles';
import {
  useGetDuelPoolRunId,
  usePostDuelPoolRunIdStop,
} from '../../../../../services/duel-pool-runs/duel-pool-runs';
import BasePoolRunWrapper from '../../../../components/pool-runs/base-pool-run-wrapper/BasePoolRunWrapper';
import { IPoolRunBase } from '../../../../../services/leekwars-laboratory/types/pool/run/PoolRunBase.types';
import {
  useGetFightDuelFightersRatioPoolRunId,
  useGetFightDuelGetCountByPoolRunIdId,
} from '../../../../../services/duel-fights/duel-fights';
import PoolDuelFightList from '../../../../components/pool/duel/fight/pool-duel-fight-list/PoolDuelFightList';
import PoolRunDuelLeekList from '../../../../components/pool-runs/duel/pool-run-duel-leek-list/PoolRunDuelLeekList';
import { usePoolDuelFightCountWs } from '../../../../../hooks/fights/duel/usePoolDuelFightCountWs';
import ChordDiagram from '../../../../components/charts/chord-diagram/ChordDiagram';

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

  const {
    data: fightersRatioData,
    isLoading: fightersRatioLoading,
    error: fightersRatioError,
  } = useGetFightDuelFightersRatioPoolRunId(runId);

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

  if (poolDuelIsLoading || fightCountLoading) {
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
              children: (
                <>
                  <ChordDiagram
                    nodes={
                      fightersRatioData?.fighters.map((x) => ({
                        name: x,
                      })) || []
                    }
                    links={
                      fightersRatioData?.ratios.map((x) => ({
                        source: x.fighter1,
                        target: x.fighter2,
                        value: x.wins,
                      })) || []
                    }
                    title="Wins"
                  />
                  <ChordDiagram
                    nodes={
                      fightersRatioData?.fighters.map((x) => ({
                        name: x,
                      })) || []
                    }
                    links={
                      fightersRatioData?.ratios.map((x) => ({
                        source: x.fighter1,
                        target: x.fighter2,
                        value: x.losses,
                      })) || []
                    }
                    title="Losses"
                  />
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
      </BasePoolRunWrapper>
    </>
  );
}

export default PoolRunDuelDetail;
