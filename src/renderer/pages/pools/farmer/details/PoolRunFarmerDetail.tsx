import { useEffect, useMemo, useState } from 'react';
import { Tabs } from 'antd';
import { usePoolRunFarmerId } from '../../../../../hooks/pool-runs/farmer/usePoolRunFarmerId';
import { useGetFarmerPoolRunId } from '../../../../../services/farmer-pool-runs/farmer-pool-runs';
import { IPoolRunBase } from '../../../../../services/leekwars-laboratory/types/pool/run/PoolRunBase.types';
import BasePoolRunWrapper from '../../../../components/pool-runs/base-pool-run-wrapper/BasePoolRunWrapper';
import { poolsStyles as styles } from '../../Pools.styles';
import ProgressBar from '../../../../components/shared/progress-bar/ProgressBar';
import { usePoolFightEstimation } from '../../../../../hooks/pools/duel/usePoolFightEstimation';
import { useGetApiFightFarmerGetCountByPoolRunIdId } from '../../../../../services/farmer-fights/farmer-fights';
import { useWs } from '../../../../../services/websocket/useWs';
import PoolFarmerFarmer from '../../../../components/pool/farmer/pool-farmer-farmer/PoolFarmerFarmer';
import PoolFarmerFightList from '../../../../components/pool/farmer/fight/pool-farmer-fight-list/PoolFarmerFightList';

function PoolRunFarmerDetail() {
  const poolRunId = usePoolRunFarmerId();
  const [processedFights, setProcessedFights] = useState(0);

  const {
    data: poolFarmerData,
    isLoading,
    error,
  } = useGetFarmerPoolRunId(poolRunId);

  const onStopFarmerPoolRun = () => {
    // Implement stop pool run logic here
    console.log('Stop pool run:', poolRunId);
  };

  const {
    data: fightCountData,
    isLoading: fightCountLoading,
    error: fightCountError,
  } = useGetApiFightFarmerGetCountByPoolRunIdId(poolRunId);

  useEffect(() => {
    if (fightCountData) {
      setProcessedFights(fightCountData.count);
    }
  }, [fightCountData]);

  useWs('FARMER_POOL_FIGHT_COUNT', (payload) => {
    console.log(payload.count); // fully typed
  });

  const { totalFights } = usePoolFightEstimation(
    poolFarmerData?.farmers.length || 0,
    poolFarmerData?.basePool.fightLimit,
  );

  const farmersSortedByElo = useMemo(() => {
    if (!poolFarmerData || !poolFarmerData.farmers) return [];
    return [...poolFarmerData.farmers].sort((a, b) => b.elo - a.elo);
  }, [poolFarmerData]);

  if (isLoading) {
    return <p>Loading pool run details...</p>;
  }

  if (error || !poolFarmerData) {
    return <p>Error: Failed to fetch pool run details</p>;
  }

  return (
    <>
      <div style={styles.sectionHeader}>
        <h2 style={styles.sectionTitle}>Run Details</h2>
      </div>
      <BasePoolRunWrapper
        run={poolFarmerData as IPoolRunBase}
        onStop={onStopFarmerPoolRun}
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
              key: 'farmers',
              label: 'Farmers',
              children: (
                <>
                  {farmersSortedByElo.map((farmer) => (
                    <PoolFarmerFarmer key={farmer.id} farmer={farmer} />
                  ))}
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
                <PoolFarmerFightList
                  farmers={farmersSortedByElo}
                  poolFarmerId={poolFarmerData?.id || ''}
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
    </>
  );
}

export default PoolRunFarmerDetail;
