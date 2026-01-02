import React, { useState } from 'react';
import { pool1v1CardStyles as styles } from './Pool1v1Card.styles';
import { IPool1v1CardProps } from './Pool1v1Card.types';
import { getImage } from '../../utils/ImageLoader';
import { theme } from '../../theme';
import { useServerContext } from '../../../context/server/ServerContext';
import LeekPicker from '../leek-picker/LeekPicker';
import Toggle from '../shared/toggle/Toggle';
import Input from '../shared/input/Input';

function Pool1v1Card({
  pool,
  availableLeeks,
  onPoolUpdate,
}: IPool1v1CardProps) {
  const { service } = useServerContext();
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [fightLimit, setFightLimit] = useState(
    pool.fight_count_limit.toString(),
  );

  const handleAddLeek = async (leekId: string) => {
    try {
      await service.updatePool1v1({
        pool: {
          id: pool.id,
          name: pool.name,
          enabled: pool.enabled,
          total_executed_fights: pool.total_executed_fights,
          leek_ids: [...pool.leeks.map((l) => l.id), leekId],
          fight_count_limit_enabled: pool.fight_count_limit_enabled,
          fight_count_limit: pool.fight_count_limit,
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
          total_executed_fights: pool.total_executed_fights,
          leek_ids: pool.leeks.filter((l) => l.id !== leekId).map((l) => l.id),
          fight_count_limit_enabled: pool.fight_count_limit_enabled,
          fight_count_limit: pool.fight_count_limit,
        },
      });
      onPoolUpdate();
    } catch (err) {
      // eslint-disable-next-line no-alert
      alert(err instanceof Error ? err.message : 'Failed to remove leek');
    }
  };

  const handleToggleFightLimit = async (enabled: boolean) => {
    try {
      if (enabled) {
        const limit = parseInt(fightLimit, 10);
        if (Number.isNaN(limit) || limit < 1) {
          // eslint-disable-next-line no-alert
          alert('Fight limit must be at least 1');
          return;
        }
        await service.enableFightLimit({
          id: pool.id,
          limit,
        });
      } else {
        await service.disableFightLimit({
          id: pool.id,
        });
      }
      onPoolUpdate();
    } catch (err) {
      // eslint-disable-next-line no-alert
      alert(
        err instanceof Error ? err.message : 'Failed to update fight limit',
      );
    }
  };

  const handleFightLimitChange = async (value: string) => {
    setFightLimit(value);
    const limit = parseInt(value, 10);
    if (!Number.isNaN(limit) && limit >= 1) {
      try {
        await service.enableFightLimit({
          id: pool.id,
          limit,
        });
        onPoolUpdate();
      } catch (err) {
        // eslint-disable-next-line no-alert
        alert(
          err instanceof Error ? err.message : 'Failed to update fight limit',
        );
      }
    }
  };

  const totalScenarios = (pool.leeks.length * (pool.leeks.length - 1)) / 2;
  const totalFights = totalScenarios * (parseInt(fightLimit, 10) || 0);

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
          Total Executed Fights:{' '}
          {Number.prototype.toLocaleString.call(pool.total_executed_fights)}{' '}
          {' / '} {Number.prototype.toLocaleString.call(totalFights)}
        </div>
      </div>
      <div style={styles.fightLimitSection}>
        <Toggle
          checked={pool.fight_count_limit_enabled}
          onChange={handleToggleFightLimit}
          label="Enable Fight Limit"
        />
        {pool.fight_count_limit_enabled && (
          <>
            <div style={styles.fightLimitRow}>
              <span style={styles.fightLimitLabel}>Fight Limit:</span>
              <div style={{ width: '100px' }}>
                <Input
                  type="number"
                  value={fightLimit}
                  onChange={handleFightLimitChange}
                />
              </div>
            </div>
            <div style={styles.totalFightsText}>
              {totalScenarios} Scenarios × {fightLimit} Fights = {totalFights}{' '}
              Total fights
            </div>
          </>
        )}
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
