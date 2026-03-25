import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Result } from 'antd';
import { pumpkinPoolCreationStyles as styles } from './PumpkinPoolCreation.styles';
import { useGetLeeksAll } from '../../../../../services/leeks/leeks';
import LeekList from '../../../../components/leek/leek-list/LeekList';
import BasePoolForm from '../../../../components/pool/base/base-pool-form/BasePoolForm';
import { CreateBasePoolRequest } from '../../../../../services/leekwarsToolsAPI.schemas';
import { DEFAULT_BASE_POOL } from '../../../../constants/pools/Pools.constants';
import { useGetMobsAllMobType } from '../../../../../services/mobs/mobs';
import Spinner from '../../../../components/shared/spinner/Spinner';
import MobList from '../../../../components/mob/mob-list/MobList';
import { usePostPumpkinPoolsCreate } from '../../../../../services/pumpkin-pools/pumpkin-pools';

function PumpkinPoolCreation() {
  const navigate = useNavigate();

  const [basePoolRequest, setBasePoolRequest] = useState<CreateBasePoolRequest>(
    { ...DEFAULT_BASE_POOL },
  );
  const [selectedLeekIds, setSelectedLeekIds] = useState<string[]>([]);
  const [selectedMobIds, setSelectedMobIds] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const {
    data: leeksData,
    isLoading: leeksLoading,
    error: leeksError,
  } = useGetLeeksAll({
    query: {
      queryKey: ['leeks'],
    },
  });

  const {
    data: pumpkins,
    isLoading: isLoadingPumpkins,
    error: pumpkinsError,
  } = useGetMobsAllMobType('pumpkin');

  const createPoolPumpkinMutation = usePostPumpkinPoolsCreate();

  const availableLeeks = useMemo(() => {
    if (!leeksData) return [];
    const poolLeekIds = new Set(selectedLeekIds);
    return leeksData.leeks.filter((leek) => !poolLeekIds.has(leek.id));
  }, [leeksData, selectedLeekIds]);

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

  const handleLeekSelect = (leekId: string) => {
    if (!selectedLeekIds.includes(leekId)) {
      setSelectedLeekIds([...selectedLeekIds, leekId]);
    }
  };

  const handleRemoveLeek = (leekId: string) => {
    setSelectedLeekIds(selectedLeekIds.filter((id) => id !== leekId));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!basePoolRequest.name?.trim()) {
      setError('Pool name is required');
      return;
    }
    if (selectedLeekIds.length < 2) {
      setError('At least 2 leeks are required for a duel pool');
      return;
    }

    try {
      setError(null);
      const result = await createPoolPumpkinMutation.mutateAsync({
        data: {
          basePoolRequest,
          leekIds: selectedLeekIds,
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

  const isFormValid = selectedLeekIds.length > 0 && selectedMobIds.length > 0;

  if (isLoadingPumpkins || leeksLoading) {
    return <Spinner size="small" label="Loading pumpkins and leeks..." />;
  }

  if (pumpkinsError || leeksError) {
    return <Result status="error" title="Error loading pumpkins and leeks" />;
  }

  return (
    <div style={styles.content}>
      <h1 style={styles.title}>Create New Pumpkin Pool</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <BasePoolForm
          selectedLeeksCount={selectedLeekIds.length}
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
        <h3>Selected leeks:</h3>
        <LeekList
          leeks={
            leeksData?.leeks.filter((leek) =>
              selectedLeekIds.includes(leek.id ?? ''),
            ) || []
          }
          onRemoveLeek={handleRemoveLeek}
        />
        <h3>Available leeks ({availableLeeks.length})</h3>
        <LeekList leeks={availableLeeks} onAddLeek={handleLeekSelect} />
      </div>
      {error && <Result status="error" title={error} />}
      {isFormValid ? (
        <Button type="primary" onClick={handleSubmit}>
          Create Pumpkin Pool
        </Button>
      ) : (
        <p style={styles.validationMessage}>
          Please select at least one mob and one leek to create the pool.
        </p>
      )}
      {/* Submit button and logic can be added here */}
    </div>
  );
}

export default PumpkinPoolCreation;
