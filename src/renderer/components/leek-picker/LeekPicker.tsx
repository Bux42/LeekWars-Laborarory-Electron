import React from 'react';
import { leekPickerStyles as styles } from './LeekPicker.styles';
import { ILeekPickerProps } from './LeekPicker.types';
import { getImage } from '../../utils/ImageLoader';
import { theme } from '../../theme';

function LeekPicker({
  availableLeeks,
  selectedLeekIds,
  onLeekSelect,
}: ILeekPickerProps) {
  // Filter out leeks that are already selected
  const filteredLeeks = availableLeeks.filter(
    (leek) => !selectedLeekIds.includes(leek.id),
  );

  return (
    <div style={styles.container}>
      <div style={styles.title}>Add Leek to Pool</div>
      {filteredLeeks.length === 0 ? (
        <p style={styles.emptyText}>
          No more leeks available. All leeks are already in this pool.
        </p>
      ) : (
        <div style={styles.leeksGrid}>
          {filteredLeeks.map((leek) => (
            <div
              key={leek.id}
              style={styles.leekCard}
              onClick={() => onLeekSelect(leek.id)}
              onKeyDown={(e) => e.key === 'Enter' && onLeekSelect(leek.id)}
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
      )}
    </div>
  );
}

export default LeekPicker;
