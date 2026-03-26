import Spinner from '../../shared/spinner/Spinner';
import { ILeekGroupPickerProps } from './LeekGroupPicker.types';
import { leekGroupPickerStyles as styles } from './LeekGroupPicker.styles';
import { theme } from '../../../theme';

function LeekGroupPicker({
  label,
  availableLeekGroups,
  selectedLeekGroupIds,
  onAddLeekGroup,
}: ILeekGroupPickerProps) {
  const filteredLeekGroups = availableLeekGroups.filter(
    (leekGroup) => !selectedLeekGroupIds.includes(leekGroup.id ?? ''),
  );

  if (!availableLeekGroups) {
    return <Spinner size="small" label="Loading leek groups..." />;
  }

  return (
    <div style={styles.container}>
      <div style={styles.title}>{label}</div>
      {filteredLeekGroups.length === 0 ? (
        <p style={styles.emptyText}>
          No more leek groups available. All leek groups are already in this
          pool.
        </p>
      ) : (
        <div style={styles.leekGroupsGrid}>
          {filteredLeekGroups.map((leekGroup) => (
            <div
              key={leekGroup.id}
              style={styles.leekGroupCard}
              onClick={() => onAddLeekGroup(leekGroup.id)}
              onKeyDown={(e) =>
                e.key === 'Enter' && onAddLeekGroup(leekGroup.id)
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
              <div style={styles.leekGroupAvatar}>
                {leekGroup.name.charAt(0)}
              </div>
              <div style={styles.leekGroupName}>{leekGroup.name}</div>
              <div style={styles.leekGroupLeekCount}>
                Leeks: {leekGroup.leeks?.length ?? 0}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default LeekGroupPicker;
