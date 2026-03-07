import { IChipListProps } from './ChipList.types';
import { chipListStyles as styles } from './ChipList.styles';
import ChipImage from '../chip-image/ChipImage';

function ChipList({ chipIds, width = 48, height = 48 }: IChipListProps) {
  return (
    <div style={styles.itemsGrid}>
      {chipIds.map((chipId) => (
        <ChipImage key={chipId} chipId={chipId} width={width} height={height} />
      ))}
    </div>
  );
}

export default ChipList;
