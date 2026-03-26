import { Result } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { usePoolPumpkinId } from '../../../../../hooks/pools/pumpkin/usePoolPumpkinId';
import {
  useDeletePumpkinPoolsIdRemoveLeekGroupLeekGroupId,
  useDeletePumpkinPoolsIdRemoveMobMobId,
  useGetPumpkinPoolsId,
  usePostPumpkinPoolsIdAddLeekGroupLeekGroupId,
  usePostPumpkinPoolsIdAddMobMobId,
} from '../../../../../services/pumpkin-pools/pumpkin-pools';
import BasePoolWrapper from '../../../../components/pool/base/base-pool-wrapper/BasePoolWrapper';
import Spinner from '../../../../components/shared/spinner/Spinner';
import MobList from '../../../../components/mob/mob-list/MobList';
import { useGetLeekGroupsAll } from '../../../../../services/leek-groups/leek-groups';
import { useGetMobsAllMobType } from '../../../../../services/mobs/mobs';
import LeekGroupList from '../../../../components/leek-group/leek-group-list/LeekGroupList';
import LastPoolRunsButttons from '../../../../components/pool-runs/last-pool-runs-buttons/LastPoolRunsButttons';
import { PumpkinPoolResponse } from '../../../../../services/leekwarsToolsAPI.schemas';

function PoolPumpkinDetail() {
  const poolId = usePoolPumpkinId();

  const {
    data: poolPumpkinData,
    isLoading: isLoadingPoolPumpkin,
    error: poolPumpkinError,
  } = useGetPumpkinPoolsId(poolId);

  const [pumpkinPool, setPumpkinPool] = useState<
    PumpkinPoolResponse | undefined
  >(poolPumpkinData);

  const {
    data: allLeekGroupsData,
    isLoading: isLoadingAllLeekGroups,
    error: allLeekGroupsError,
  } = useGetLeekGroupsAll();

  const {
    data: allMobsData,
    isLoading: isLoadingAllMobs,
    error: allMobsError,
  } = useGetMobsAllMobType('pumpkin');

  useEffect(() => {
    if (poolPumpkinData) {
      setPumpkinPool(poolPumpkinData);
    }
  }, [poolPumpkinData]);

  // add & remove mob from pumpkin pool mutations
  const onRemoveMobMutation = useDeletePumpkinPoolsIdRemoveMobMobId();
  const onAddMobMutation = usePostPumpkinPoolsIdAddMobMobId();

  // add & remove leek group from pumpkin pool mutations
  const onRemoveLeekGroupMutation =
    useDeletePumpkinPoolsIdRemoveLeekGroupLeekGroupId();
  const onAddLeekGroupMutation = usePostPumpkinPoolsIdAddLeekGroupLeekGroupId();

  const onRemoveMob = async (mobId: string) => {
    try {
      await onRemoveMobMutation.mutateAsync({ id: poolId!, mobId });
      setPumpkinPool((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          mobs: prev.mobs.filter((mob) => mob.id !== mobId),
        };
      });
    } catch (err) {
      console.error('Failed to remove mob from pool:', err);
    }
  };

  const onAddMob = async (mobId: string) => {
    try {
      await onAddMobMutation.mutateAsync({ id: poolId!, mobId });
      setPumpkinPool((prev) => {
        if (!prev) return prev;
        const addedMob = allMobsData?.mobs.find((mob) => mob.id === mobId);
        if (!addedMob) return prev;
        return {
          ...prev,
          mobs: [...prev.mobs, addedMob],
        };
      });
    } catch (err) {
      console.error('Failed to add mob to pool:', err);
    }
  };

  const onRemoveLeekGroup = async (leekGroupId: string) => {
    try {
      await onRemoveLeekGroupMutation.mutateAsync({ id: poolId!, leekGroupId });
      setPumpkinPool((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          leekGroups: prev.leekGroups.filter(
            (group) => group.id !== leekGroupId,
          ),
        };
      });
    } catch (err) {
      console.error('Failed to remove leek group from pool:', err);
    }
  };

  const onAddLeekGroup = async (leekGroupId: string) => {
    try {
      await onAddLeekGroupMutation.mutateAsync({ id: poolId!, leekGroupId });
      setPumpkinPool((prev) => {
        if (!prev) return prev;
        const addedLeekGroup = allLeekGroupsData?.leekGroups.find(
          (group) => group.id === leekGroupId,
        );
        if (!addedLeekGroup) return prev;
        return {
          ...prev,
          leekGroups: [...prev.leekGroups, addedLeekGroup],
        };
      });
    } catch (err) {
      console.error('Failed to add leek group to pool:', err);
    }
  };

  const handleStartPool = () => {
    // Implement start pool logic, e.g., call mutation to start a new run and navigate to run details
  };

  const availableMobs = useMemo(() => {
    if (!allMobsData || !pumpkinPool) return [];
    return allMobsData.mobs.filter(
      (mob) => !pumpkinPool.mobs.some((m) => m.id === mob.id),
    );
  }, [allMobsData, pumpkinPool]);

  const availableLeekGroups = useMemo(() => {
    if (!allLeekGroupsData || !pumpkinPool) return [];
    return allLeekGroupsData.leekGroups.filter(
      (group) => !pumpkinPool.leekGroups.some((g) => g.id === group.id),
    );
  }, [allLeekGroupsData, pumpkinPool]);

  if (isLoadingPoolPumpkin || isLoadingAllLeekGroups || isLoadingAllMobs) {
    return <Spinner label="Loading pool details..." />;
  }

  if (
    poolPumpkinError ||
    allLeekGroupsError ||
    allMobsError ||
    !poolPumpkinData ||
    !poolPumpkinData.basePool
  ) {
    return <Result status="error" title="Error loading pool details" />;
  }

  return (
    <BasePoolWrapper
      pool={poolPumpkinData.basePool}
      onStart={handleStartPool}
      totalCombinations={poolPumpkinData.leekGroups.length}
    >
      {poolPumpkinData.poolRunsInfo && (
        <LastPoolRunsButttons
          poolRunsInfo={poolPumpkinData.poolRunsInfo}
          poolType="farmer"
          poolId={poolPumpkinData.basePool.id}
        />
      )}

      <h3>Selected mobs:</h3>
      <MobList mobs={pumpkinPool?.mobs || []} onRemoveMob={onRemoveMob} />
      <h3>Available mobs:</h3>
      <MobList mobs={availableMobs} onAddMob={onAddMob} />
      <h3>Selected groups:</h3>
      <LeekGroupList
        leekGroups={pumpkinPool?.leekGroups || []}
        onRemoveLeekGroup={onRemoveLeekGroup}
        showRemoveLeekGroupButton
      />
      <h3>Available groups:</h3>
      <LeekGroupList
        leekGroups={availableLeekGroups}
        showAddGroupButton
        onAddLeekGroup={onAddLeekGroup}
      />
    </BasePoolWrapper>
  );
}

export default PoolPumpkinDetail;
