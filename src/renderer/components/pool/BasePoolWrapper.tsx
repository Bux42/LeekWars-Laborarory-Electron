import React from 'react';
import { basePoolWrapperStyles as styles } from './BasePoolWrapper.styles';
import { IBasePoolWrapperProps } from './BasePoolWrapper.types';
import Toggle from '../shared/toggle/Toggle';

const BasePoolWrapper: React.FC<IBasePoolWrapperProps> = ({
  pool,
  children,
}) => {
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.titleContainer}>
          <h2 style={styles.title}>{pool.name}</h2>
          <span style={styles.statusBadge(pool.enabled)}>
            {pool.enabled ? 'Enabled' : 'Disabled'}
          </span>
        </div>
        <div style={styles.value}>ID: {pool.id}</div>
      </div>

      <div style={styles.infoGrid}>
        <div style={styles.infoItem}>
          <span style={styles.label}>Deterministic</span>
          <Toggle
            checked={pool.deterministic}
            onChange={(e) => console.log(e)}
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
          <Toggle checked={pool.resetElo} onChange={(e) => console.log(e)} />
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
