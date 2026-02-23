import React from 'react';
import { leekDetailStyles as styles } from './LeekDetail.styles';
import { ILeekDetailProps } from './LeekDetail.types';
import { getImage } from '../../../utils/ImageLoader';
import { getTotalStats } from '../../../utils/EntityBuildHelpers';
import { WEAPONS_IDS_TO_NAMES } from '../../../constants/leekwars/Weapons';
import { CHIPS_IDS_TO_NAMES } from '../../../constants/leekwars/Chips';
import { COMPONENTS_IDS_TO_NAMES } from '../../../constants/leekwars/Components';

function LeekDetail({ leek }: ILeekDetailProps) {
  const totalStats = getTotalStats(leek.build);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <img
          src={getImage(`leekwars/image/leek/${leek.imageName}`)}
          alt={leek.name}
          style={styles.leekImage}
        />
        <div>
          <div style={styles.name}>{leek.name}</div>
          <div style={styles.level}>Level {leek.build.level}</div>
        </div>
      </div>

      <div style={styles.section}>
        <div style={styles.sectionTitle}>Weapons</div>
        <div style={styles.equipmentGrid}>
          {leek.build.selectedWeaponIds.map((weaponId) => (
            <div key={weaponId} style={styles.equipmentItem}>
              <img
                src={getImage(
                  `leekwars/image/weapon/${WEAPONS_IDS_TO_NAMES[weaponId]}`,
                )}
                alt={`Weapon ${weaponId}`}
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </div>
          ))}
        </div>
      </div>

      <div style={styles.section}>
        <div style={styles.sectionTitle}>Chips</div>
        <div style={styles.equipmentGrid}>
          {leek.build.selectedChipIds.map((chipId) => (
            <div key={chipId} style={styles.equipmentItem}>
              <img
                src={getImage(
                  `leekwars/image/chip/${CHIPS_IDS_TO_NAMES[chipId]}`,
                )}
                alt={`Chip ${chipId}`}
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </div>
          ))}
        </div>
      </div>

      <div style={styles.section}>
        <div style={styles.sectionTitle}>Components</div>
        <div style={styles.equipmentGrid}>
          {leek.build.equippedComponentIds.map((componentId) => (
            <div key={componentId} style={styles.equipmentItem}>
              <img
                src={getImage(
                  `leekwars/image/component/${COMPONENTS_IDS_TO_NAMES[componentId]}`,
                )}
                alt={`Component ${componentId}`}
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </div>
          ))}
        </div>
      </div>

      <div style={styles.section}>
        <div style={styles.sectionTitle}>Stats</div>
        <div style={styles.statsGrid}>
          <div style={styles.statRow}>
            <span style={styles.statLabel}>Life</span>
            <span style={styles.statValue}>{totalStats.life}</span>
          </div>
          <div style={styles.statRow}>
            <span style={styles.statLabel}>Strength</span>
            <span style={styles.statValue}>{totalStats.strength}</span>
          </div>
          <div style={styles.statRow}>
            <span style={styles.statLabel}>Wisdom</span>
            <span style={styles.statValue}>{totalStats.wisdom}</span>
          </div>
          <div style={styles.statRow}>
            <span style={styles.statLabel}>Agility</span>
            <span style={styles.statValue}>{totalStats.agility}</span>
          </div>
          <div style={styles.statRow}>
            <span style={styles.statLabel}>Resistance</span>
            <span style={styles.statValue}>{totalStats.resistance}</span>
          </div>
          <div style={styles.statRow}>
            <span style={styles.statLabel}>Science</span>
            <span style={styles.statValue}>{totalStats.science}</span>
          </div>
          <div style={styles.statRow}>
            <span style={styles.statLabel}>Magic</span>
            <span style={styles.statValue}>{totalStats.magic}</span>
          </div>
          <div style={styles.statRow}>
            <span style={styles.statLabel}>Frequency</span>
            <span style={styles.statValue}>{totalStats.frequency}</span>
          </div>
          <div style={styles.statRow}>
            <span style={styles.statLabel}>Cores</span>
            <span style={styles.statValue}>{totalStats.cores}</span>
          </div>
          <div style={styles.statRow}>
            <span style={styles.statLabel}>RAM</span>
            <span style={styles.statValue}>{totalStats.ram}</span>
          </div>
          <div style={styles.statRow}>
            <span style={styles.statLabel}>TP</span>
            <span style={styles.statValue}>{totalStats.tp}</span>
          </div>
          <div style={styles.statRow}>
            <span style={styles.statLabel}>MP</span>
            <span style={styles.statValue}>{totalStats.mp}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeekDetail;
