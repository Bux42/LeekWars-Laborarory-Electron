import { theme } from '../../../../theme';
import { basePoolListStyles as styles } from './BasePoolList.styles';
import { IBasePoolListItem, IBasePoolListProps } from './BasePoolList.types';
import SeedIcon from '../../../../icons/Seed';
import HoverTooltip from '../../../shared/hover-tooltip/HoverTooltip';
import LastPoolRunsButttons from '../../../pool-runs/last-pool-runs-buttons/LastPoolRunsButttons';

function BasePoolList<TPool extends IBasePoolListItem>({
  pools,
  poolType,
  getLabel,
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
              <span style={styles.name}>{pool.basePool.name}</span>
              {pool.basePool.deterministic && (
                <HoverTooltip
                  tooltip={<div>Start seed: {pool.basePool.startSeed}</div>}
                >
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
            <LastPoolRunsButttons
              poolRunsInfo={pool.poolRunsInfo}
              poolType={poolType}
              poolId={pool.id}
              showViewPoolButton
            />
          </div>
        </div>
      ))}
      {pools.length === 0 && <p style={styles.emptyText}>{emptyMessage}</p>}
    </div>
  );
}

export default BasePoolList;
