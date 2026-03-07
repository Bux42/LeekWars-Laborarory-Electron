import { IChipImageProps } from './ChipImage.types';
import { chipImageStyles as styles } from './ChipImage.styles';
import { getImage } from '../../../utils/ImageLoader';
import { CHIPS_IDS_TO_NAMES } from '../../../constants/leekwars/Chips';

function ChipImage({ chipId, height, width }: IChipImageProps) {
  return (
    <div
      style={styles.image(
        getImage(`leekwars/image/chip/${CHIPS_IDS_TO_NAMES[chipId]}`),
        width,
        height,
      )}
    />
  );
}

export default ChipImage;
