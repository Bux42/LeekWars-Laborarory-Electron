import { ITurretPickerProps } from './TurretPicker.types';
import { turretPickerStyles as styles } from './TurretPicker.styles';
import { theme } from '../../../theme';
import TurretImage from '../turret-image/TurretImage';

function TurretPicker({
  availableTurrets,
  selectedTurretId,
  onTurretSelect,
  label,
}: ITurretPickerProps) {
  return (
    <div style={styles.container}>
      <div style={styles.title}>{label}</div>
      {availableTurrets.length === 0 ? (
        <p style={styles.emptyText}>
          No more turrets available. All turrets are already in this pool.
        </p>
      ) : (
        <div style={styles.turretsGrid}>
          {availableTurrets.map((turret) => (
            <div
              key={turret.id}
              style={styles.turretCard(turret.id === selectedTurretId)}
              onClick={() => onTurretSelect(turret.id)}
              onKeyDown={(e) => e.key === 'Enter' && onTurretSelect(turret.id)}
              role="button"
              tabIndex={0}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.borderColor =
                  turret.id === selectedTurretId
                    ? '#4caf50'
                    : theme.colors.border.primary;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor =
                  turret.id === selectedTurretId
                    ? '#4caf50'
                    : theme.colors.border.primary;
              }}
            >
              <div style={styles.turretAvatar}>
                <TurretImage turret={turret} height={60} width={60} />
              </div>
              <div style={styles.turretName(turret.id === selectedTurretId)}>
                {turret.name}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TurretPicker;
