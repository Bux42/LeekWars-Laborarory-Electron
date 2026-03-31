import { useMemo } from 'react';
import { IPoolLeekGroupCardProps } from './PoolLeekGroupCard.types';
import { poolLeekGroupCardStyles as styles } from './PoolLeekGroupCard.styles';
import LeekImage from '../../../leek/leek-image/LeekImage';

function PoolLeekGroupCard({
  group,
  processedFights,
}: IPoolLeekGroupCardProps) {
  const ratio = useMemo(() => {
    if (processedFights === 0) return 0;
    return (group.fightRatio.wins / processedFights) * 100;
  }, [group.fightRatio, processedFights]);

  return (
    <div style={styles.container}>
      <div style={styles.ratioAndWinrateContainer}>
        <div style={styles.ratiosContainer}>
          <div style={styles.ratioItem}>{group.fightRatio.wins} Wins</div>
          <div style={styles.ratioItem}>{group.fightRatio.losses} Losses</div>
          <div style={styles.ratioItem}>{group.fightRatio.draws} Draws</div>
        </div>
        <div style={styles.winrate}>{ratio.toFixed(2)}% Winrate</div>
      </div>
      <div style={styles.leeksContainer}>
        {group.leeks.map((leek) => (
          <LeekImage
            key={leek.id}
            leek={leek}
            height={46}
            width={46}
            showTooltip
          />
        ))}
      </div>
    </div>
  );
}

export default PoolLeekGroupCard;
