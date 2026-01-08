import React from 'react';
import { basePoolWrapperStyles as styles } from './BasePoolWrapper.styles';
import { IBasePoolWrapperProps } from './BasePoolWrapper.types';
import Toggle from '../shared/toggle/Toggle';

const BasePoolWrapper: React.FC<IBasePoolWrapperProps> = ({
  pool,
  children,
  onSetDeterministic,
  onSetResetElo,
  onSetEnabled,
}) => {
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
        <div style={styles.value}>ID: {pool.id}</div>
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
            <span style={styles.value}>{pool.startSeed}</span>
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
          <span style={styles.value}>
            {pool.fightLimitEnabled ? `${pool.fightLimit} fights` : 'Disabled'}
          </span>
        </div>
      </div>

      {children && <div style={styles.childrenContainer}>{children}</div>}
    </div>
  );
};

export default BasePoolWrapper;
