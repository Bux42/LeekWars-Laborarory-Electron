import React from 'react';
import { basePoolWrapperStyles as styles } from './BasePoolWrapper.styles';
import { IBasePoolWrapperProps } from './BasePoolWrapper.types';
import Toggle from '../../shared/toggle/Toggle';
import Input from '../../shared/input/Input';
import Button from '../../shared/button/Button';
import Spinner from '../../shared/spinner/Spinner';

const BasePoolWrapper: React.FC<IBasePoolWrapperProps> = ({
  pool,
  children,
  onSetDeterministic,
  onSetResetElo,
  onSetEnabled,
  onSetStartSeed,
  onSetFightLimitEnabled,
  onSetFightLimit,
  onStart,
}) => {
  const [loading, setLoading] = React.useState(false);

  const handleStart = async () => {
    setLoading(true);
    await onStart();
    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.titleContainer}>
          <h2 style={styles.title}>{pool.name}</h2>
          <Toggle
            checked={pool.enabled}
            onChange={(checked) => onSetEnabled(checked)}
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
            checked={pool.deterministic}
            onChange={(checked) => onSetDeterministic(checked)}
          />
        </div>
        {pool.deterministic && (
          <div style={styles.infoItem}>
            <span style={styles.label}>Start Seed</span>
            <Input
              value={pool.startSeed.toString()}
              type="number"
              onChange={(value) => onSetStartSeed(parseInt(value, 10) || 0)}
            />
          </div>
        )}
        <div style={styles.infoItem}>
          <span style={styles.label}>Reset Elo</span>
          <Toggle
            checked={pool.resetElo}
            onChange={(checked) => onSetResetElo(checked)}
          />
        </div>
        <div style={styles.infoItem}>
          <span style={styles.label}>Fight Limit</span>
          <Toggle
            disabled // TODO: implement in API
            checked={pool.fightLimitEnabled}
            onChange={(checked) => onSetFightLimitEnabled(checked)}
          />
        </div>
        {pool.fightLimitEnabled && (
          <div style={styles.infoItem}>
            <span style={styles.label}>Fight Limit</span>
            <Input
              value={pool.fightLimit.toString()}
              type="number"
              onChange={(value) => onSetFightLimit(parseInt(value, 10) || 1)}
            />
          </div>
        )}
      </div>

      {children && <div style={styles.childrenContainer}>{children}</div>}
    </div>
  );
};

export default BasePoolWrapper;
