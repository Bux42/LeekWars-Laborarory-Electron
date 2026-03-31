import { useEffect, useMemo, useState } from 'react';
import { Result, Tabs } from 'antd';
import { usePoolRunPumpkinId } from '../../../../../hooks/pool-runs/pumpkin/usePoolRunPumpkinId';
import { useGetPumpkinPoolRunId } from '../../../../../services/pumpkin-pool-runs/pumpkin-pool-runs';
import { useGetFightPumpkinGetCountByPoolRunIdId } from '../../../../../services/pumpkin-fights/pumpkin-fights';
import { usePoolPumpkinFightCountWs } from '../../../../../hooks/fights/pumpkin/usePoolTeamFightCountWs';
import Spinner from '../../../../components/shared/spinner/Spinner';
import BasePoolRunWrapper from '../../../../components/pool-runs/base-pool-run-wrapper/BasePoolRunWrapper';
import { poolsStyles as styles } from '../../Pools.styles';
import { IPoolRunBase } from '../../../../../services/leekwars-laboratory/types/pool/run/PoolRunBase.types';
import PoolPumpkinFightList from '../../../../components/pool/pumpkin/fight/pool-pumpkin-fight-list/PoolPumpkinFightList';
import PoolLeekGroupCard from '../../../../components/pool/leek-group/pool-leek-group-card/PoolLeekGroupCard';

function PoolRunPumpkinDetail() {
  const poolRunId = usePoolRunPumpkinId();
  const [processedFights, setProcessedFights] = useState(0);

  // const stopMutation = usePostPumpkinPoolRunIdStop();

  const {
    data: pumpkinPoolRun,
    isLoading,
    error,
  } = useGetPumpkinPoolRunId(poolRunId);

  const {
    data: fightCountData,
    isLoading: fightCountLoading,
    error: fightCountError,
  } = useGetFightPumpkinGetCountByPoolRunIdId(poolRunId);

  useEffect(() => {
    if (fightCountData) {
      setProcessedFights(fightCountData.count);
    }
  }, [fightCountData]);

  usePoolPumpkinFightCountWs(poolRunId || '', (count) => {
    setProcessedFights(count);
  });

  const leekGroupsSortedByWins = useMemo(() => {
    if (!pumpkinPoolRun || !pumpkinPoolRun.leekGroups) return [];
    return [...pumpkinPoolRun.leekGroups].sort(
      (a, b) => b.fightRatio.wins - a.fightRatio.wins,
    );
  }, [pumpkinPoolRun]);

  const onStopTeamPoolRun = async () => {
    // if (pumpkinPoolRun?.id) {
    //   try {
    //     const result = await stopMutation.mutateAsync({
    //       id: pumpkinPoolRun.id,
    //     });
    //     console.log('Stop result:', result);
    //   } catch (err) {
    //     console.error('Failed to stop pool run:', err);
    //   }
    // }
  };

  if (isLoading || fightCountLoading) {
    return <Spinner label="Loading pool run details..." />;
  }

  if (error || fightCountError) {
    return <Result status="error" title="Error: Failed to fetch run details" />;
  }

  return (
    <>
      <div style={styles.sectionHeader}>
        <h2 style={styles.sectionTitle}>Run Details</h2>
      </div>
      <BasePoolRunWrapper
        combinationsCount={pumpkinPoolRun?.leekGroups?.length || 0}
        processedFights={processedFights}
        run={pumpkinPoolRun as IPoolRunBase}
        onStop={onStopTeamPoolRun}
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
              key: 'groups',
              label: 'Groups',
              children: (
                <div>
                  {leekGroupsSortedByWins.map((group) => (
                    <PoolLeekGroupCard
                      key={group.id}
                      group={group}
                      processedFights={processedFights}
                    />
                  ))}
                </div>
              ),
            },
            // {
            //   key: 'charts',
            //   label: 'Charts',
            //   children: <TeamMatrixChart teams={teamPoolRun?.teams || []} />,
            // },
            {
              key: 'fights',
              label: 'Fights',
              children: (
                <PoolPumpkinFightList
                  poolPumpkinId={poolRunId}
                  leekGroups={pumpkinPoolRun?.leekGroups || []}
                />
              ),
            },
          ]}
        />
      </BasePoolRunWrapper>
    </>
  );
}

export default PoolRunPumpkinDetail;
