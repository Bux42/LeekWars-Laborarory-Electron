import React, { useState } from 'react';
import { basePoolWrapperStyles as styles } from './BasePoolWrapper.styles';
import { IBasePoolWrapperProps } from './BasePoolWrapper.types';
import Toggle from '../../../shared/toggle/Toggle';
import Input from '../../../shared/input/Input';
import Button from '../../../shared/button/Button';
import Spinner from '../../../shared/spinner/Spinner';
import {
  usePostBasePoolsIdSetDeterministic,
  usePostBasePoolsIdSetEnabled,
  usePostBasePoolsIdSetFightLimit,
  usePostBasePoolsIdSetFightLimitEnabled,
  usePostBasePoolsIdSetResetElo,
  usePostBasePoolsIdSetStartSeed,
} from '../../../../../services/base-pools/base-pools';
import { usePoolFightEstimation } from '../../../../../hooks/pools/duel/usePoolFightEstimation';

function BasePoolWrapper({
  pool,
  totalCombinations,
  children,
  onStart,
}: IBasePoolWrapperProps) {
  const [loading, setLoading] = React.useState(false);
  const [currentPool, setCurrentPool] = React.useState(pool);

  const [fightLimit, setFightLimit] = useState<number | undefined>(
    pool.fightLimitEnabled ? pool.fightLimit : undefined,
  );

  const setDeterministicMutation = usePostBasePoolsIdSetDeterministic();
  const setEnabledMutation = usePostBasePoolsIdSetEnabled();
  const setFightLimitMutation = usePostBasePoolsIdSetFightLimit();
  const setFightLimitEnabledMutation = usePostBasePoolsIdSetFightLimitEnabled();
  const setResetEloMutation = usePostBasePoolsIdSetResetElo();
  const setStartSeedMutation = usePostBasePoolsIdSetStartSeed();

  React.useEffect(() => {
    setCurrentPool(pool);
  }, [pool]);

  const triggerAsync = (promise: Promise<unknown>) => {
    promise.catch(() => undefined);
  };

  const getPoolId = () => currentPool.id;

  const handleStart = async () => {
    setLoading(true);
    try {
      await onStart();
    } finally {
      setLoading(false);
    }
  };

  const handleSetEnabled = async (value: boolean) => {
    const poolId = getPoolId();
    if (!poolId) {
      return;
    }

    const updatedPool = await setEnabledMutation.mutateAsync({
      id: poolId,
      data: { value },
    });
    setCurrentPool(updatedPool);
  };

  const handleSetDeterministic = async (value: boolean) => {
    const poolId = getPoolId();
    if (!poolId) {
      return;
    }

    const updatedPool = await setDeterministicMutation.mutateAsync({
      id: poolId,
      data: { value },
    });
    setCurrentPool(updatedPool);
  };

  const handleSetResetElo = async (value: boolean) => {
    const poolId = getPoolId();
    if (!poolId) {
      return;
    }

    const updatedPool = await setResetEloMutation.mutateAsync({
      id: poolId,
      data: { value },
    });
    setCurrentPool(updatedPool);
  };

  const handleSetFightLimitEnabled = async (value: boolean) => {
    const poolId = getPoolId();
    if (!poolId) {
      return;
    }

    const updatedPool = await setFightLimitEnabledMutation.mutateAsync({
      id: poolId,
      data: { value },
    });
    setFightLimit(value ? currentPool.fightLimit : undefined);
    setCurrentPool(updatedPool);
  };

  const handleSetFightLimit = async (value: number) => {
    const poolId = getPoolId();
    if (!poolId) {
      return;
    }

    const updatedPool = await setFightLimitMutation.mutateAsync({
      id: poolId,
      data: { value },
    });
    setFightLimit(value);
    setCurrentPool(updatedPool);
  };

  const handleSetStartSeed = async (value: number) => {
    const poolId = getPoolId();
    if (!poolId) {
      return;
    }

    const updatedPool = await setStartSeedMutation.mutateAsync({
      id: poolId,
      data: { value },
    });
    setCurrentPool(updatedPool);
  };

  const { totalFights } = usePoolFightEstimation(totalCombinations, fightLimit);

  console.log(
    'totalCombinations',
    totalCombinations,
    'fightLimit',
    fightLimit,
    'totalFights',
    totalFights,
  );

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.titleContainer}>
          <h2 style={styles.title}>{currentPool.name}</h2>
          <Toggle
            checked={currentPool.enabled}
            onChange={(checked) => {
              triggerAsync(handleSetEnabled(checked));
              return undefined;
            }}
          />
        </div>
        <Button onClick={handleStart} variant="primary">
          Start
        </Button>
        {loading && <Spinner label="Starting pool..." />}
      </div>
      <div style={styles.infoGrid}>
        <div style={styles.infoItem}>
          <span style={styles.label}>Deterministic</span>
          <Toggle
            checked={currentPool.deterministic}
            onChange={(checked) => {
              triggerAsync(handleSetDeterministic(checked));
              return undefined;
            }}
          />
        </div>
        {currentPool.deterministic && (
          <div style={styles.infoItem}>
            <span style={styles.label}>Start Seed</span>
            <Input
              value={currentPool.startSeed.toString()}
              type="number"
              onChange={(value) => {
                triggerAsync(handleSetStartSeed(parseInt(value, 10) || 0));
                return undefined;
              }}
            />
          </div>
        )}
        <div style={styles.infoItem}>
          <span style={styles.label}>Reset Elo</span>
          <Toggle
            checked={currentPool.resetElo}
            onChange={(checked) => {
              triggerAsync(handleSetResetElo(checked));
              return undefined;
            }}
          />
        </div>
        <div style={styles.infoItem}>
          <span style={styles.label}>Fight Limit</span>
          <Toggle
            disabled // TODO: implement in API
            checked={currentPool.fightLimitEnabled}
            onChange={(checked) => {
              triggerAsync(handleSetFightLimitEnabled(checked));
              return undefined;
            }}
          />
        </div>
        {currentPool.fightLimitEnabled && (
          <div style={styles.infoItem}>
            <span style={styles.label}>Fight Limit</span>
            <Input
              value={currentPool.fightLimit.toString()}
              type="number"
              onChange={(value) => {
                triggerAsync(handleSetFightLimit(parseInt(value, 10) || 1));
                return undefined;
              }}
            />
          </div>
        )}
      </div>
      {totalCombinations > 0 && (
        <div style={styles.estimationContainer}>
          <span style={styles.label}>Total estimated fights</span>
          <span style={styles.value}>
            {totalFights} ({totalCombinations} combinations x{' '}
            {currentPool.fightLimitEnabled ? currentPool.fightLimit : 1} fights)
          </span>
        </div>
      )}

      {children && <div style={styles.childrenContainer}>{children}</div>}
    </div>
  );
}

export default BasePoolWrapper;
