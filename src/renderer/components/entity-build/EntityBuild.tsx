import React from 'react';
import { entityBuildStyles as styles } from './EntityBuild.styles';
import { IEntityBuildProps } from './EntityBuild.types';
import { getImage } from '../../utils/ImageLoader';
import { getBaseStats } from '../../utils/LeekWars';
import { WEAPONS_IDS_TO_NAMES } from '../../constants/leekwars/Weapons';
import { CHIPS_IDS_TO_NAMES } from '../../constants/leekwars/Chips';
import { COMPONENTS_IDS_TO_NAMES } from '../../constants/leekwars/Components';

function EntityBuild({ entityBuild }: IEntityBuildProps) {
  const { level, investedStats, bonusStats } = entityBuild;

  const baseStats = getBaseStats(level);

  const totalStats = {
    life: investedStats.life + bonusStats.life + baseStats.life,
    strength: investedStats.strength + bonusStats.strength + baseStats.strength,
    wisdom: investedStats.wisdom + bonusStats.wisdom + baseStats.wisdom,
    agility: investedStats.agility + bonusStats.agility + baseStats.agility,
    resistance:
      investedStats.resistance + bonusStats.resistance + baseStats.resistance,
    science: investedStats.science + bonusStats.science + baseStats.science,
    magic: investedStats.magic + bonusStats.magic + baseStats.magic,
    frequency:
      investedStats.frequency + bonusStats.frequency + baseStats.frequency,
    cores: investedStats.cores + bonusStats.cores + baseStats.cores,
    ram: investedStats.ram + bonusStats.ram + baseStats.ram,
    tp: investedStats.tp + bonusStats.tp + baseStats.tp,
    mp: investedStats.mp + bonusStats.mp + baseStats.mp,
  };

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

  const renderStats = (title: string, stats: typeof investedStats) => (
    <div style={styles.section}>
      <h3 style={styles.sectionTitle}>{title}</h3>
      <div style={styles.statsGrid}>
        {renderStat('Life', stats.life, 'leekwars/image/charac/life')}
        {renderStat(
          'Strength',
          stats.strength,
          'leekwars/image/charac/strength',
        )}
        {renderStat('Wisdom', stats.wisdom, 'leekwars/image/charac/wisdom')}
        {renderStat('Agility', stats.agility, 'leekwars/image/charac/agility')}
        {renderStat(
          'Resistance',
          stats.resistance,
          'leekwars/image/charac/resistance',
        )}
        {renderStat('Science', stats.science, 'leekwars/image/charac/science')}
        {renderStat('Magic', stats.magic, 'leekwars/image/charac/magic')}
        {renderStat(
          'Frequency',
          stats.frequency,
          'leekwars/image/charac/frequency',
        )}
        {renderStat('Cores', stats.cores, 'leekwars/image/charac/cores')}
        {renderStat('RAM', stats.ram, 'leekwars/image/charac/ram')}
        {renderStat('TP', stats.tp, 'leekwars/image/charac/tp')}
        {renderStat('MP', stats.mp, 'leekwars/image/charac/mp')}
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

      {renderStats('Stats', totalStats)}

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
