import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Result } from 'antd';
import { pumpkinPoolCreationStyles as styles } from './PumpkinPoolCreation.styles';
import BasePoolForm from '../../../../components/pool/base/base-pool-form/BasePoolForm';
import { CreateBasePoolRequest } from '../../../../../services/leekwarsToolsAPI.schemas';
import { DEFAULT_BASE_POOL } from '../../../../constants/pools/Pools.constants';
import { useGetMobsAllMobType } from '../../../../../services/mobs/mobs';
import Spinner from '../../../../components/shared/spinner/Spinner';
import MobList from '../../../../components/mob/mob-list/MobList';
import { usePostPumpkinPoolsCreate } from '../../../../../services/pumpkin-pools/pumpkin-pools';
import { useGetLeekGroupsAll } from '../../../../../services/leek-groups/leek-groups';
import LeekGroupList from '../../../../components/leek-group/leek-group-list/LeekGroupList';
import LeekGroupPicker from '../../../../components/leek-group/leek-group-picker/LeekGroupPicker';

function PumpkinPoolCreation() {
  const navigate = useNavigate();

  const [basePoolRequest, setBasePoolRequest] = useState<CreateBasePoolRequest>(
    { ...DEFAULT_BASE_POOL },
  );
  const [selectedLeekGroupIds, setSelectedLeekGroupIds] = useState<string[]>(
    [],
  );
  const [selectedMobIds, setSelectedMobIds] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const {
    data: leekGroupsData,
    isLoading: leekGroupsLoading,
    error: leekGroupsError,
  } = useGetLeekGroupsAll({
    query: {
      queryKey: ['leek-groups'],
    },
  });

  const {
    data: pumpkins,
    isLoading: isLoadingPumpkins,
    error: pumpkinsError,
  } = useGetMobsAllMobType('pumpkin');

  const createPoolPumpkinMutation = usePostPumpkinPoolsCreate();

  const availableLeekGroups = useMemo(() => {
    if (!leekGroupsData) return [];
    const poolLeekGroupIds = new Set(selectedLeekGroupIds);
    return leekGroupsData.leekGroups.filter(
      (leekGroup) => !poolLeekGroupIds.has(leekGroup.id),
    );
  }, [leekGroupsData, selectedLeekGroupIds]);

  const availableMobs = useMemo(() => {
    if (!pumpkins) return [];
    const poolMobIds = new Set(selectedMobIds);
    return pumpkins.mobs.filter((mob) => !poolMobIds.has(mob.id));
  }, [pumpkins, selectedMobIds]);

  const handleAddMob = (mobId: string) => {
    if (!selectedMobIds.includes(mobId)) {
      setSelectedMobIds([...selectedMobIds, mobId]);
    }
  };

  const handleRemoveMob = (mobId: string) => {
    setSelectedMobIds(selectedMobIds.filter((id) => id !== mobId));
  };

  const handleLeekGroupSelect = (leekGroupId: string) => {
    if (!selectedLeekGroupIds.includes(leekGroupId)) {
      setSelectedLeekGroupIds([...selectedLeekGroupIds, leekGroupId]);
    }
  };

  const handleRemoveLeekGroup = (leekGroupId: string) => {
    setSelectedLeekGroupIds(
      selectedLeekGroupIds.filter((id) => id !== leekGroupId),
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!basePoolRequest.name?.trim()) {
      setError('Pool name is required');
      return;
    }
    if (selectedLeekGroupIds.length < 1) {
      setError('At least 1 leek group is required for a duel pool');
      return;
    }

    try {
      setError(null);
      const result = await createPoolPumpkinMutation.mutateAsync({
        data: {
          basePoolRequest,
          leekGroupIds: selectedLeekGroupIds,
          mobIds: selectedMobIds,
        },
      });

      if (result) {
        navigate('/pools/boss/pumpkin');
      } else {
        setError('Failed to create pool');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  const isFormValid =
    selectedLeekGroupIds.length > 0 && selectedMobIds.length > 0;

  if (isLoadingPumpkins || leekGroupsLoading) {
    return <Spinner size="small" label="Loading pumpkins and leek groups..." />;
  }

  if (pumpkinsError || leekGroupsError) {
    return (
      <Result status="error" title="Error loading pumpkins and leek groups" />
    );
  }

  return (
    <div style={styles.content}>
      <h1 style={styles.title}>Create New Pumpkin Pool</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <BasePoolForm
          selectedLeeksCount={selectedLeekGroupIds.length}
          initialBasePoolRequest={basePoolRequest}
          onBasePoolRequestChange={setBasePoolRequest}
        />
      </form>
      <div style={styles.bossList}>
        <h3 style={styles.title}>Step 1: Select the mobs</h3>
        <h3>Selected mobs:</h3>
        <MobList
          mobs={
            pumpkins?.mobs.filter((mob) => selectedMobIds.includes(mob.id)) ||
            []
          }
          onRemoveMob={handleRemoveMob}
        />
        <h3>Available mobs:</h3>
        <MobList mobs={availableMobs} onAddMob={handleAddMob} />

        <h3 style={styles.title}>Step 2: Select participating leeks</h3>
        <h3>Selected leek groups:</h3>
        <LeekGroupList
          leekGroups={
            leekGroupsData?.leekGroups.filter((leekGroup) =>
              selectedLeekGroupIds.includes(leekGroup.id ?? ''),
            ) || []
          }
          onRemoveLeekGroup={handleRemoveLeekGroup}
        />
        <h3>Available leek groups ({availableLeekGroups.length})</h3>
        <LeekGroupPicker
          label="Select leek groups to participate in the pool"
          availableLeekGroups={availableLeekGroups}
          selectedLeekGroupIds={selectedLeekGroupIds}
          onAddLeekGroup={handleLeekGroupSelect}
        />
      </div>
      {error && <Result status="error" title={error} />}
      {isFormValid ? (
        <Button type="primary" onClick={handleSubmit}>
          Create Pumpkin Pool
        </Button>
      ) : (
        <p style={styles.validationMessage}>
          Please select at least one mob and one leek group to create the pool.
        </p>
      )}
      {/* Submit button and logic can be added here */}
    </div>
  );
}

export default PumpkinPoolCreation;
