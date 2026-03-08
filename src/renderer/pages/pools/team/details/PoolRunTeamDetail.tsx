import { useEffect, useMemo, useState } from 'react';
import { Tabs } from 'antd';
import { usePoolRunTeamId } from '../../../../../hooks/pool-runs/team/usePoolRunTeamId';
import { useGetTeamPoolRunId } from '../../../../../services/team-pool-runs/team-pool-runs';
import { usePoolFightEstimation } from '../../../../../hooks/pools/duel/usePoolFightEstimation';
import BasePoolRunWrapper from '../../../../components/pool-runs/base-pool-run-wrapper/BasePoolRunWrapper';
import { IPoolRunBase } from '../../../../../services/leekwars-laboratory/types/pool/run/PoolRunBase.types';
import { poolsStyles as styles } from '../../Pools.styles';

function PoolRunTeamDetail() {
  const poolRunId = usePoolRunTeamId();

  const [processedFights, setProcessedFights] = useState(0);

  // useGetTeamPoolRunGetByPoolIdId
  const {
    data: teamPoolRun,
    isLoading,
    error,
  } = useGetTeamPoolRunId(poolRunId);

  // const {
  //   data: fightCountData,
  //   isLoading: fightCountLoading,
  //   error: fightCountError,
  // } = useGetFightFarmerGetCountByPoolRunIdId(poolRunId);

  // useEffect(() => {
  //   if (fightCountData) {
  //     setProcessedFights(fightCountData.count);
  //   }
  // }, [fightCountData]);

  // usePoolTeamFightCountWs(poolRunId || '', (count) => {
  //   setProcessedFights(count);
  // });

  const { totalFights } = usePoolFightEstimation(
    teamPoolRun?.teams.length || 0,
    teamPoolRun?.basePool.fightLimit,
  );

  const teamsSortedByElo = useMemo(() => {
    if (!teamPoolRun || !teamPoolRun.teams) return [];
    return [...teamPoolRun.teams].sort((a, b) => b.elo - a.elo);
  }, [teamPoolRun]);

  const onStopTeamPoolRun = async () => {
    // Implement stop functionality if needed
  };

  if (isLoading) {
    return <p>Loading pool run details...</p>;
  }

  if (error || !teamPoolRun) {
    return <p>Error: Failed to fetch pool run details</p>;
  }

  return (
    <>
      <div style={styles.sectionHeader}>
        <h2 style={styles.sectionTitle}>Run Details</h2>
      </div>
      <BasePoolRunWrapper
        combinationsCount={teamPoolRun.teams.length}
        processedFights={processedFights}
        run={teamPoolRun as IPoolRunBase}
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
              key: 'farmers',
              label: 'Farmers',
              children: (
                <>
                  {/* {farmersSortedByElo.map((farmer) => (
                    <PoolFarmerFarmer key={farmer.id} farmer={farmer} />
                  ))} */}
                  Todo
                </>
              ),
            },
            // {
            //   key: 'charts',
            //   label: 'Charts',
            //   children: (
            //     <>
            //       {farmersSortedByElo.map((farmer) => (
            //         <PoolDuelLeek key={farmer.id} leek={farmer} />
            //       ))}
            //     </>
            //   ),
            // },
            {
              key: 'fights',
              label: 'Fights',
              children: (
                // <PoolFarmerFightList
                //   farmers={farmersSortedByElo}
                //   poolFarmerId={poolFarmerData?.id || ''}
                // />
                <>Todo</>
              ),
            },
          ]}
        />
      </BasePoolRunWrapper>
    </>
  );
}

export default PoolRunTeamDetail;
