import Button from '../../../shared/button/Button';
import { theme } from '../../../../theme';
import { basePoolListStyles as styles } from './BasePoolList.styles';
import { IBasePoolListItem, IBasePoolListProps } from './BasePoolList.types';
import SeedIcon from '../../../../icons/Seed';
import HoverTooltip from '../../../shared/hover-tooltip/HoverTooltip';

function BasePoolList<TPool extends IBasePoolListItem>({
  pools,
  getLabel,
  onViewPoolClick,
  emptyMessage,
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
              {pool.basePool.deterministic && (
                <HoverTooltip tooltip={<div>Pool is deterministic</div>}>
                  <div style={styles.seedIcon}>
                    <SeedIcon />
                  </div>
                </HoverTooltip>
              )}
            </div>
            <span style={styles.details}>
              {getLabel(pool)} • Pool ID: {pool.id.substring(0, 8)}...
            </span>
          </div>
          <div style={styles.actions}>
            <Button onClick={() => onViewPoolClick(pool)} variant="primary">
              Last Run
            </Button>
            <Button onClick={() => onViewPoolClick(pool)} variant="primary">
              All Runs (54)
            </Button>
            <Button onClick={() => onViewPoolClick(pool)} variant="primary">
              Pool Details
            </Button>
          </div>
        </div>
      ))}
      {pools.length === 0 && <p style={styles.emptyText}>{emptyMessage}</p>}
    </div>
  );
}

export default BasePoolList;
