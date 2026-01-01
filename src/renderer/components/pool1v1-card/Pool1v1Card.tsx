import React, { useState } from 'react';
import { pool1v1CardStyles as styles } from './Pool1v1Card.styles';
import { IPool1v1CardProps } from './Pool1v1Card.types';
import { getImage } from '../../utils/ImageLoader';
import { theme } from '../../theme';
import { useServerContext } from '../../../context/server/ServerContext';
import LeekPicker from '../leek-picker/LeekPicker';

function Pool1v1Card({
  pool,
  availableLeeks,
  onPoolUpdate,
}: IPool1v1CardProps) {
  const { service } = useServerContext();
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  const handleAddLeek = async (leekId: string) => {
    try {
      await service.updatePool1v1({
        pool: {
          id: pool.id,
          name: pool.name,
          enabled: pool.enabled,
          total_fights: pool.total_fights,
          leek_ids: [...pool.leeks.map((l) => l.id), leekId],
        },
      });
      onPoolUpdate();
      setIsPickerOpen(false);
    } catch (err) {
      // eslint-disable-next-line no-alert
      alert(err instanceof Error ? err.message : 'Failed to add leek');
    }
  };

  const handleRemoveLeek = async (leekId: string) => {
    try {
      await service.updatePool1v1({
        pool: {
          id: pool.id,
          name: pool.name,
          enabled: pool.enabled,
          total_fights: pool.total_fights,
          leek_ids: pool.leeks.filter((l) => l.id !== leekId).map((l) => l.id),
        },
      });
      onPoolUpdate();
    } catch (err) {
      // eslint-disable-next-line no-alert
      alert(err instanceof Error ? err.message : 'Failed to remove leek');
    }
  };

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
      <div style={styles.leeksSection}>
        <div style={styles.leeksSectionTitle}>
          Leeks in Pool ({pool.leeks.length})
        </div>
        <div style={styles.leeksGrid}>
          {pool.leeks.map((leek) => (
            <div key={leek.id} style={styles.leekCardWrapper}>
              <button
                type="button"
                style={styles.removeButton}
                onClick={() => handleRemoveLeek(leek.id)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
                aria-label={`Remove ${leek.name}`}
              >
                ×
              </button>
              <div style={styles.leekCard}>
                <img
                  src={getImage(`leekwars/image/leek/${leek.imageName}`)}
                  alt={leek.name}
                  style={styles.leekAvatar}
                />
                <div style={styles.leekName}>{leek.name}</div>
                <div style={styles.leekElo}>ELO: {leek.elo}</div>
              </div>
            </div>
          ))}
          <div
            style={styles.leekCard}
            onClick={() => setIsPickerOpen(!isPickerOpen)}
            onKeyDown={(e) =>
              e.key === 'Enter' && setIsPickerOpen(!isPickerOpen)
            }
            role="button"
            tabIndex={0}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.borderColor = theme.colors.accent.primary;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = theme.colors.border.primary;
            }}
          >
            <div
              style={{
                fontSize: '48px',
                color: theme.colors.text.secondary,
                lineHeight: 1,
              }}
            >
              +
            </div>
            <div style={styles.leekName}>Add Leek</div>
          </div>
        </div>
      </div>
      {isPickerOpen && (
        <LeekPicker
          availableLeeks={availableLeeks}
          selectedLeekIds={pool.leeks.map((l) => l.id)}
          onLeekSelect={handleAddLeek}
        />
      )}
    </div>
  );
}

export default Pool1v1Card;
