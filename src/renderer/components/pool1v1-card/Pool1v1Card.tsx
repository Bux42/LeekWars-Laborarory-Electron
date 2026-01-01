import React from 'react';
import { pool1v1CardStyles as styles } from './Pool1v1Card.styles';
import { IPool1v1CardProps } from './Pool1v1Card.types';
import { getImage } from '../../utils/ImageLoader';
import { theme } from '../../theme';

function Pool1v1Card({ pool }: IPool1v1CardProps) {
  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <div style={styles.titleRow}>
          <h3 style={styles.title}>{pool.name}</h3>
          <span
            style={{
              ...styles.statusBadge,
              ...(pool.enabled
                ? styles.statusBadgeEnabled
                : styles.statusBadgeDisabled),
            }}
          >
            {pool.enabled ? 'ENABLED' : 'DISABLED'}
          </span>
        </div>
        <div style={styles.stats}>
          Total Fights:{' '}
          {Number.prototype.toLocaleString.call(pool.total_fights)}
        </div>
      </div>
      <div style={styles.leeksGrid}>
        {pool.leeks.map((leek) => (
          <div
            key={leek.id}
            style={styles.leekCard}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.borderColor = theme.colors.accent.primary;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = theme.colors.border.primary;
            }}
          >
            <img
              src={getImage(`leekwars/image/leek/${leek.imageName}`)}
              alt={leek.name}
              style={styles.leekAvatar}
            />
            <div style={styles.leekName}>{leek.name}</div>
            <div style={styles.leekElo}>ELO: {leek.elo}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Pool1v1Card;
