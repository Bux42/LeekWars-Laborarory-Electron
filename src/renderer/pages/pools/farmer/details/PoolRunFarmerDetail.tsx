import { useEffect, useMemo, useState } from 'react';
import { Tabs } from 'antd';
import { usePoolRunFarmerId } from '../../../../../hooks/pool-runs/farmer/usePoolRunFarmerId';
import {
  useGetFarmerPoolRunId,
  usePostFarmerPoolRunIdStop,
} from '../../../../../services/farmer-pool-runs/farmer-pool-runs';
import { IPoolRunBase } from '../../../../../services/leekwars-laboratory/types/pool/run/PoolRunBase.types';
import BasePoolRunWrapper from '../../../../components/pool-runs/base-pool-run-wrapper/BasePoolRunWrapper';
import { poolsStyles as styles } from '../../Pools.styles';
import { usePoolFightEstimation } from '../../../../../hooks/pools/duel/usePoolFightEstimation';
import { useGetFightFarmerGetCountByPoolRunIdId } from '../../../../../services/farmer-fights/farmer-fights';
import PoolFarmerFarmer from '../../../../components/pool/farmer/pool-farmer-farmer/PoolFarmerFarmer';
import PoolFarmerFightList from '../../../../components/pool/farmer/fight/pool-farmer-fight-list/PoolFarmerFightList';
import { usePoolFarmerFightCountWs } from '../../../../../hooks/fights/farmer/usePoolFarmerFightCountWs';

function PoolRunFarmerDetail() {
  const poolRunId = usePoolRunFarmerId();
  const [processedFights, setProcessedFights] = useState(0);

  const stopMutation = usePostFarmerPoolRunIdStop();

  const {
    data: poolFarmerData,
    isLoading,
    error,
  } = useGetFarmerPoolRunId(poolRunId);

  const onStopFarmerPoolRun = async () => {
    if (poolFarmerData?.id) {
      try {
        const result = await stopMutation.mutateAsync({
          id: poolFarmerData.id,
        });
        console.log('Stop result:', result);
      } catch (err) {
        console.error('Failed to stop farmer pool run:', err);
      }
    }
  };

  const {
    data: fightCountData,
    isLoading: fightCountLoading,
    error: fightCountError,
  } = useGetFightFarmerGetCountByPoolRunIdId(poolRunId);

  useEffect(() => {
    if (fightCountData) {
      setProcessedFights(fightCountData.count);
    }
  }, [fightCountData]);

  usePoolFarmerFightCountWs(poolRunId || '', (count) => {
    setProcessedFights(count);
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
        combinationsCount={poolFarmerData.farmers.length}
        processedFights={processedFights}
        run={poolFarmerData as IPoolRunBase}
        onStop={onStopFarmerPoolRun}
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
      </BasePoolRunWrapper>
    </>
  );
}

export default PoolRunFarmerDetail;
