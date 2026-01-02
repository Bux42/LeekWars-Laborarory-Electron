import React from 'react';
import { entityBuildStyles as styles } from './EntityBuild.styles';
import { IEntityBuildProps } from './EntityBuild.types';
import { getImage } from '../../utils/ImageLoader';
import { WEAPONS_IDS_TO_NAMES } from '../../constants/leekwars/Weapons';
import { CHIPS_IDS_TO_NAMES } from '../../constants/leekwars/Chips';
import { COMPONENTS_IDS_TO_NAMES } from '../../constants/leekwars/Components';
import { getTotalStats } from '../../utils/EntityBuildHelpers';

function EntityBuild({ entityBuild }: IEntityBuildProps) {
  const { level } = entityBuild;
  const totalStats = getTotalStats(entityBuild);

  const renderStat = (label: string, value: number, icon: string) => (
    <div style={styles.statRow}>
      <div style={styles.statLabelContainer}>
        {icon && (
          <img src={getImage(icon)} alt={label} style={styles.statIcon} />
        )}
        <span style={styles.statLabel}>{label}</span>
      </div>
      <span style={styles.statValue}>{value}</span>
    </div>
  );

  const renderStats = (title: string) => (
    <div style={styles.section}>
      <h3 style={styles.sectionTitle}>{title}</h3>
      <div style={styles.statsGrid}>
        {renderStat('Life', totalStats.life, 'leekwars/image/charac/life')}
        {renderStat(
          'Strength',
          totalStats.strength,
          'leekwars/image/charac/strength',
        )}
        {renderStat(
          'Wisdom',
          totalStats.wisdom,
          'leekwars/image/charac/wisdom',
        )}
        {renderStat(
          'Agility',
          totalStats.agility,
          'leekwars/image/charac/agility',
        )}
        {renderStat(
          'Resistance',
          totalStats.resistance,
          'leekwars/image/charac/resistance',
        )}
        {renderStat(
          'Science',
          totalStats.science,
          'leekwars/image/charac/science',
        )}
        {renderStat('Magic', totalStats.magic, 'leekwars/image/charac/magic')}
        {renderStat(
          'Frequency',
          totalStats.frequency,
          'leekwars/image/charac/frequency',
        )}
        {renderStat('Cores', totalStats.cores, 'leekwars/image/charac/cores')}
        {renderStat('RAM', totalStats.ram, 'leekwars/image/charac/ram')}
        {renderStat('TP', totalStats.tp, 'leekwars/image/charac/tp')}
        {renderStat('MP', totalStats.mp, 'leekwars/image/charac/mp')}
      </div>
    </div>
  );

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div>
          <h2>Level {level}</h2>
        </div>
      </div>

      {renderStats('Stats')}

      <div style={styles.itemsSection}>
        <h3 style={styles.sectionTitle}>Weapons</h3>
        {entityBuild.selectedWeaponIds.length > 0 ? (
          <div style={styles.itemsGrid}>
            {entityBuild.selectedWeaponIds.map((weaponId) => (
              <img
                key={weaponId}
                src={getImage(
                  `leekwars/image/weapon/${WEAPONS_IDS_TO_NAMES[weaponId]}`,
                )}
                alt={`Weapon ${weaponId}`}
                style={styles.itemImage}
              />
            ))}
          </div>
        ) : (
          <p style={styles.emptyState}>No weapons equipped</p>
        )}
      </div>

      <div style={styles.itemsSection}>
        <h3 style={styles.sectionTitle}>Chips</h3>
        {entityBuild.selectedChipIds.length > 0 ? (
          <div style={styles.itemsGrid}>
            {entityBuild.selectedChipIds.map((chipId) => (
              <img
                key={chipId}
                src={getImage(
                  `leekwars/image/chip/${CHIPS_IDS_TO_NAMES[chipId]}`,
                )}
                alt={`Chip ${chipId}`}
                style={styles.itemImage}
              />
            ))}
          </div>
        ) : (
          <p style={styles.emptyState}>No chips equipped</p>
        )}
      </div>

      <div style={styles.itemsSection}>
        <h3 style={styles.sectionTitle}>Components</h3>
        {entityBuild.equippedComponentIds.length > 0 ? (
          <div style={styles.itemsGrid}>
            {entityBuild.equippedComponentIds.map((componentId) => (
              <img
                key={componentId}
                src={getImage(
                  `leekwars/image/component/${COMPONENTS_IDS_TO_NAMES[componentId]}`,
                )}
                alt={`Component ${componentId}`}
                style={styles.itemImage}
              />
            ))}
          </div>
        ) : (
          <p style={styles.emptyState}>No components equipped</p>
        )}
      </div>
    </div>
  );
}

export default EntityBuild;
