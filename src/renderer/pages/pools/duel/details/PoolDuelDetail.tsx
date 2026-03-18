import { useNavigate } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { Result } from 'antd';
import { usePoolDuelId } from '../../../../../hooks/pools/duel/usePoolDuelId';
import { poolsStyles as styles } from '../../Pools.styles';
import Spinner from '../../../../components/shared/spinner/Spinner';
import {
  useGetDuelPoolsId,
  useGetDuelPoolsIdRunsInfo,
  usePostDuelPoolsIdAddLeek,
  usePostDuelPoolsIdRemoveLeek,
} from '../../../../../services/duel-pools/duel-pools';
import { usePostDuelPoolRunIdStart } from '../../../../../services/duel-pool-runs/duel-pool-runs';
import BasePoolWrapper from '../../../../components/pool/base/base-pool-wrapper/BasePoolWrapper';
import LastPoolRunsButttons from '../../../../components/pool-runs/last-pool-runs-buttons/LastPoolRunsButttons';
import { DuelPoolResponse } from '../../../../../services/leekwarsToolsAPI.schemas';
import LeekList from '../../../../components/leek/leek-list/LeekList';
import { useGetLeeksAll } from '../../../../../services/leeks/leeks';
import { poolDuelDetailStyles } from './PoolDuelDetail.styles';

function PoolDuelDetail() {
  const navigate = useNavigate();
  const poolId = usePoolDuelId();

  const [pool, setPool] = useState<DuelPoolResponse | undefined>(undefined);

  const {
    data: poolData,
    isLoading: poolLoading,
    error: poolError,
  } = useGetDuelPoolsId(poolId!);

  const {
    data: allLeeks,
    isLoading: allLeeksLoading,
    error: allLeeksError,
  } = useGetLeeksAll({
    query: {
      queryKey: ['leeks'],
    },
  });

  useEffect(() => {
    if (poolData) {
      setPool(poolData);
    }
  }, [poolData]);

  const {
    data: runsInfo,
    isLoading: runsInfoLoading,
    error: runsInfoError,
  } = useGetDuelPoolsIdRunsInfo(poolId || '');

  const startMutation = usePostDuelPoolRunIdStart();

  const addLeekMutation = usePostDuelPoolsIdAddLeek();
  const removeLeekMutation = usePostDuelPoolsIdRemoveLeek();

  const handleAddLeek = async (leekId: string) => {
    try {
      const updatedPool = await addLeekMutation.mutateAsync({
        id: poolId,
        data: {
          leekId,
        },
      });
      setPool(updatedPool);
    } catch (err) {
      console.error('Failed to add leek to pool:', err);
    }
  };

  const onRemoveLeek = async (leekId: string) => {
    try {
      const updatedPool = await removeLeekMutation.mutateAsync({
        id: poolId,
        data: {
          leekId,
        },
      });
      setPool(updatedPool);
    } catch (err) {
      console.error('Failed to remove leek from pool:', err);
    }
  };

  const handleStartPool = async () => {
    try {
      const result = await startMutation.mutateAsync({ id: poolId });
      if (result.id) {
        navigate(`/pools/duel/${poolId}/runs/${result.id}`);
      }
    } catch (err) {
      console.error('Failed to start pool duel:', err);
    }
  };

  const availableLeeks = useMemo(() => {
    if (!allLeeks || !pool) return [];
    const poolLeekIds = new Set(pool.leeks.map((leek) => leek.id));
    return allLeeks.leeks.filter((leek) => !poolLeekIds.has(leek.id));
  }, [allLeeks, pool]);

  if (!poolId) {
    return <p style={styles.errorText}>Invalid pool ID</p>;
  }

  if (
    poolLoading ||
    runsInfoLoading ||
    allLeeksLoading ||
    !pool ||
    !pool.basePool
  ) {
    return <Spinner size="small" label="Loading pool details..." />;
  }

  if (poolError || runsInfoError || allLeeksError) {
    return <Result status="error" title="Error loading pool details" />;
  }

  return (
    <BasePoolWrapper
      pool={pool.basePool}
      onStart={handleStartPool}
      totalCombinations={pool.leeks.length}
    >
      {runsInfo && (
        <LastPoolRunsButttons
          poolRunsInfo={runsInfo}
          poolType="duel"
          poolId={pool.id}
        />
      )}
      <h3 style={poolDuelDetailStyles.title}>
        Leeks in Pool ({pool.leeks.length})
      </h3>
      {pool.leeks.length > 0 ? (
        <LeekList leeks={pool.leeks} onRemoveLeek={onRemoveLeek} />
      ) : (
        <p style={styles.emptyText}>No leeks in this pool.</p>
      )}
      <h3 style={poolDuelDetailStyles.title}>
        Available Leeks ({availableLeeks.length})
      </h3>
      <LeekList leeks={availableLeeks} onAddLeek={handleAddLeek} />
    </BasePoolWrapper>
  );
}

export default PoolDuelDetail;
