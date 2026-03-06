import { getImage } from '../../../../utils/ImageLoader';
import { entityStatItemStyles as styles } from './EntityStatItem.styles';
import { IEntityStatItemProps } from './EntityStatItem.types';

function EntityStatItem({
  label,
  value,
  minValue,
  iconPath,
}: IEntityStatItemProps) {
  return (
    <div style={styles.statRow}>
      <div style={styles.statLabelContainer}>
        {iconPath && (
          <img src={getImage(iconPath)} alt={label} style={styles.statIcon} />
        )}
        <span style={styles.statLabel}>{label}</span>
      </div>
      <span style={styles.statValue}>
        {minValue ? `${minValue} to ${value}` : value}
      </span>
    </div>
  );
}

export default EntityStatItem;
