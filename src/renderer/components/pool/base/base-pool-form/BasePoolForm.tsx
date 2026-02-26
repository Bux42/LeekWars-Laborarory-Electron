import React, { useEffect, useMemo, useState } from 'react';
import Input from '../../../shared/input/Input';
import Toggle from '../../../shared/toggle/Toggle';
import { basePoolFormStyles as styles } from './BasePoolForm.styles';
import { IBasePoolFormProps } from './BasePoolForm.types';
import { CreateBasePoolRequest } from '../../../../../services/leekwarsToolsAPI.schemas';
import { usePoolFightEstimation } from '../../../../../hooks/pools/duel/usePoolFightEstimation';

function BasePoolForm({
  selectedLeeksCount,
  onBasePoolRequestChange,
  initialBasePoolRequest,
}: IBasePoolFormProps) {
  const defaultBasePoolRequest = useMemo<CreateBasePoolRequest>(
    () => ({
      deterministic: false,
      enabled: false,
      fightLimit: 10,
      fightLimitEnabled: true,
      name: '',
      resetElo: true,
      startSeed: 1,
    }),
    [],
  );

  const [basePoolRequest, setBasePoolRequest] = useState<CreateBasePoolRequest>(
    {
      ...defaultBasePoolRequest,
      ...initialBasePoolRequest,
    },
  );

  useEffect(() => {
    onBasePoolRequestChange(basePoolRequest);
  }, [basePoolRequest, onBasePoolRequestChange]);

  const { totalScenarios, totalFights } = usePoolFightEstimation(
    selectedLeeksCount,
    basePoolRequest.fightLimit,
  );

  const onFightLimitChange = (value: string) => {
    const fightLimit = Math.max(1, Number(value) || 1);
    setBasePoolRequest((previous) => ({
      ...previous,
      fightLimit,
    }));
  };

  const onSeedChange = (value: string) => {
    const startSeed = Math.max(0, Number(value) || 0);
    setBasePoolRequest((previous) => ({
      ...previous,
      startSeed,
    }));
  };

  return (
    <>
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>General Information</h2>
        <div style={styles.inputGroup}>
          <span style={styles.label}>Pool Name</span>
          <Input
            placeholder="Enter pool name"
            value={basePoolRequest.name || ''}
            onChange={(name) =>
              setBasePoolRequest((previous) => ({
                ...previous,
                name,
              }))
            }
          />
        </div>
        <div style={styles.column}>
          <div style={styles.checkboxGroup}>
            <Toggle
              checked={basePoolRequest.enabled}
              onChange={(enabled) =>
                setBasePoolRequest((previous) => ({
                  ...previous,
                  enabled,
                }))
              }
            />
            <span style={styles.checkboxLabel}>Enabled</span>
          </div>
          <div style={styles.checkboxGroup}>
            <Toggle
              checked={basePoolRequest.resetElo}
              onChange={(resetElo) =>
                setBasePoolRequest((previous) => ({
                  ...previous,
                  resetElo,
                }))
              }
            />
            <span style={styles.checkboxLabel}>Reset ELO on start</span>
          </div>
        </div>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Simulation Settings</h2>
        <div style={styles.column}>
          <div style={styles.checkboxGroup}>
            <Toggle
              checked={basePoolRequest.deterministic}
              onChange={(deterministic) =>
                setBasePoolRequest((previous) => ({
                  ...previous,
                  deterministic,
                }))
              }
            />
            <span style={styles.checkboxLabel}>Deterministic</span>
          </div>
          {basePoolRequest.deterministic && (
            <div style={styles.inputGroup}>
              <span style={styles.label}>Start Seed</span>
              <Input
                type="number"
                value={basePoolRequest.startSeed}
                onChange={onSeedChange}
              />
            </div>
          )}
        </div>
        <div style={styles.column}>
          <div style={styles.checkboxGroup}>
            <Toggle
              checked={basePoolRequest.fightLimitEnabled}
              onChange={(fightLimitEnabled) =>
                setBasePoolRequest((previous) => ({
                  ...previous,
                  fightLimitEnabled,
                }))
              }
            />
            <span style={styles.checkboxLabel}>Fight Limit</span>
          </div>
          {basePoolRequest.fightLimitEnabled && (
            <div style={styles.inputGroup}>
              <span style={styles.label}>Fights per Pair</span>
              <Input
                type="number"
                disabled={!basePoolRequest.fightLimitEnabled}
                value={basePoolRequest.fightLimit}
                onChange={onFightLimitChange}
              />
              <div style={styles.statsContainer}>
                Total estimated fights: {totalFights} ({totalScenarios} duel
                combinations x {basePoolRequest.fightLimit || 1} fights)
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default BasePoolForm;
