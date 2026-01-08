import React from 'react';
import { basePoolWrapperStyles as styles } from './BasePoolWrapper.styles';
import { IBasePoolWrapperProps } from './BasePoolWrapper.types';

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
          <span style={styles.value}>{pool.deterministic ? 'Yes' : 'No'}</span>
        </div>
        <div style={styles.infoItem}>
          <span style={styles.label}>Reset Elo</span>
          <span style={styles.value}>{pool.resetElo ? 'Yes' : 'No'}</span>
        </div>
        <div style={styles.infoItem}>
          <span style={styles.label}>Start Seed</span>
          <span style={styles.value}>{pool.startSeed}</span>
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
