import TurretImage from '../turret-image/TurretImage';
import { ITurretCardProps } from './TurretCard.types';
import { turretCardStyles as styles } from './TurretCard.styles';

function TurretCard({ turret }: ITurretCardProps) {
  return (
    <div style={styles.container}>
      <div style={styles.name}>{turret.name}</div>
      <div style={styles.turretImage}>
        <TurretImage turret={turret} showTooltip height={64} width={64} />
      </div>
    </div>
  );
}

export default TurretCard;
