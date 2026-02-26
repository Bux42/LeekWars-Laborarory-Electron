import Button from '../../../shared/button/Button';
import { theme } from '../../../../theme';
import { basePoolListStyles as styles } from './BasePoolList.styles';
import { IBasePoolListItem, IBasePoolListProps } from './BasePoolList.types';

function BasePoolList<TPool extends IBasePoolListItem>({
  pools,
  getLabel,
  onActionClick,
  emptyMessage,
  actionText = 'View Pool',
}: IBasePoolListProps<TPool>) {
  return (
    <div style={styles.container}>
      {pools.map((pool) => (
        <div
          key={pool.id}
          style={styles.item}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = theme.colors.accent.primary;
            e.currentTarget.style.backgroundColor =
              theme.colors.background.tertiary;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = theme.colors.border.primary;
            e.currentTarget.style.backgroundColor =
              theme.colors.background.secondary;
          }}
        >
          <div style={styles.info}>
            <div style={styles.nameContainer}>
              <span style={styles.name}>{pool.basePool?.name}</span>
            </div>
            <span style={styles.details}>
              {getLabel(pool)} • Pool ID: {pool.id.substring(0, 8)}...
            </span>
          </div>
          <div style={styles.actions}>
            <Button onClick={() => onActionClick(pool)} variant="primary">
              {actionText}
            </Button>
          </div>
        </div>
      ))}
      {pools.length === 0 && <p style={styles.emptyText}>{emptyMessage}</p>}
    </div>
  );
}

export default BasePoolList;
