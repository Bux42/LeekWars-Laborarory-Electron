import { entityBuildStyles as styles } from './EntityBuild.styles';
import { IEntityBuildProps } from './EntityBuild.types';
import { getTotalStats } from '../../../utils/EntityBuildHelpers';
import { CHIPS_IDS_TO_NAMES } from '../../../constants/leekwars/Chips';
import { COMPONENTS_IDS_TO_NAMES } from '../../../constants/leekwars/Components';
import { WEAPONS_IDS_TO_NAMES } from '../../../constants/leekwars/Weapons';
import { getImage } from '../../../utils/ImageLoader';
import EntityStats from '../entity-stats/EntityStats';

function EntityBuild({ entityBuild }: IEntityBuildProps) {
  const { level } = entityBuild;
  const totalStats = getTotalStats(entityBuild);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div>
          <h2>Level {level}</h2>
        </div>
      </div>

      <EntityStats totalStats={totalStats} />

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
